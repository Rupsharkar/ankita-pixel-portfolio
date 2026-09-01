# PRD — AARAV.EXE Retro Arcade Portfolio

## Original Problem Statement
"i want a portfolio for my hcl guvi..i will apply through haveloc..i am a mca student but i dont want some average website it should be very pop up and memorable that will guaratee selection..also i want someting like pixel style"

User choices: Classic arcade dark theme (neon on black, CRT scanlines). All other details defaulted to editable placeholder content.

## User Personas
- The candidate: MCA final-year student applying to HCL GUVI via Haveloc, wants to stand out.
- The recruiter: HCL GUVI / Haveloc reviewer who should remember this portfolio among hundreds.

## Architecture
- Frontend: React 19 + TypeScript + Vite + Tailwind v4, motion (framer-motion) for animation, lenis for smooth scrolling, sonner toasts. All content in one editable config: `src/data/portfolio.ts`.
- Backend: FastAPI (`/api` prefix), MongoDB via `lib/db`. Contact messages in `contact_messages` collection.
- Endpoints: GET /api/, POST /api/contact, GET /api/contact.

## Implemented (2026-09-01)
- PRESS START arcade boot screen with coin sprite + 8-bit Web Audio SFX (coin/start/blip/powerup) + sound toggle in navbar
- Kinetic hero: masked line-by-line reveal, mouse-parallax starfield (2 layers), pixel invader sprite, RPG HUD stats, START QUEST / RESUME.PDF buttons
- Slow editorial marquee (HCL GUVI READY ✦ MCA CLASS OF 2026 ✦ ...)
- Chapter 01 About: character class selector (Fullstack Knight / Backend Wizard / Algo Alchemist), character sheet, HCL GUVI mission brief
- Chapter 02 Skills: 3 skill trees with animated segmented XP bars + combo badges
- Chapter 03 Quests: 4 sample MCA projects as game levels with difficulty badges + detail modal (stack, demo/repo links)
- Final Stage Contact: working form → MongoDB + success/error toasts, High Scores panel, GitHub/LinkedIn/Email links
- CRT scanline + vignette + flicker overlay, Konami code easter egg (↑↑↓↓←→←→BA → GOD MODE modal with recruiter cheat code)
- Pixel-corners panels, neon glow typography (Press Start 2P / VT323 / Pixelify Sans / JetBrains Mono)
- data-testid on all interactive elements

## Backlog
- P0: Replace placeholder identity in src/data/portfolio.ts (real name, email, GitHub/LinkedIn URLs, resume PDF link, real projects)
- P1: Email notification on contact form submit (Resend)
- P1: Visitor counter / "players online" arcade stat
- P2: Playable mini-game section (e.g., breakout or snake)
- P2: Downloadable 8-bit styled resume PDF generated from config
- P2: Achievements/trophies section for certifications (GUVI certs)

## Next Tasks
1. User sends real name/links/projects → swap into config
2. Wire Resend email alerts for new contact messages
3. Add certifications section

## Test Credentials
No auth in this app. See /app/memory/test_credentials.md.
