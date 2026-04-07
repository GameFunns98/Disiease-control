# Roblox Medical MDT

Roblox Medical MDT is a Vercel-ready Next.js dashboard for Roblox hospital roleplay support.

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Local TypeScript dataset (no database)

## Features

- Search diseases by name
- Search diseases by symptom checklist + manual symptom entry
- Ranked match results using score:
  - `matchedSymptoms / totalDiseaseSymptoms`
- Exact and partial match badges
- Unknown/incomplete data badge handling (`??`, `???`, `It depends..`)
- Treatment lists rendered in strict stored order
- Favorites (localStorage)
- Recent disease searches (localStorage)
- Copy-to-clipboard treatment plans
- Printable clean view
- Reset filters button

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Keep default framework preset (Next.js).
4. No environment variables required.
5. Click **Deploy**.

This project is fully deployable to Vercel with default settings.
