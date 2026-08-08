# Homepage

[![CI](https://img.shields.io/github/actions/workflow/status/KotaHusky/Homepage/ci.yml?branch=main&label=CI&logo=github)](https://github.com/KotaHusky/Homepage/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/KotaHusky/Homepage?logo=semantic-release&color=blue)](https://github.com/KotaHusky/Homepage/releases)
[![License: MIT](https://img.shields.io/github/license/KotaHusky/Homepage?color=green)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Personal homepage built with modern web technologies and cloud-native DevOps practices. Live at **[kota.dog](https://kota.dog)**.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19 and TypeScript 6
- **Styling:** Tailwind CSS 4 (glassmorphism buttons, animated aurora ambient background)
- **Icons:** FontAwesome (CDN) + [react-icons](https://react-icons.github.io/react-icons/) (Simple Icons)
- **Accessibility:** Keyboard focus rings, `prefers-reduced-motion` support, ARIA-labelled icon links and dialog
- **Testing:** Vitest + React Testing Library
- **Build Caching:** Turborepo
- **Runtime:** Node.js 24

## DevOps & Infrastructure

This project demonstrates a production-grade CI/CD pipeline and a fully static, serverless AWS + Cloudflare deployment:

- **Static export:** Next.js `output: 'export'` produces a fully static `apps/web/out/` bundle — no server runtime, no always-on compute
- **CI/CD:** GitHub Actions pipelines leveraging reusable workflows from a shared [cicd-toolkit](https://github.com/KotaHusky/cicd-toolkit)
- **Hosting:** Static assets synced to Amazon **S3** (`kota-homepage-prod` / `-dev`, `us-east-1`), locked to Cloudflare origin IPs
- **Edge:** A **Cloudflare Worker** (`worker/`) fronts the bucket — apex redirect (`www` → apex), S3 proxy with index resolution, and edge caching. No CloudFront, ECS, or Fargate.
- **DNS:** Cloudflare (proxied) — `kota.dog` and `dev.kota.dog`
- **Releases:** Automated semantic versioning and changelogs via semantic-release and conventional commits (enforced with commitlint)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — hot reloading is enabled.

### Production Preview

```bash
npm run build
npm run serve
```

### Other Commands

```bash
npm run test     # Run tests
npm run lint     # Lint the codebase
```

## License

[MIT](LICENSE)
