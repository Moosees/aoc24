import { open } from "node:fs/promises";

const input = await open("./input.txt");

const disk = [];
for await (const line of input.readLines()) {
  let id = 0;

  for (let i = 0; i < line.length; i++) {
    const length = +line[i];
    const isFile = i % 2 === 0;
    const blocks = new Array(length).fill(isFile ? id : ".");

    disk.push(...blocks);
    if (isFile) id++;
  }
}

let part1 = 0;
let i = 0;
let j = disk.length - 1;

while (i < disk.length) {
  if (i < j && disk[i] === "." && disk[j] !== ".") {
    disk[i] = disk[j];
    disk[j] = ".";
  }
  if (disk[i] !== ".") {
    part1 += disk[i] * i++;
  }
  if (i >= j && disk[i] === ".") i++;
  if (disk[j] === ".") j--;
}

// console.log(disk.join(""));
console.log(part1);
