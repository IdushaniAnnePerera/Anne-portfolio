# Anne Perera — Portfolio

[![CI](https://github.com/IdushaniAnnePerera/Anne-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/IdushaniAnnePerera/Anne-portfolio/actions/workflows/ci.yml)

Personal portfolio for Anne Perera — BSc (Hons) Computer Science student at the University of Kelaniya, Sri Lanka. AI/ML researcher and full-stack developer.

## Live Sections

- **Hero** — name, summary, CV download, GitHub/LinkedIn links, floating tech icons, and GitHub contributions calendar
- **About** — bio, education timeline, and achievements
- **Projects** — selected works with images, tech tags, and GitHub links
- **Experience** — extra-curricular activities with photo galleries (horizontal scroll)
- **Skills** — categorised tech stack
- **Certifications** — 3D tilt cards for credentials
- **Contact** — get in touch form and links

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Three.js (`@react-three/fiber`, `@react-three/drei`)
- `react-github-calendar`

## Local Development

```bash
cd Frontend
npm install
npm run dev
```

Production build:

```bash
cd Frontend
npm run build
npm run preview
```

## Deployment

Vercel recommended settings:

| Setting | Value |
|---|---|
| Framework | Vite |
| Root directory | `Frontend` |
| Build command | `npm run build` |
| Output directory | `dist` |

## Updating Content

All portfolio copy lives in `Frontend/src/data/portfolio.js` — edit that file to update the hero, bio, skills, projects, experience, and education.

## Project Structure

```
.
├── README.md
└── Frontend/
    ├── package.json
    ├── public/assets/     ← images, icons, CV
    └── src/
        ├── App.jsx
        ├── data/portfolio.js
        ├── components/
        ├── context/
        ├── hooks/
        └── utils/
```

## License

MIT
