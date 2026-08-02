---
updated_at: "2024-05-19T14:08:00Z"
---

## Architecture Overview

This project is a static web application serving as a digital yearbook for class 7A1 (THCS Chu Văn An - Thanh Trì). It utilizes a simple client-side architecture with Firebase Realtime Database for persistence (voting and potentially chat).

## Key Components

| Component | Path | Responsibility |
|-----------|------|---------------|
| Login Gate | `index.html` | Simple passcode protection ("2013") before entering the main site. |
| Dashboard | `main.html` | The core of the application, containing the member list, random picker, countdown, and voting logic. |
| Member Data | `main.html` | Hardcoded array of student objects (names, DOBs, nicknames, images). |
| Real-time Sync | `Firebase RTDB` | Stores and synchronizes voting counts across clients. |
| Assets | `*.jpg` | Profile pictures and background images for the class. |

## Data Flow

1. **Auth:** User enters passcode in `index.html` -> Redirect to `main.html`.
2. **Display:** `main.html` loads student data from a local JS array and renders the UI.
3. **Voting:** User clicks a poll option -> Local state update -> Push to Firebase RTDB -> Real-time update via `on('value')` listener to all clients.
4. **Random Picker:** Selects a student from the pool of members who haven't been picked too many times.

## Conventions

- **Inline Scripts:** Most logic is kept within `<script>` tags in HTML files for simplicity.
- **CSS Variables:** Used in `main.html` for consistent branding (colors like `--cyan`, `--gold`).
- **External CDNs:** Firebase and Google Fonts are loaded via direct URLs.
