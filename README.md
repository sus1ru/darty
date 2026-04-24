# Darty

Darty is a React dart scoring app for a 1v1 match. It supports common x01 games, player name editing, turn tracking, bust handling, double-out checkout, and a clickable dartboard UI.

## Features

- 1v1 dart match scoring
- Select starting score: `301`, `501`, or `701`
- Edit player names
- Three-dart turn tracking
- Miss / no-score throw support
- Double-out checkout rule
- Bust handling for:
  - score below `0`
  - score of `1`
  - reaching `0` without a double
- Legs tracking, with first to `3` legs winning the match
- Alternating leg starter
- Dark and light theme toggle
- Interactive dartboard with real dartboard number order

## Tech Stack

- React
- Vite
- Tailwind CSS
- Docker / Docker Compose for development

## Requirements

For local development without Docker, use Node.js `20.19+` or `22.12+`.

The Docker setup uses `node:22-alpine`, so it already satisfies the Vite requirement.

## Run With Docker

```bash
docker compose up -d
```

Open:

```text
http://localhost:5173
```

Stop the container:

```bash
docker compose down
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

Open:

```text
http://localhost:5173
```

## Scripts

```bash
npm run dev
```

Starts the Vite dev server.

```bash
npm run build
```

Builds the production app.

```bash
npm run lint
```

Runs ESLint.

```bash
npm run preview
```

Serves the production build locally.

## Game Rules

Each player starts from the selected score and takes up to three darts per turn.

A player wins a leg only by reaching exactly `0` on a double. The inner bull counts as a double worth `50`.

A throw busts the turn if it makes the score go below `0`, leaves the player on `1`, or reaches `0` without a double. On bust, the player's score returns to the score they had at the start of that turn, and the turn passes to the other player.

The match is first to `3` legs.

## Project Structure

```text
src/
  App.jsx                  Main UI and setup controls
  gameReducer.js           Dart scoring and match state logic
  components/
    Dartboard.jsx          Interactive SVG dartboard
  App.css                  Board animation and SVG interaction styles
  index.css                Tailwind import and global base styles
```
