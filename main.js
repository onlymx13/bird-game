"use strict";

// The starting set of birds. Some birds are contained multiple times (for whatever reason).
const allBirds = [robin, robin, crow, meadowlark, meadowlark, meadowlark, cardinal, bluejay, oriole, yellowFinch, redWingedBlackbird, eagle, bluebird];

// When summoning a bird, birds that summon are excluded and each bird has equal probability.
const summonableBirds = [robin, crow, meadowlark, cardinal, bluejay, oriole, redWingedBlackbird, eagle, bluebird];

let allBirdsCopy = Array.from(allBirds);
//TODO: draft these.
let playerBirds = [], enemyBirds = [];

// Randomize the birds between playerBirds and enemyBirds.
for (let i = 0; i < Math.ceil(allBirds.length / 2); i++) {
	let index = Math.floor(Math.random() * allBirdsCopy.length);
	playerBirds.push(allBirdsCopy[index]());
	allBirdsCopy.splice(index, 1);
}
enemyBirds = allBirdsCopy.map(x => x());

document.body.onload = () => {
	document.getElementById("useAttackButton").onclick = playerUseAttack;
	document.getElementById("usePowerButton").onclick = playerUsePower;
	updateBirdDisplays();
	playerTakeTurn();
}