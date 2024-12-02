import { open } from "node:fs/promises";

const input = await open("./input.txt");

let safe = 0;

function checkSafe(inAry) {
  if (inAry[0] === inAry[1]) return false;

  const asc = inAry[0] < inAry[1];

  for (let i = 1; i < inAry.length; i++) {
    const lvl1 = inAry[i - 1];
    const lvl2 = inAry[i];

    if (lvl1 === lvl2) return false;
    if (asc && lvl1 > lvl2) return false;
    if (!asc && lvl1 < lvl2) return false;
    if (Math.abs(lvl1 - lvl2) > 3) return false;
  }

  return true;
}

for await (const line of input.readLines()) {
  if (checkSafe(line.split(/\s+/).map((x) => +x))) safe++;
}

console.log(safe);
