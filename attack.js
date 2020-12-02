"use strict";

function birdAttackBird(attacker, defender, dryRun = false) {
	const damage = Math.min(attacker.damage, defender.health); // Update for Hummingbird
	if (dryRun) { // dryRun causes the function to return the expected damage rather than actually attacking.
	    return damage;
	} else {
		// Actually do the damage
    	defender.health -= damage;
		
		// Check for deaths
		//! This only checks for deaths of the team whose turn it isn't. If a bird is added that can do damage on another's turn, this will need to be fixed.
		if (defender.health <= 0) {
			if (currTurn === PLAYER_TURN) {
				enemyBirds.splice(enemyBirds.indexOf(defender), 1);
				console.log(`Enemy ${defender.name} has died!`);
			} else if (currTurn === ENEMY_TURN) {
				playerBirds.splice(playerBirds.indexOf(defender), 1);
				console.log(`Your ${defender.name} has died!`);
		    }
	    }
	    updateBirdDisplays();
	}
}

function birdAttackBirds(attacker, defenders) {
	let playerRedWingedBlackbirds;
	if (currTurn === ENEMY_TURN) {
		playerRedWingedBlackbirds = playerBirds.filter(bird => bird.name === "Red-Winged Blackbird" && !bird.powerUsed && !bird.cawed);
	}
	let enemyRedWingedBlackbirds;
    if (currTurn === PLAYER_TURN) {
		enemyRedWingedBlackbirds = enemyBirds.filter(bird => bird.name === "Red-Winged Blackbird" && !bird.powerUsed && !bird.cawed);
	}
	if (currTurn === ENEMY_TURN && playerRedWingedBlackbirds.length) {
		let totalDamage = 0;
		for (const defender of defenders) {
		    totalDamage += birdAttackBird(attacker, defender, true);
	    }
		if (confirm("Enemy " + attacker.name + " wishes to deal a total of " + totalDamage + " to your " + defenders.map(x => x.name).join(", ") + ". Block with Red-Winged Blackbird?")) {
			const redWingedBlackbird = playerRedWingedBlackbirds[0]; //TODO: If the player has multiple Red-Winged Blackbirds, allow them to choose one
			console.log("Your Red-Winged Blackbird has blocked " + totalDamage + " damage.");
			redWingedBlackbird.powerUsed = true;
			redWingedBlackbird.health -= totalDamage;
			if (redWingedBlackbird.health <= 0) {
				playerBirds.splice(playerBirds.indexOf(redWingedBlackbird), 1);
				console.log("Your Red-Winged Blackbird has died!");
			}
			updateBirdDisplays();
			return; // Block the actual attack
		}
	} else if (currTurn === PLAYER_TURN && enemyRedWingedBlackbirds.length) {
		let totalDamage = 0;
		for (const defender of defenders) {
		    totalDamage += birdAttackBird(attacker, defender, true);
	    }
		if (totalDamage >= 2 && Math.random() < 0.04 * Math.pow(totalDamage, 2.25)) {
		    // block chance = 0.04 * damage^2.25. This is 19% at 2, 47% at 3, 90% at 4, and 100% above that.
			const redWingedBlackbird = enemyRedWingedBlackbirds[0]; //TODO: If the enemy has multiple Red-Winged Blackbirds, allow them to choose one
			console.log("Enemy Red-Winged Blackbird has blocked " + totalDamage + " damage.");
			redWingedBlackbird.powerUsed = true;
			redWingedBlackbird.health -= totalDamage;
			if (redWingedBlackbird.health <= 0) {
				enemyBirds.splice(enemyBirds.indexOf(redWingedBlackbird), 1);
				console.log("Enemy Red-Winged Blackbird has died!");
			}
			updateBirdDisplays();
			return; // Block the actual attack
		}
	}
	const def = Array.from(defenders); // If this didn't happen, if a single bird died, the last bird wouldn't get attacked because JS would think it was done.
	for (const defender of def) {
		birdAttackBird(attacker, defender);
	}
}
