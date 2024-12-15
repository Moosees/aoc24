import { open } from "node:fs/promises";

console.log("Part one");
console.time("Time");
const input = await open("./input.txt");
const dimensions = { x: 101, y: 103 };
const quads = [0, 0, 0, 0];

function findPosAtSecond(line, s) {
  const [start, velocity] = line.split(" ");
  const [startX, startY] = start.split("=")[1].split(",");
  const [velX, velY] = velocity.split("=")[1].split(",");

  const movedX = (+startX + velX * s) % dimensions.x;
  const movedY = (+startY + velY * s) % dimensions.y;
  const finalX = movedX >= 0 ? Math.abs(movedX) : movedX + dimensions.x;
  const finalY = movedY >= 0 ? Math.abs(movedY) : movedY + dimensions.y;

  return { finalX, finalY };
}

for await (const line of input.readLines()) {
  const { finalX, finalY } = findPosAtSecond(line, 100);

  if (
    finalX === Math.floor(dimensions.x / 2) ||
    finalY === Math.floor(dimensions.y / 2)
  )
    continue;

  const isLeft = finalX < Math.floor(dimensions.x / 2);
  const isTop = finalY < Math.floor(dimensions.y / 2);

  if (isLeft && isTop) quads[0]++;
  else if (!isLeft && isTop) quads[1]++;
  else if (isLeft && !isTop) quads[2]++;
  else if (!isLeft && !isTop) quads[3]++;
}

const part1 = quads.reduce((sum, val) => sum * val);
console.timeEnd("Time");
console.log("Answer: ", part1);
console.log("------------------");

console.log("Part two");
async function paintMapAtSecond(s) {
  const map = new Array(103)
    .fill(undefined)
    .map((_x) => new Array(101).fill(0));

  const input = await open("./input.txt");

  for await (const line of input.readLines()) {
    const { finalX, finalY } = findPosAtSecond(line, s);
    map[finalY][finalX]++;
  }

  map.forEach((line) => console.log(line.join("").replace(/0/g, " ")));
}

function getVarianceAtSecond(lines, s) {
  let variance = 0;

  lines.forEach((line) => {
    const { finalX, finalY } = findPosAtSecond(line, s);
    variance += Math.abs(finalX - 50) + Math.abs(finalY - 50);
  });

  return variance;
}

async function lookForTrees() {
  const lines = [];
  const p2input = await open("./input.txt");

  for await (const line of p2input.readLines()) {
    lines.push(line);
  }

  let minVarianceFound;
  for (let i = 0; i < 9999; i++) {
    const variance = getVarianceAtSecond(lines, i);

    if (i === 0 || variance < minVarianceFound) {
      minVarianceFound = variance;
      console.log({ s: i, variance });
    }
  }
}

console.time("Part 2");
await lookForTrees();
console.timeEnd("Part 2");
paintMapAtSecond(8179);
