# Roadmap: Kỷ yếu A1

## Phases

- [ ] **Phase 1: Stabilization** - Clean up mixed environment and organize source code.
- [ ] **Phase 2: Feature Enhancement** - Improve UI/UX and add more interactive features.
- [ ] **Phase 3: Data Management** - Move student data to an external format and optimize assets.
- [ ] **Phase 4: Completion and Deployment** - Final testing and public launch.

## Phase Details

### Phase 1: Stabilization
**Goal**: Establish a clean development environment by separating project source from unrelated application files.
**Depends on**: Nothing
**Requirements**: STAB-01, STAB-02, STAB-03
**Success Criteria** (what must be TRUE):
  1. Root directory is free of Cursor/VSCode binary files (e.g., `.exe`, `.dll`, `.pak`).
  2. All source files are consolidated into a logical structure (e.g., `src/`, `assets/`).
  3. The website remains fully functional with all links and assets resolving correctly in the new structure.
**Plans**: TBD

### Phase 2: Feature Enhancement
**Goal**: Elevate the user experience and engagement through UI improvements and new interactive elements.
**Depends on**: Phase 1
**Requirements**: FEAT-01, FEAT-02, FEAT-03
**Success Criteria** (what must be TRUE):
  1. UI is responsive and consistently styled across all pages.
  2. Voting system and countdown timer have improved visual feedback and stability.
  3. Real-time chat or guestbook is functional and integrated into the dashboard.
**Plans**: TBD
**UI hint**: yes

### Phase 3: Data Management
**Goal**: Decouple content from code to make the project easier to maintain and faster to load.
**Depends on**: Phase 1
**Requirements**: DATA-01, DATA-02
**Success Criteria** (what must be TRUE):
  1. Student data is fetched from an external `members.json` file rather than being hardcoded in `main.html`.
  2. All images are optimized/compressed, leading to significantly faster page load times.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Completion and Deployment
**Goal**: Ensure the project is production-ready and accessible to the target audience.
**Depends on**: Phase 2, Phase 3
**Requirements**: DEPL-01, DEPL-02
**Success Criteria** (what must be TRUE):
  1. Site passes comprehensive testing on major browsers (Chrome, Safari, Edge) and devices (iOS, Android).
  2. Site is successfully deployed to a hosting platform (e.g., Firebase Hosting) and accessible via a public URL.
**Plans**: TBD

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Stabilization | 0/3 | Not started | - |
| 2. Feature Enhancement | 0/3 | Not started | - |
| 3. Data Management | 0/2 | Not started | - |
| 4. Completion and Deployment | 0/2 | Not started | - |
