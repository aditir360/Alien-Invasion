/*
@title: Alien Invasion
@author: Aditi Ranjan
*/

const player = "p";
const alien = "a";
const bullet = "b";
const wall = "w";

setLegend(
  [player, bitmap`
....0000....
...022220...
..02222220..
.0222222220.
.0220020020.
.0220020020.
.0222222220.
.0222202220.
.0222020220.
.0220220220.
..02222020..
...0222020..
....0000....
....0..0....
...0....0...
..0......0..`],
  [alien, bitmap`
....3333....
...344443...
..34444443..
.3444444443.
.3440330343.
.3440330343.
.3444444443.
.3444433443.
.3444343443.
.3443443443.
..34444343..
...3443443..
....3333....
....3..3....
...3....3...
..3......3..`],
  [bullet, bitmap`
................
.......3........
......333.......
.....33333......
......333.......
.......3........
................
................`],
  [wall, bitmap`
0000000000000000
0666606666666660
0666606666666660
0666606666666660
0666606666666660
0666606666666660
0666606666666660
0000000000000000
0666666666066660
0666666666066660
0666666666066660
0666666666066660
0666666666066660
0666666666066660
0000000000000000
0000000000000000`]
);

setSolids([player, wall]);

let level = 0;
const levels = [
  map`
wwwwwwwwwwwwwwww
w..............w
w..............w
w.....a........w
w..............w
w..............w
w....p.........w
w..............w
w..............w
w..............w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w..............w
w..............w
w.....a........w
w........a.....w
w..............w
w....p.........w
w..............w
w..............w
w.....a........w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w..............w
w..............w
w.....a....a...w
w........a.....w
w..............w
w....p.........w
w..............w
w..............w
w.....a........w
w..............w
w..............w
w..............w
wwwwwwwwwwwwwwww`
];

setMap(levels[level]);

setPushables({
  [player]: []
});


function shoot() {
  const p = getFirst(player);
  addSprite(p.x, p.y - 1, bullet);
}


onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  shoot();
});


afterInput(() => {
  const bullets = getAll(bullet);
  for (let b of bullets) {
    b.y -= 1;
    if (b.y < 0) {
      b.remove();
    }
  }

  const aliens = getAll(alien);
  for (let a of aliens) {
    const b = getTile(a.x, a.y);
    if (b.length > 1) {
      b[1].remove();
      a.remove();
    }
  }

  const playerPos = getFirst(player);
  const alienPos = getFirst(alien);

  if (!alienPos) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Win!", { x: 6, y: 6, color: color`3` });
    }
    
  } else if (playerPos.x === alienPos.x && playerPos.y === alienPos.y) {
    addText("Game Over!", { x: 5, y: 6, color: color`3` });
  }
  
});
