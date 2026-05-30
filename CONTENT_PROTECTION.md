# Content Protection Notes

## Applied Date
- 2026-05-30

## Purpose
- Reduce casual content sharing and copying on the portfolio site.
- Block common browser-level actions such as right-click, text selection, and copy shortcuts.

## Applied Changes
1. `index.html`
- Added `Content-Security-Policy` meta.
- Added `frame-ancestors 'none'` to reduce embedding risk.
- Restricted `base-uri` and `form-action`.

2. `style.css`
- Applied `user-select: none` on `body`.
- Kept `input`, `textarea` selectable for basic usability.

3. `script.js`
- Blocked events: `contextmenu`, `selectstart`, `dragstart`, `copy`, `cut`.
- Blocked keys: `F12`, `Ctrl/Cmd + A/C/S/U/P/X`, `Ctrl+Shift+I/J/C`.
- Added best-effort PrintScreen handling (prevent + clipboard clear attempt).

## Important Limitation
- Full screenshot prevention is not technically possible from client-side web code alone.
- OS-level capture, browser extensions, developer tools bypass, or external camera capture cannot be fully blocked.
- Current implementation is best-effort deterrence, not absolute prevention.

