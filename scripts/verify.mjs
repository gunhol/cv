import { chromium } from 'playwright-core';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
const reviewDir = resolve('.impeccable/review');
await mkdir(reviewDir, { recursive: true });

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.png': 'image/png',
};

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', 'http://127.0.0.1');
    const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const file = resolve(root, `.${pathname}`);
    if (!file.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end('Forbidden');
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': mime[extname(file)] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
});

await new Promise((resolveListen) => server.listen(0, '127.0.0.1', resolveListen));
const address = server.address();
assert(address && typeof address === 'object');
const baseUrl = `http://127.0.0.1:${address.port}`;

const browser = await chromium.launch({ headless: true });
const consoleErrors = [];
const failedResponses = [];
const results = { viewports: {}, interactions: {}, contrast: {}, performance: {}, print: {} };

function observe(page) {
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  page.on('response', (response) => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
  });
}

async function openPage(width, height = 900) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  observe(page);
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return { context, page };
}

async function layoutMetrics(page) {
  return page.evaluate(() => ({
    viewport: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    smallTargets: [...document.querySelectorAll('a, button, summary')]
      .filter((element) => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 && rect.bottom >= 0;
      })
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.height < 43 || rect.width < 32;
      })
      .map((element) => ({ text: element.textContent?.trim(), width: Math.round(element.getBoundingClientRect().width), height: Math.round(element.getBoundingClientRect().height) })),
  }));
}

async function checkViewport(width, screenshotName) {
  const { context, page } = await openPage(width);
  const metrics = await layoutMetrics(page);
  assert(metrics.documentWidth <= width + 1, `Horizontal overflow at ${width}px: ${metrics.documentWidth}px`);
  assert(metrics.bodyWidth <= width + 1, `Body overflow at ${width}px: ${metrics.bodyWidth}px`);
  assert.equal(metrics.smallTargets.length, 0, `Undersized targets at ${width}px: ${JSON.stringify(metrics.smallTargets)}`);
  if (screenshotName) {
    await page.screenshot({ path: resolve(reviewDir, screenshotName), fullPage: true });
  }
  results.viewports[width] = metrics;
  await context.close();
}

async function contrastChecks(page) {
  return page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) throw new Error('Canvas unavailable');
    const rgb = (color) => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return [...context.getImageData(0, 0, 1, 1).data.slice(0, 3)];
    };
    const luminance = (values) => values.map((value) => {
      const channel = value / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    }).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
    const ratio = (foreground, background) => {
      const a = luminance(rgb(foreground));
      const b = luminance(rgb(background));
      return Math.round(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)) * 100) / 100;
    };
    const style = (selector) => getComputedStyle(document.querySelector(selector));
    return {
      body: ratio(style('body').color, style('body').backgroundColor),
      mutedOnSurface: ratio(style('.profile-summary').color, style('.profile-record').backgroundColor),
      primaryButton: ratio(style('.button-primary').color, style('.button-primary').backgroundColor),
      disclosure: ratio(style('.responsibilities summary').color, style('.job-record').backgroundColor),
      navigation: ratio(style('.section-nav a').color, style('.site-header').backgroundColor),
    };
  });
}

try {
  await checkViewport(375, 'mobile.png');
  await checkViewport(731, 'user-731.png');
  await checkViewport(768);
  await checkViewport(1024);
  await checkViewport(1440, 'desktop.png');

  const { context, page } = await openPage(1440);
  assert.equal(await page.locator('.job-record').count(), 9);
  assert.equal(await page.locator('.job-record').first().locator('h3').textContent(), 'Forward Deployed Engineer');
  assert.equal(await page.locator('.job-status').textContent(), 'Current');
  assert.equal(await page.locator('.header-email').getAttribute('href'), 'mailto:contact@hollander.one');
  assert.equal(await page.locator('body').textContent().then((text) => text.includes('upcoming')), false);

  const firstDisclosure = page.locator('details[data-responsibilities]').first();
  await firstDisclosure.locator('summary').click();
  assert.equal(await firstDisclosure.evaluate((element) => element.open), true);
  assert(await firstDisclosure.locator('ul').isVisible());
  await page.locator('.job-record').first().screenshot({ path: resolve(reviewDir, 'detail-open.png') });
  await firstDisclosure.locator('summary').focus();
  await page.keyboard.press('Enter');
  assert.equal(await firstDisclosure.evaluate((element) => element.open), false);

  for (const id of ['experience', 'technologies', 'education']) {
    await page.locator(`.section-nav a[href="#${id}"]`).click();
    assert.equal(await page.evaluate(() => location.hash), `#${id}`);
    await page.waitForFunction((targetId) => {
      const top = document.getElementById(targetId).getBoundingClientRect().top;
      return top >= 0 && top < innerHeight;
    }, id);
  }

  await page.evaluate(() => {
    window.__printCalled = 0;
    window.print = () => { window.__printCalled += 1; };
  });
  await page.locator('[data-print]').first().click();
  assert.equal(await page.evaluate(() => window.__printCalled), 1);

  const anchorsValid = await page.evaluate(() => {
    const ids = new Set([...document.querySelectorAll('[id]')].map((element) => element.id));
    return [...document.querySelectorAll('a[href^="#"]')].every((anchor) => ids.has(anchor.getAttribute('href').slice(1)));
  });
  assert(anchorsValid, 'A fragment link has no target');

  results.interactions = {
    disclosures: 'mouse and keyboard passed',
    navigation: 'all three section links passed',
    printButton: 'passed',
    emailLinks: 'sticky header mailto link verified',
    anchors: 'all fragment targets exist',
    content: 'nine roles and current role verified',
  };
  results.contrast = await contrastChecks(page);
  for (const [name, value] of Object.entries(results.contrast)) {
    assert(value >= 4.5, `${name} contrast ${value}:1 is below 4.5:1`);
  }

  results.performance = await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    return {
      requests: resources.length + 1,
      encodedBodyBytes: resources.reduce((total, resource) => total + (resource.encodedBodySize || 0), navigation?.encodedBodySize || 0),
      transferBytes: resources.reduce((total, resource) => total + (resource.transferSize || 0), navigation?.transferSize || 0),
      domContentLoadedMs: Math.round(navigation?.domContentLoadedEventEnd || 0),
      loadMs: Math.round(navigation?.loadEventEnd || 0),
      resources: resources.map((resource) => ({ name: resource.name.split('/').pop(), encodedBodyBytes: resource.encodedBodySize })),
    };
  });
  await context.close();

  const printSession = await openPage(794, 1123);
  await printSession.page.emulateMedia({ media: 'print' });
  await printSession.page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
  const printState = await printSession.page.evaluate(() => ({
    allOpen: [...document.querySelectorAll('details[data-responsibilities]')].every((detail) => detail.open),
    headerHidden: getComputedStyle(document.querySelector('.site-header')).display === 'none',
    mobileEmailAbsent: !document.querySelector('.mobile-email'),
    summaryHidden: getComputedStyle(document.querySelector('.responsibilities summary')).display === 'none',
  }));
  assert(printState.allOpen && printState.headerHidden && printState.mobileEmailAbsent && printState.summaryHidden);
  await printSession.page.screenshot({ path: resolve(reviewDir, 'print.png'), fullPage: true });
  await printSession.page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
  assert.equal(await printSession.page.locator('details[open]').count(), 0);
  results.print = printState;
  await printSession.context.close();

  assert.equal(consoleErrors.length, 0, `Console errors: ${consoleErrors.join('\n')}`);
  assert.equal(failedResponses.length, 0, `Failed responses: ${failedResponses.join('\n')}`);
  results.consoleErrors = consoleErrors;
  results.failedResponses = failedResponses;
  results.status = 'passed';
  await writeFile(resolve(reviewDir, 'verification.json'), JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}
