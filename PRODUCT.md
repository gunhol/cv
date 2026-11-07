# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro and TypeScript generate a fully static HTML/CSS site with no client UI framework. Node.js 26 is the preferred toolchain, recorded in `.nvmrc` and GitHub Actions. Deployment runs through GitHub Actions to GitHub Pages with `www.hollander.one` as the custom domain.

## Users

Recruiters, hiring managers, and engineering leaders evaluating Gunnar Hollander for engineering roles. They need to assess experience efficiently and find a clear way to make contact.

## Product Purpose

Present Gunnar Hollander's public curriculum vitae so hiring audiences can evaluate his experience and suitability for engineering roles. Success means visitors can understand his background, recognize his Forward Deployed Engineer role at Sanitas, and take the next step toward contact.

## Positioning

Gunnar continues at Sanitas as a Forward Deployed Engineer from December 2026. At the owner's direction, the homepage presents this as his current role. It emphasizes applied, customer-facing engineering: working closely with users or stakeholders to turn business needs into shipped software solutions. This builds on more than a decade of experience across Swiss banking and healthcare, including technical leadership, microservice architecture, software quality, and developer coaching.

His preceding Lead Software Engineer role included setting up and delivering Offer & Application projects in collaboration with business units, plus sharing and improving AI tooling, solutions, and engineering pipelines. Present these as responsibilities without inventing adoption figures, business outcomes, or project scale.

## Operating Context

The site is a public professional profile used during hiring and professional evaluation. It currently lives at `https://www.hollander.one`. Its deployment workflow must be compatible with GitHub Actions. The existing implementation supports browser printing, and the upgraded homepage must retain a clean printed CV.

## Capabilities and Constraints

Use the supplied CV and explicit owner updates as the factual source for roles, dates, locations, skills, education, languages, contact details, and profile summary. Do not invent credentials, experience, project outcomes, or testimonials.

Present Forward Deployed Engineer at Sanitas as the current role from December 2026, with Lead Software Engineer as the preceding role through November 2026. Do not describe the new role as upcoming and do not add detailed responsibilities beyond the confirmed applied, customer-facing focus.

The upgraded site must remain fairly minimal in appearance and fast loading. Career details should be concise by default and expandable on demand, with all details available in print. Email contact is the primary visitor action.

## Brand Commitments

Use the existing public name Gunnar Hollander, the contact address `contact@hollander.one`, and the location Zürich, Switzerland. Present Forward Deployed Engineer as the current headline role, dated from December 2026. Keep the presentation fairly minimal. The existing dark visual treatment is reference material, not a requirement to preserve it; the owner has chosen to replace the visual identity.

## Evidence on Hand

The owner supplied the previous project at `$HOME/Documents/git/astro-cv`; a working copy is available under `.reference/astro-cv/`. Its original structured data contains eight existing experience entries, four skill categories, two education entries, and three languages.

The owner confirmed the Sanitas role transition, its applied customer-facing focus, and the additional Lead Software Engineer responsibilities on 2026-11-07, then directed that the site use a post-transition timeframe. The imported `src/data/cv.ts` now records nine experience entries, the current Forward Deployed Engineer role, and these confirmed responsibilities.

The live site at `https://www.hollander.one` provides the previous rendered reference. No detailed project case studies, testimonials, or photographic assets are present in the supplied project. Future work must not fabricate them.

## Product Principles

1. Make engineering experience easy to assess.
2. Lead with the confirmed current role while keeping career chronology clear.
3. Use only factual content supplied or explicitly approved by the owner.
4. Keep the path to email contact clear.
5. Keep the interface minimal and the page fast loading.
6. Keep the implementation compatible with GitHub Actions deployment.
