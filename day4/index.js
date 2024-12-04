import { open } from "node:fs/promises";

const input = await open("./input.txt");

const inAry = [];

for await (const line of input.readLines()) {
  inAry.push(line);
}

let answer = 0;

const match = "MAS";
const dirs = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
];

function search(start, dir, oob) {
  for (let i = 1; i <= match.length; i++) {
    const nextMatch = match[i - 1];
    const { x, y } = { x: start.x + dir.x * i, y: start.y + dir.y * i };
    if (x < 0 || y < 0 || x >= oob.x || y >= oob.y || inAry[y][x] !== nextMatch)
      return false;
  }
  return true;
}

for (let y = 0; y < inAry.length; y++) {
  const row = inAry[y];

  for (let x = 0; x < row.length; x++) {
    if (row[x] !== "X") continue;
    const oob = { x: row.length, y: inAry.length };

    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      if (search({ x, y }, dir, oob)) answer++;
    }
  }
}

console.log(answer);
