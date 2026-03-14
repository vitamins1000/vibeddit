# vibeddit

Fake Reddit for vibe coded projects. Get the dopamine of posting without annoying anyone.

## Setup

```bash
cp .env.example .env
# edit .env — add your Anthropic API key
docker compose up -d --build
```

Runs on http://localhost:8080 by default. Change `PORT` in `.env` to move it.

## Architecture

```
browser → nginx (frontend:80) → /api/* proxy → backend:3001 → api.anthropic.com
```

- `frontend`: nginx serving static HTML, proxies `/api/` to backend
- `backend`: Node/Express proxy that injects `ANTHROPIC_API_KEY` — key never touches the browser

## Usage

- Toggle **wholesome / brutal** in the header to switch comment tone
- Click **Comments** on any post to generate fake community feedback
- **↺ Regenerate** to re-roll the comments
- **+ Create Post** to submit your own project and subject it to the fake horde

## Updating

```bash
docker compose pull
docker compose up -d --build
```
