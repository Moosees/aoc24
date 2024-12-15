import { open } from "node:fs/promises";

console.log("Part one");
async function readMap() {
  const input = await open("./map.txt");

  const map = [];
  let startPos;
  let y = 0;

  for await (const line of input.readLines()) {
    map.push(line.split(""));

    const robotXPos = map[y].findIndex((instruction) => instruction === "@");
    if (robotXPos > -1) {
      startPos = { y, x: robotXPos };
      map[startPos.y][startPos.x] = ".";
    }
    y++;
  }

  await input?.close();
  return { map, startPos };
}

function checkBehindBox(map, pos, direction) {
  const targetPos = {
    x: pos.x + direction.x,
    y: pos.y + direction.y,
  };
  let currentPos = targetPos;

  while (true) {
    currentPos = {
      x: currentPos.x + direction.x,
      y: currentPos.y + direction.y,
    };
    const currentTile = map[currentPos.y][currentPos.x];

    if (currentTile === "O") continue;
    if (currentTile === "#") return pos;

    map[currentPos.y][currentPos.x] = "O";
    map[targetPos.y][targetPos.x] = ".";
    return targetPos;
  }
}

const directions = {
  "^": { y: -1, x: 0 },
  ">": { y: 0, x: 1 },
  v: { y: 1, x: 0 },
  "<": { y: 0, x: -1 },
};
function robotDoStuff(instruction, map, pos) {
  const direction = directions[instruction];
  const targetCoords = { x: pos.x + direction.x, y: pos.y + direction.y };
  const targetTile = map[targetCoords.y][targetCoords.x];

  if (targetTile === "#") return pos;
  if (targetTile === ".") return targetCoords;
  return checkBehindBox(map, pos, direction);
}

async function moveRobotOnMap(map, startPos) {
  let currentPos = startPos;

  const input = await open("./moves.txt");
  for await (const line of input.readLines()) {
    line.split("").forEach((instruction) => {
      currentPos = robotDoStuff(instruction, map, currentPos);
    });
  }

  await input?.close();
}

function getAnswer(map) {
  let sum = 0;

  for (let y = 0; y < map.length; y++) {
    const line = map[y];
    for (let x = 0; x < line.length; x++) {
      const tile = line[x];

      if (tile !== "O") continue;
      sum += x + y * 100;
    }
  }

  return sum;
}

console.time("Time");
const { map, startPos } = await readMap();
await moveRobotOnMap(map, startPos);
console.log("Answer: ", getAnswer(map));
console.timeEnd("Time");
map.forEach((line) => {
  console.log(line.join(""));
});
console.log("End part one");
console.log("----------------------");
