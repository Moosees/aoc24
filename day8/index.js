import { open } from "node:fs/promises";

let xLength = 0;
let yLength = 0;
const antennas = {};
const map = [];
let antinodes = 0;

const input = await open("./input.txt");

for await (const line of input.readLines()) {
  xLength = line.length;

  for (let x = 0; x < line.length; x++) {
    const tile = line[x];

    if (tile === ".") continue;

    if (antennas[tile] === undefined) antennas[tile] = [];
    antennas[tile].push({ x, y: yLength });
  }

  map.push(line.split(""));
  yLength++;
}

function checkAntinode({ x, y }) {
  if (x < 0 || y < 0 || x >= xLength || y >= yLength) return;
  if (map[y][x] === "#") return;

  map[y][x] = "#";
  antinodes++;
}

function findAntinodes(coords) {
  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const tile1 = coords[i];
      const tile2 = coords[j];

      const xDiff = Math.max(tile1.x, tile2.x) - Math.min(tile1.x, tile2.x);
      const yDiff = Math.max(tile1.y, tile2.y) - Math.min(tile1.y, tile2.y);

      const anti1 = {
        x: tile1.x > tile2.x ? tile1.x + xDiff : tile1.x - xDiff,
        y: tile1.y > tile2.y ? tile1.y + yDiff : tile1.y - yDiff,
      };
      const anti2 = {
        x: tile2.x > tile1.x ? tile2.x + xDiff : tile2.x - xDiff,
        y: tile2.y > tile1.y ? tile2.y + yDiff : tile2.y - yDiff,
      };

      checkAntinode(anti1);
      checkAntinode(anti2);
    }
  }
}

map.forEach((line) => console.log(line.join("")));

for (const antenna in antennas) {
  if (antennas.hasOwnProperty(antenna)) {
    const coords = antennas[antenna];
    findAntinodes(coords);
  }
}

console.log(antinodes);
map.forEach((line) => console.log(line.join("")));
