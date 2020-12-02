"use strict";

// Powers are async functions that take in the index of the user and optionally a powerArg (see healPower's healAmount)
async function noPower(birdIndex) {
    // Birds with no power shouldn't be able to use their power anyway.
}

async function healPower(birdIndex, healAmount) {
    if (currTurn === PLAYER_TURN) {
		await getPlayerBird(ACTION_POWER_TARGET).then(healedBirdIndex => {
			playerBirds[healedBirdIndex].health += healAmount;
			playerBirds.splice(birdIndex, 1);
		});
	} else if (currTurn === ENEMY_TURN) {
	    const healedBirdIndex = Math.floor(Math.random() * enemyBirds.length); // nice AI
		enemyBirds[healedBirdIndex].health += healAmount;
		enemyBirds.splice(birdIndex, 1);
	}
}

async function cawPower(birdIndex) {
	// Cawing targets an enemy bird. The cawed bird is unable to attack, use Powers, or block damage for 1 turn.
	if (currTurn === PLAYER_TURN) {
		await getEnemyBird().then(cawedBirdIndex => {
			enemyBirds[cawedBirdIndex].cawed = true;
		});
	} else if (currTurn === ENEMY_TURN) {
		const cawedBirdIndex = Math.floor(Math.random() * playerBirds.length); // nice AI
		playerBirds[cawedBirdIndex].cawed = true;
	}
	this.powerUsed = true;
}

async function attackPower(birdIndex) {
    if (currTurn === PLAYER_TURN) {
		await getEnemyBird().then(defender => {
			birdAttackBirds(this, [enemyBirds[defender]]);
		});
	} else if (currTurn === ENEMY_TURN) {
		const defender = Math.floor(Math.random() * playerBirds.length);
		birdAttackBirds(this, [playerBirds[defender]]);
	}
}

async function cheddarCheesePower(birdIndex) {
	if (currTurn === PLAYER_TURN) {
		await getPlayerBird().then(healedBirdIndex => {
			playerBirds[healedBirdIndex].health += 2;
		});
	} else if (currTurn === ENEMY_TURN) {
		const healedBirdIndex = Math.floor(Math.random() * enemyBirds.length);
		enemyBirds[healedBirdIndex].health += 2;
	}
	this.powerUsed = true;
}

async function summonBirdPower(birdIndex) {
	const summonedBird = summonableBirds[Math.floor(Math.random() * summonableBirds.length)]();
	console.log(summonedBird.name + " was summoned!");
	if (currTurn === PLAYER_TURN) {
		playerBirds.push(summonedBird);
	} else if (currTurn === ENEMY_TURN) {
		enemyBirds.push(summonedBird);
	}
	this.powerUsed = true;
}

async function stealBirdPower(birdIndex) {
	if (currTurn === PLAYER_TURN) {
		await getEnemyBird().then(stolenBirdIndex => {
			playerBirds.push(enemyBirds[stolenBirdIndex]);
			enemyBirds.splice(stolenBirdIndex, 1);
			playerBirds.splice(playerBirds.indexOf(this), 1);
		})
	} else if (currTurn === ENEMY_TURN) {
		const stolenBirdIndex = Math.floor(Math.random() * playerBirds.length);
		enemyBirds.push(playerBirds[stolenBirdIndex]);
		playerBirds.splice(stolenBirdIndex, 1);
		enemyBirds.splice(enemyBirds.indexOf(this), 1);
	}
}
