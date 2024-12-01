import { open } from "node:fs/promises";

const left = [];
const right = [];

const input = await open("./input.txt");

for await (const line of input.readLines()) {
  const [l, r] = line.split(/\s+/, 2);
  left.push(+l);
  right.push(+r);
}

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

let diff = 0;

for (let index = 0; index < left.length; index++) {
  const l = left[index];
  const r = right[index];

  const distance = Math.abs(l - r);

  diff += distance;
}

console.log(diff);
