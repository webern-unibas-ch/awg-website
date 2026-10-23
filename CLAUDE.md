# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The static website of the Anton Webern Gesamtausgabe (AWG), University of Basel, served at www.anton-webern.ch (see `CNAME`). It is plain hand-written HTML/CSS/JS: there is no `package.json`, no build step, no test suite, and no templating. The only CI workflows are security-related (CodeQL, dependency review, OpenSSF Scorecard).

- **Preview locally:** serve the repo root over HTTP (e.g. `npx serve .` or `python -m http.server`). Opening files via `file://` breaks the ES module imports in `assets/js/`.
- **Formatting:** Prettier with `.prettierrc.json` (4-space indent, single quotes, `printWidth` 120, `bracketSameLine`). VS Code formats on save. From the CLI: `npx prettier --write <file>`. The odd `</a\n>` / `</span\n>` line breaks in the HTML come from Prettier and are intentional.

## Structure and conventions

- `index.html` at the root just redirects to `de/`.
- `de/` and `en/` are **parallel page trees with translated folder and file names** (e.g. `de/forschung/publikationen.html` ↔ `en/research/publications.html`, `de/edition/gliederung.html` ↔ `en/edition/outline.html`, `de/projekt/mitarbeitende.html` ↔ `en/project/editorial-staff.html`). Each tree has 28 pages. When you change content in one language, update the matching page in the other.
- **Every page duplicates the whole page chrome**: the Google Analytics snippet, `#header` (logos, DE|EN switch, contact link), the top `#menu`, the section's left `#submenu`, and the `#maintext`/`#righttext` columns. There are no includes, so a change to navigation or header must be applied to every affected page in both languages. The DE|EN switch on each page links to its counterpart page, so check it when you add or rename pages.
- The `active`, `first` and `last` classes on menu and submenu `<div>`s are set by hand on each page.
- All asset and page links are relative (`../../assets/...`, `../edition/...`).

## JavaScript

- `assets/js/edition-outline.js` plus `edition-data.js`: the expandable edition outline on `de/edition/gliederung.html` and `en/edition/outline.html`. `EDITION_DATA.nodes` is a flat nested-set export (`id`, `parent_id`, `depth`, `sort`, `leftnr`/`rightnr`, HTML `title`, `description`). The top-level series nodes (36, 37, 38) are hard-coded in each outline page's HTML. Child nodes are built lazily on click by filtering `parent_id`, and each title's width is computed from `depth` (`580 - (depth-1)*20` px).
- `assets/js/awg-bib.js` (with `awg-bib.css`): used by the publications pages. They embed the bibliography through a BibBase `<script>` that renders `https://www.anton-webern.ch/assets/documents/AWG.bib`. Because BibBase fetches the **deployed** file, edits to `assets/documents/AWG.bib` only appear after they are deployed. The script then rewrites the BibBase output in the DOM to the AWG citation style (for example "editor." becomes "(Hg.):", "In" becomes "in:", and a title ending in `“.` gets a comma instead).

## Commits

Use Conventional Commits with a scope, as the history does: `fix(website): …`, `fix(research): …`, `fix(assets): …`, `feat(assets): …`, `ci(website): …`. Dependabot opens the `build(deps)` commits.
