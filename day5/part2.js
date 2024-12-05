import { open } from "node:fs/promises";

const input = await open("./input.txt");

const rules = {};
function addRule(rule) {
  const [before, after] = rule.split("|");
  if (rules[after]) rules[after].push(before);
  else rules[after] = [before];
}

const valid = [];
function checkRules(input) {
  const ary = input.split(",");
  let forbidden = new Set([]);

  for (const num of ary) {
    if (forbidden.has(num)) return fixLine(ary);
    forbidden = forbidden.union(new Set(rules[num]));
  }
}

function fixLine(line) {
  const ary = line.toSorted((a, b) => {
    if (rules[a].includes(b + "")) return 1;
    if (rules[b].includes(a + "")) return -1;
    return 0;
  });

  valid.push(ary[Math.floor(ary.length / 2)]);
}

for await (const line of input.readLines()) {
  if (line[2] === "|") addRule(line);
  else if (line.length < 2) continue;
  else checkRules(line);
}
console.log(valid.reduce((sum, val) => sum + +val, 0));
