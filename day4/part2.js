import { open } from "node:fs/promises";

const input = await open("./input.txt");

const inAry = [];

for await (const line of input.readLines()) {
  inAry.push(line);
}

let answer = 0;

const dirs = [
  [
    { x: 1, y: -1 },
    { x: -1, y: 1 },
  ],
  [
    { x: -1, y: -1 },
    { x: 1, y: 1 },
  ],
];

function getLetter(x, y, oob) {
  if (x < 0 || y < 0 || x >= oob.x || y >= oob.y) return "";
  return inAry[y][x];
}

function search(start, oob) {
  let masCount = 0;

  for (let i = 0; i < dirs.length; i++) {
    const pair = dirs[i];
    let found = "";

    for (let j = 0; j < pair.length; j++) {
      const dir = pair[j];
      const { x, y } = { x: start.x + dir.x, y: start.y + dir.y };
      found += getLetter(x, y, oob);
    }

    if (found === "MS" || found === "SM") masCount++;
  }
  if (masCount === 2) answer++;
}

for (let y = 0; y < inAry.length; y++) {
  const row = inAry[y];

  for (let x = 0; x < row.length; x++) {
    if (row[x] !== "A") continue;
    const oob = { x: row.length, y: inAry.length };

    search({ x, y }, oob);
  }
}

console.log(answer);
