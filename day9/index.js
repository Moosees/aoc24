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
console.log({ part1 });

// PART 2
const input2 = await open("./input.txt");

const disk2 = [];
const free = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };

for await (const line of input2.readLines()) {
  let id = 0;
  let diskIndex = 0;

  for (let i = 0; i < line.length; i++) {
    const length = +line[i];
    const isFile = i % 2 === 0;
    const blocks = new Array(length).fill(isFile ? id : ".");

    disk2.push(...blocks);
    if (isFile) id++;
    else if (length > 0) free[length].push(diskIndex);

    diskIndex += length;
  }
}

function findLength(startIndex) {
  let length = 0;
  let i = startIndex;
  const id = disk2[i];
  while (disk2[i] === id) {
    length++;
    i--;
  }
  return length;
}

function findFree(length, fromIndex) {
  let foundLength;
  for (let i = 1; i <= 9; i++) {
    if (i < length) continue;
    if (
      free[i].length > 0 &&
      (foundLength === undefined || free[i][0] < free[foundLength][0])
    ) {
      foundLength = i;
    }
  }

  if (!foundLength || free[foundLength][0] > fromIndex - length) return;

  const toIndex = free[foundLength].shift();
  const diff = +foundLength - length;

  if (diff > 0) {
    const diffIndex = toIndex + length;
    free[diff] = [...free[diff], diffIndex].sort((a, b) => a - b);
  }

  return toIndex;
}

function move(fromIndex, toIndex, length) {
  let done = 0;
  const id = disk2[fromIndex];

  while (done < length) {
    disk2[fromIndex - done] = ".";
    disk2[toIndex + done] = id;
    done++;
  }
}

let prevId = ".";
let lowestMoved;
for (let i = disk2.length - 1; i >= 0; i--) {
  if (disk2[i] === prevId || disk2[i] === "." || disk[i] > lowestMoved)
    continue;

  const length = findLength(i);
  const found = findFree(length, i);
  if (found !== undefined) {
    lowestMoved = disk2[i];
    move(i, found, length);
  }

  prevId = disk2[i];
}

const part2 = disk2.reduce((acc, id, i) => {
  if (id === ".") return acc;
  return acc + id * i;
}, 0);

console.log({ part2 });
