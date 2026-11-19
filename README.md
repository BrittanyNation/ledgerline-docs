# LedgerLine Docs — Billing and Claims Documentation Hub

**Live site:** https://brittanynation.github.io/ledgerline-docs/

A fully functional documentation hub website for **LedgerLine**, a fictional medical billing and claims platform: twelve searchable guides with full article readers and worked examples, an interactive API playground that validates a sample request and returns a realistic simulated response with a generated reference, and a resources page with a release changelog, a searchable glossary, FAQ accordions, a validated feedback form, and a duplicate aware letter signup. Every interactive element works, with no dead buttons and no placeholder links.

This is an original portfolio concept by Brittany Nation. No affiliation with any real company is claimed, and no real health or billing information should be entered; sample data lives only in the visitor browser. It supports applications for Technical Writer (Liquibase), Claims Examiner (Gainwell Technologies), Claims Operations Senior Associate (Devoted Health), Prebill Specialist I (Digitech / Sarnova), Virtual Subrogation Specialist (Afni), and Junior eCommerce Web Developer (EquipmentShare), because it combines real documentation writing, a coded front end, and a working claims workflow in one site. Design workflow: Sketch and Webflow for layout thinking, built with HTML, CSS, and JavaScript.

## Course track: complete — combined-skills build

The daily projects followed Dr. Angela Yu's Full-Stack Web Development Bootcamp (Udemy) one skill at a time: live APIs and async JavaScript, Node.js and Express, databases and REST API design, authentication, and React. With all five steps complete, this build combines the front-end patterns from across the course in plain JavaScript, with the code commented as study material:

- **Data-driven rendering** — guides, changelog entries, glossary terms, and FAQs are all built from data arrays.
- **State and persistence** — helpful votes, playground request history, feedback, and letter signups save to localStorage on every change and restore on load.
- **Derived state** — visible guides and glossary terms are computed from filter, search, and sort inputs, never stored twice; the playground response is derived from the validated request.
- **Validated forms** — the playground validates patient reference format, member ID, a non-future date of service, amount where the endpoint needs one, and an appeal note of at least 10 characters before generating an LL-XXXXXX confirmation reference. The feedback form validates name, email, topic, and a message of at least 20 characters before generating an LL-F-XXXXX reference.
- **Honest simulation** — the playground labels itself a browser simulation in the page copy and in every confirmation. Nothing is sent to a real payer or server.

## What works on the site

- **Guides** — 12 guides across Getting Started, Claims, Denials, Eligibility, and Payments; topic chips, live search in the hero and the toolbar, three sort orders, live result count, honest empty state, a full article reader with numbered steps, a worked example, a copyable code block, and a helpful vote that persists and then disables.
- **API Playground** — four endpoints (submit a claim, check eligibility, claim status inquiry, submit an appeal), full inline validation, a simulated JSON response with a copy button, a confirmation with a generated LL-XXXXXX reference, and a request history saved on the device with a clear-history control.
- **Changelog and Glossary** — three release entries in accordions that open one at a time, an 8 term searchable glossary, six FAQ accordions, a validated feedback form ending in an LL-F-XXXXX reference, and a duplicate aware LedgerLine Letter signup.

## Verified

Automated DOM checks against the built files cover: all 12 guide cards rendering, topic filtering, search narrowing and the empty state, sort order, the article reader, its code copy note, and its persisted vote, playground invalid submits including a bad patient format and a future date, a valid claim request with response JSON and LL reference format and history persistence, an appeal note rejection, history clearing, changelog and FAQ accordions opening one at a time, glossary search, feedback validation and confirmation, and the letter signup with duplicate recognition.

## Palette

Ink plum `#2E2235`, orchid `#8B5FA6`, blush `#E8B4C8`, gold `#D9A441`, warm paper `#FBF7F2`, soft lavender `#EFE7F3`, ink `#241E28`.

## Images

All content imagery is real photography from Pexels, downloaded into `images/` and referenced locally (photo IDs 164686, 3183150, 3184291, 3184465, 3769021, 4065876, 590041, 7176319, 8293778). The `og-image.png` is a branded design graphic, not a photograph.

## Files

- `index.html` — guides home with Open Graph tags
- `docs.js` — guide data, filtering, search, sort, article reader, copy, and votes, commented as study code
- `playground.html` — API playground form, response, and history
- `playground.js` — validation, simulated response, references, and history, commented as study code
- `resources.html` — changelog, glossary, FAQs, feedback, and letter signup
- `resources.js` — accordion, glossary, and form logic, commented as study code
- `styles.css` — shared styling
- `og-image.png` — 1200 by 627 social preview graphic in the project palette
