const http = require('http');
const fs = require('fs');
const path = require('path');
const { WebSocketServer } = require('ws');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(500); res.end('Error'); return; }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

const wss = new WebSocketServer({ server });

const players = new Map(); // id -> { ws }
let nextId = 1;
let hostId = null;

wss.on('connection', (ws) => {
  const id = nextId++;
  const isHost = hostId === null;
  if (isHost) hostId = id;

  players.set(id, { ws });

  // Tell this player their ID, role, and existing players
  const existingIds = [];
  for (const [pid] of players) {
    if (pid !== id) existingIds.push(pid);
  }
  ws.send(JSON.stringify({ type: 'init', id, isHost, existingPlayers: existingIds }));

  // Tell everyone else a player joined
  broadcastExcept(id, { type: 'player_joined', id });

  console.log(`Player ${id} connected (${isHost ? 'HOST' : 'GUEST'}). Total: ${players.size}`);

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    msg.id = id; // stamp sender id

    switch (msg.type) {
      case 'position':
      case 'shoot':
      case 'zombie_sync':
      case 'zombie_kill':
      case 'wave':
      case 'player_hit':
      case 'player_died':
        broadcastExcept(id, msg);
        break;
    }
  });

  ws.on('close', () => {
    players.delete(id);
    if (hostId === id) {
      hostId = null;
      for (const [pid] of players) {
        hostId = pid;
        players.get(pid).ws.send(JSON.stringify({ type: 'become_host' }));
        break;
      }
    }
    broadcast({ type: 'player_left', id });
    console.log(`Player ${id} disconnected. Total: ${players.size}`);
  });
});

function broadcast(msg) {
  const data = JSON.stringify(msg);
  for (const [, p] of players) { if (p.ws.readyState === 1) p.ws.send(data); }
}

function broadcastExcept(excludeId, msg) {
  const data = JSON.stringify(msg);
  for (const [id, p] of players) { if (id !== excludeId && p.ws.readyState === 1) p.ws.send(data); }
}

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Zombie Deathmatch server running at http://localhost:${PORT}`);
  console.log('Share your local network IP for LAN play.');
});
