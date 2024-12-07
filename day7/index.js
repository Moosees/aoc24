import { open } from "node:fs/promises";

const input = await open("./input.txt");

let result = 0;

for await (const line of input.readLines()) {
  result += checkLine(line);
}

function buildBridge(target, buildingBlocks) {
  if (buildingBlocks.length === 1) {
    return buildingBlocks[0] === target ? target : 0;
  }

  const [block1, block2, ...blocks] = buildingBlocks;
  const bb1 = [block1 + block2, ...blocks];
  const bb2 = [block1 * block2, ...blocks];
  const bb3i1 = +`${block1}${block2}`;
  const bb3 = [bb3i1, ...blocks];

  return (
    buildBridge(target, bb1) ||
    buildBridge(target, bb2) ||
    buildBridge(target, bb3)
  );
}

function checkLine(line) {
  const [value, equation] = line
    .split(":")
    .map((x, i) => (i === 0 ? +x : x.split(" ").map((x) => +x)));

  return buildBridge(value, equation);
}

console.log(result);
