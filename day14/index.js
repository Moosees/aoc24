import { open } from "node:fs/promises";

console.log("Part one");
console.time("Time");
const input = await open("./input.txt");
const dimensions = { x: 101, y: 103 };
const quads = [0, 0, 0, 0];

for await (const line of input.readLines()) {
  const [start, velocity] = line.split(" ");
  const [startX, startY] = start.split("=")[1].split(",");
  const [velX, velY] = velocity.split("=")[1].split(",");

  const movedX = (+startX + velX * 100) % dimensions.x;
  const movedY = (+startY + velY * 100) % dimensions.y;
  const finalX = movedX >= 0 ? Math.abs(movedX) : movedX + dimensions.x;
  const finalY = movedY >= 0 ? Math.abs(movedY) : movedY + dimensions.y;

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
