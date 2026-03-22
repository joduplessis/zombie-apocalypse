# Zombie Apocalypse

> A multiplayer browser-based zombie survival deathmatch where the real question isn't "will you survive the horde?" — it's "will you survive your coworkers?"

Built with Three.js and WebSockets. No build step. No webpack. No 847 npm dependencies. Just zombies, bullets, and betrayal.

## What Is This?

You and your friends (or enemies — we don't judge) spawn into a grim, rain-soaked city overrun by the undead. Zombies shamble toward you in waves. Buildings block your path. Your ammo runs out at the worst possible moment.

Oh, and everyone can shoot each other.

It started as a wholesome co-op survival game. Then someone asked "what if we could also shoot the other players?" and here we are. Office morale has never been lower. Productivity has never been higher.

## Features

- **Unlimited players** — bring the whole team, bring the whole company, bring your enemies
- **Zombie waves** — they get faster, tougher, and more numerous. Just like your deadlines
- **Full PvP** — because the zombies weren't stressful enough
- **Scoreboard** — tracks zombie kills AND player kills so you know exactly who to trust (nobody)
- **Kill feed** — public shaming in real-time
- **Rain** — for atmosphere and existential dread
- **Mobile support** — twin-stick touch controls so you can betray your friends from the couch
- **Respawn** — death is temporary, grudges are forever
- **Isometric camera** — we're classy like that
- **Buildings** — with little glowing windows because even during the apocalypse, someone left the lights on

## Setup

You need [Node.js](https://nodejs.org) (v16 or later).

```bash
# Clone or download the project
cd zombie-game

# Install dependencies (it's literally just one)
npm install

# Start the server
npm start
```

The game runs at **http://localhost:3000**.

## Playing With Others

### Same network (LAN)

Find your local IP address:

```bash
# macOS
ipconfig getifaddr en0

# Linux
hostname -I

# Windows
ipconfig
```

Share `http://<your-ip>:3000` with everyone on the same Wi-Fi. Done.

### Over the internet

Use a tunnel like [ngrok](https://ngrok.com), [cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/), or [tailscale](https://tailscale.com):

```bash
# Example with ngrok
ngrok http 3000
```

Share the generated URL. Anyone with the link can join.

## Controls

### Desktop

| Action | Control |
|--------|---------|
| Move | WASD or Arrow Keys |
| Aim | Mouse cursor |
| Shoot | Left click |
| Reload | R |

### Mobile

| Action | Control |
|--------|---------|
| Move | Left joystick |
| Aim + shoot | Right joystick (auto-fires while held) |
| Reload | R button |

## How It Works

- First player to connect becomes the **host** and runs the zombie AI
- If the host disconnects, hosting transfers automatically
- Zombies chase the nearest player — use your friends as bait (we won't tell)
- Waves spawn when all zombies are eliminated
- Each wave brings more zombies that are faster and harder to kill
- Player damage: 15hp per bullet. Zombie damage: scales with wave number
- You can respawn after death. Your score persists. Your dignity does not.

## Tech Stack

- **Three.js** (r128) — 3D rendering, loaded from CDN
- **ws** — WebSocket server, the only npm dependency
- **Node.js http** — serves the single HTML file
- **Vibes** — the rest

No bundler. No framework. No TypeScript. One HTML file and a 90-line server. The way nature intended.

## License

[MIT](LICENSE) — do whatever you want with it. If you use it for team building, we accept no responsibility for any resulting HR incidents.
