import { open } from "node:fs/promises";

const input = await open("./input.txt");

function getLineValue(input) {
  const valid = input.match(/mul\(\d+,\d+\)/g);

  let sum = 0;

  for (const operation of valid) {
    const [num1, num2] = operation.match(/\d+/g);
    sum += +num1 * +num2;
  }

  return sum;
}

let answer = 0;

for await (const line of input.readLines()) {
  answer += getLineValue(line);
}

console.log(answer);
