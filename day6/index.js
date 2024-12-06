import { open } from "node:fs/promises";

const map = [];

let visited = 1;

let directions = [
  { label: "up", x: 0, y: -1 },
  { label: "right", x: 1, y: 0 },
  { label: "down", x: 0, y: 1 },
  { label: "left", x: -1, y: 0 },
];
let currentDir = 0;
let currentPos = {};

async function paintMap(filePath) {
  const input = await open(filePath);

  let y = 0;
  for await (const line of input.readLines()) {
    const x = line.indexOf("^");
    if (x >= 0) currentPos = { x, y };
    map.push(line.split(""));
    y++;
  }
}

function turn() {
  currentDir = currentDir === 3 ? 0 : currentDir + 1;
}

function move({ x, y }) {
  const nextValue = map[y][x];
  if (nextValue === ".") {
    visited++;
    map[y][x] = ",";
  }

  currentPos = { x, y };
}

function getNextMapTile(direction) {
  return { x: currentPos.x + direction.x, y: currentPos.y + direction.y };
}

function checkMap(mapTile) {
  const { x, y } = mapTile;
  if (x < 0 || y < 0 || x >= map[0].length || y >= map.length) return "leave";

  return map[y][x] === "#" ? "turn" : "move";
}

await paintMap("./input.txt");

while (true) {
  const direction = directions[currentDir];
  const nextTile = getNextMapTile(direction);
  const nextMove = checkMap(nextTile);

  if (nextMove === "leave") break;

  if (nextMove === "turn") {
    turn();
    continue;
  }

  move(nextTile);
}

console.log(visited);
