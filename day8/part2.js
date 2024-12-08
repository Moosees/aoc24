import { open } from "node:fs/promises";

let xLength = 0;
let yLength = 0;
const antennas = {};
const map = [];

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

function checkAntinodes(start, direction) {
  let nextTile = start;

  while (true) {
    nextTile = { x: nextTile.x + direction.x, y: nextTile.y + direction.y };
    const { x, y } = nextTile;

    if (x < 0 || y < 0 || x >= xLength || y >= yLength) return;
    map[y][x] = "#";
  }
}

function findAntinodes(coords) {
  if (coords.length < 2) return;

  for (let i = 0; i < coords.length - 1; i++) {
    for (let j = i + 1; j < coords.length; j++) {
      const tile1 = coords[i];
      const tile2 = coords[j];

      const xDiff = Math.max(tile1.x, tile2.x) - Math.min(tile1.x, tile2.x);
      const yDiff = Math.max(tile1.y, tile2.y) - Math.min(tile1.y, tile2.y);

      const anti1 = {
        x: tile1.x > tile2.x ? xDiff : xDiff * -1,
        y: tile1.y > tile2.y ? yDiff : yDiff * -1,
      };
      const anti2 = {
        x: tile2.x > tile1.x ? xDiff : xDiff * -1,
        y: tile2.y > tile1.y ? yDiff : yDiff * -1,
      };

      checkAntinodes(tile1, anti1);
      checkAntinodes(tile2, anti2);
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

console.log(
  map.reduce((acc, row) => {
    row.forEach((tile) => {
      if (tile !== ".") acc++;
    });
    return acc;
  }, 0),
);
map.forEach((line) => console.log(line.join("")));
