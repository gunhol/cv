---
name: Gunnar Hollander CV
description: The Applied Record, a warm and ordered professional CV system.
colors:
  ground: "oklch(96.5% 0.024 76)"
  current-surface: "oklch(95.5% 0.025 55)"
  surface: "oklch(100% 0 0)"
  text: "oklch(24% 0.012 70)"
  muted: "oklch(48% 0.018 65)"
  border: "oklch(89.5% 0.018 65)"
  action: "oklch(67.8% 0.196 39)"
  action-hover: "oklch(62% 0.19 39)"
  action-text: "oklch(47% 0.14 38)"
typography:
  display:
    fontFamily: "'Nunito Sans Variable', sans-serif"
    fontSize: "clamp(2.25rem, 10vw, 3.25rem)"
    fontWeight: 720
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "'Nunito Sans Variable', sans-serif"
    fontSize: "28px"
    fontWeight: 720
    lineHeight: 1.6
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Nunito Sans Variable', sans-serif"
    fontSize: "19px"
    fontWeight: 750
    lineHeight: 1.3
  body:
    fontFamily: "'Nunito Sans Variable', sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Nunito Sans Variable', sans-serif"
    fontSize: "14px"
    fontWeight: 650
    lineHeight: 1.6
rounded:
  control: "10px"
  record: "16px"
spacing:
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 15px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 15px"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "10px 15px"
  record:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.record}"
    padding: "20px"
  current-role:
    backgroundColor: "{colors.current-surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    padding: "28px 24px"
---

# Design System: Gunnar Hollander CV

## Overview

**Creative North Star: "The Applied Record"**

The system presents engineering experience as an ordered set of useful records rather than a decorative developer portfolio. A warm peach field, white reading surfaces, and rounded humanist type make the CV approachable while preserving professional clarity. Orange is scarce and actionable, so contact and disclosure controls are immediately identifiable.

Density is deliberate: concise records support scanning, native disclosures reveal detail, and print expands into a complete document. Depth comes from tonal layering and a single soft profile shadow, not effects or animation. The interface stays static, readable, and functional before any visual refinement.

**Key Characteristics:**
- Warm peach ground with white, soft-cornered records
- One self-hosted humanist sans across every level
- Orange reserved for actions and disclosure cues
- Chronological records with accessible on-demand detail
- Minimal motion and a complete print equivalent

## Colors

The palette is warm and quiet, with a single saturated action family against neutral reading surfaces.

### Primary
- **Action Orange** (`{colors.action}`): Filled email actions and rare moments requiring immediate attention.
- **Deep Action Orange** (`{colors.action-hover}`): Hover feedback for filled actions.
- **Burnt Orange** (`{colors.action-text}`): Disclosure labels and list markers on white records.

### Neutral
- **Warm Peach** (`{colors.ground}`): The page field and sticky header.
- **Pale Peach** (`{colors.current-surface}`): The current-role inset and tonal separation without another card.
- **Paper White** (`{colors.surface}`): Profile, experience, and education reading records.
- **Warm Ink** (`{colors.text}`): Headings, body copy, filled-button text, and focus outlines.
- **Muted Warm Ink** (`{colors.muted}`): Dates, locations, summaries, and secondary guidance.
- **Warm Line** (`{colors.border}`): Hairline borders, dividers, and quiet-control outlines.

### Named Rules
**The One Voice Rule.** Saturated orange belongs to actions and disclosure cues only; large fields, decorative graphics, and heading text stay neutral.

## Typography

**Display Font:** Nunito Sans Variable, self-hosted, with a generic sans fallback

**Body Font:** Nunito Sans Variable, self-hosted, with a generic sans fallback

**Character:** Rounded, direct, and highly readable. Weight and size establish hierarchy without introducing a second display personality.

### Hierarchy
- **Display** (`{typography.display}`): The profile promise only, fluid across small and large screens.
- **Headline** (`{typography.headline}`): Major CV sections.
- **Title** (`{typography.title}`): Experience roles and record-level subjects.
- **Body** (`{typography.body}`): Summaries, companies, responsibilities, and skills, generally constrained to a comfortable reading measure.
- **Label** (`{typography.label}`): Navigation, dates, actions, and disclosures.

### Named Rules
**The One Family Rule.** Use weight, size, spacing, and small caps-like status styling for contrast; do not add a decorative serif, monospace, or system display face.

## Layout

Use a centered page container capped at 1180 px. Mobile records and page chrome use 16 px gutters; wider layouts use 32 px gutters. Spacing follows the recorded 4 px-based scale, with clear separation between sections and tighter grouping inside records.

At 768 px and above, the profile becomes a two-column record, experience entries become date/content/status grids, skills split into two columns, and the header stops wrapping. At 1100 px, the current-role column gains modest width. Below 768 px, all reading regions stack and the header wraps without hiding email, print, or section navigation. No layout depends on horizontal scrolling.

## Elevation & Depth

Depth is restrained and mostly tonal. White records sit on peach, the current role uses a pale peach inset, and thin warm lines define record edges. Only the primary profile record receives a soft ambient shadow.

### Shadow Vocabulary
- **Profile lift** (`box-shadow: 0 14px 36px oklch(35% 0.03 55 / 0.07)`): A diffuse shadow that separates the lead record from the ground without making every record float.

### Named Rules
**The Flat-By-Default Rule.** Experience and education records stay flat; use borders and tonal changes before adding another shadow.

## Shapes

Records have gently rounded corners, controls have a tighter matching radius, and both use thin warm borders. The current role is an inset region rather than a nested card. Small circular language separators and native disclosure chevrons are the only recurring ornamental geometry.

## Components

### Buttons
Tactile, compact, and direct, with a minimum 44 px interaction height.

- **Primary:** Action Orange fill, Warm Ink text, inline SVG icon, and a short verb label.
- **Quiet:** Transparent fill, Warm Line border, Warm Ink text, and the same dimensions as primary.
- **Hover / Focus:** Primary darkens; quiet gains a white surface and stronger border. Every control has a visible 3 px Warm Ink focus outline with offset.
- **Active:** A brief scale press provides feedback; reduced-motion preferences remove transitions.

### Cards / Containers
White records carry thin borders and soft record corners. Profile and current-role regions form one continuous container. Experience and education records remain independent and flat, with no cards nested inside them.

### Navigation
The sticky header carries the public name, three real section anchors, print, and email. Navigation uses muted labels that darken and underline on hover. Mobile wraps the header rather than hiding controls behind a menu.

### Responsibility Disclosures
Native `details` and `summary` elements preserve keyboard behavior without a UI framework. Burnt Orange labels explicitly switch between viewing and hiding responsibilities. The chevron rotates subtly, and print removes the summary while exposing the full list.

### Print Document
Printing removes navigation and action chrome, neutralizes background and shadow treatments, expands all responsibilities, and keeps individual experience records together where possible. Contact details remain visible in the document body.

## Do's and Don'ts

### Do:
- **Do** keep email as the dominant orange action and print as the quiet secondary action.
- **Do** preserve the Experience, Technologies, Education reading order.
- **Do** use semantic records, native disclosures, visible focus, and complete print output.
- **Do** keep body copy within a comfortable reading measure and let long names wrap naturally.

### Don't:
- **Don't** nest cards or turn the current role into a separate floating card.
- **Don't** add decorative gradients, animation, metrics, testimonials, or unsupported claims.
- **Don't** use orange for large backgrounds, headings, or non-action decoration.
- **Don't** introduce external font requests, icon fonts, or a client UI framework.
- **Don't** restore a floating mobile action that can obscure reading content.
