# Homepage

Personal homepage built with modern web technologies and cloud-native DevOps practices.

## Tech Stack

- **Framework:** Next.js 15 with React 19 and TypeScript
- **Styling:** Tailwind CSS
- **Testing:** Vitest + React Testing Library
- **Build Caching:** Turborepo

## DevOps & Infrastructure

This project demonstrates a production-grade CI/CD pipeline and container orchestration setup:

- **Containerization:** Multi-stage Docker build producing a minimal Node.js Alpine image
- **CI/CD:** GitHub Actions pipelines leveraging reusable workflows from a shared [cicd-toolkit](https://github.com/KotaHusky/cicd-toolkit)
- **Registry:** Docker images published to GitHub Container Registry (GHCR)
- **Releases:** Automated semantic versioning and changelogs via semantic-release and conventional commits (enforced with commitlint)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app with hot reloading.

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
