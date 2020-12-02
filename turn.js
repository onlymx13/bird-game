"use strict";

const PLAYER_TURN = 0;
const ENEMY_TURN = 1;
let currTurn = PLAYER_TURN;

let playerActionsTaken;

function playerUseAttack() {
	document.getElementById("useAttackButton").disabled = true;
	document.getElementById("usePowerButton").disabled = true;
	setButtonStates(playerBirdButtons, true);
	document.getElementById("passTurnButton").disabled = false;
	getPlayerBird(ACTION_ATTACK).then(attacker => {
		if (attacker === -1) { // The player skipped the attacking turn.
			setButtonStates(playerBirdButtons.concat(enemyBirdButtons), false);
			document.getElementById("passTurnButton").disabled = true;
			if (++playerActionsTaken < 2) {
				document.getElementById("usePowerButton").disabled = false;
			} else {
				// End the player's turn.
				currTurn = ENEMY_TURN;
				enemyTakeTurn();
			}
			return;
		}
		switch (playerBirds[attacker].name) {
			case "Blue Jay": // Attack that hits up to 3 birds for 1 damage each.
				console.log(`Your Blue Jay attacks!`);
				if (enemyBirds.length <= 3) { // If there are 3 or fewer birds, hit all of them.
					birdAttackBirds(playerBirds[attacker], enemyBirds);
					setButtonStates(playerBirdButtons.concat(enemyBirdButtons), false);
					document.getElementById("passTurnButton").disabled = true;
					if (++playerActionsTaken < 2) {
						document.getElementById("usePowerButton").disabled = false;
					} else {
						// End the player's turn.
						currTurn = ENEMY_TURN;
						enemyTakeTurn();
					}
				} else { // If there are more than 3 birds, let the player choose which to hit.
					setButtonStates(enemyBirdButtons, true);
					getEnemyBird(false).then(defender1 => {
						enemyBirdButtons.filter(x => x.birdNum === defender1)[0].disabled = true;
						getEnemyBird(false).then(defender2 => {
							enemyBirdButtons.filter(x => x.birdNum === defender2)[0].disabled = true;
							getEnemyBird(false).then(defender3 => {
								birdAttackBirds(playerBirds[attacker], [defender1, defender2, defender3].map(x => enemyBirds[x]));
								setButtonStates(playerBirdButtons.concat(enemyBirdButtons), false);
								document.getElementById("passTurnButton").disabled = true;
								if (++playerActionsTaken < 2) {
									document.getElementById("usePowerButton").disabled = false;
								} else {
									// End the player's turn.
									currTurn = ENEMY_TURN;
									enemyTakeTurn();
								}
							});
						});
					});
				}
				break;
			default:
				getEnemyBird().then(defender => {
					console.log(`Your ${playerBirds[attacker].name} attacks enemy ${enemyBirds[defender].name}!`);
					birdAttackBirds(playerBirds[attacker], [enemyBirds[defender]]);
					setButtonStates(playerBirdButtons.concat(enemyBirdButtons), false);
					document.getElementById("passTurnButton").disabled = true;
					if (++playerActionsTaken < 2) {
						document.getElementById("usePowerButton").disabled = false;
					} else {
						// End the player's turn.
						currTurn = ENEMY_TURN;
						enemyTakeTurn();
					}
				});
		}
	});
}

function enemyUseAttack() {
	const eligibleAttackers = enemyBirds.filter(bird => !bird.cawed);
	if (eligibleAttackers.length === 0) {
		console.log("The enemy skipped their attacking turn due to having no eligible birds!");
	} else {
		const attacker = Math.floor(Math.random() * eligibleAttackers.length); // nice AI
		switch (eligibleAttackers[attacker].name) {
			case "Blue Jay": // Attack that hits up to 3 birds for 1 damage each.
				console.log(`Enemy Blue Jay attacks!`);
				let defenders = [];
				for (let i = 0; i < Math.min(3, playerBirds.length); i++) {
					let defender;
					do {
						defender = Math.floor(Math.random() * playerBirds.length);
					} while (defenders.includes(defender));
					defenders.push(defender);
				}
				birdAttackBirds(eligibleAttackers[attacker], defenders.map(x => playerBirds[x]));
				break;
			default:
				const defender = Math.floor(Math.random() * playerBirds.length);
				console.log(`Enemy ${eligibleAttackers[attacker].name} attacks your ${playerBirds[defender].name}!`);
				birdAttackBirds(eligibleAttackers[attacker], [playerBirds[defender]]);
		}
	}
}

function playerUsePower() {
	document.getElementById("useAttackButton").disabled = true;
	document.getElementById("usePowerButton").disabled = true;
	document.getElementById("passTurnButton").disabled = false;
	
	getPlayerBird(ACTION_POWER).then(user => {
		if (user === -1) { // The player skipped the power turn.
			setButtonStates(playerBirdButtons.concat(enemyBirdButtons), false);
			document.getElementById("passTurnButton").disabled = true;
			if (++playerActionsTaken < 2) {
				document.getElementById("useAttackButton").disabled = false;
			} else {
				// End the player's turn.
				currTurn = ENEMY_TURN;
				enemyTakeTurn();
			}
			return;
		}
		console.log(`Your ${playerBirds[user].name} uses its power!`);
	    playerBirds[user].power(user, playerBirds[user].powerArg).then(() => {
			updateBirdDisplays();
			setButtonStates(playerBirdButtons.concat(enemyBirdButtons), false);
			if (++playerActionsTaken < 2) {
				document.getElementById("useAttackButton").disabled = false;
			} else {
				// End the player's turn.
				currTurn = ENEMY_TURN;
				enemyTakeTurn();
			}
		});
	});

}

function enemyUsePower() {
	const eligibleUsers = enemyBirds.filter(bird => !(bird.cawed || bird.powerUsed || bird.power === noPower));
	if (eligibleUsers.length === 0) {
		console.log("The enemy skipped the power turn due to having no possible moves!");
	} else {
		const user = Math.floor(Math.random() * eligibleUsers.length); // nice AI
		console.log(`Enemy ${eligibleUsers[user].name} uses its power!`);
		eligibleUsers[user].power(enemyBirds.indexOf(eligibleUsers[user]), eligibleUsers[user].powerArg);
		updateBirdDisplays();
	}
}

function playerTakeTurn() {
	playerActionsTaken = 0;
	setButtonStates(playerBirdButtons.concat(enemyBirdButtons), false);
	document.getElementById("passTurnButton").disabled = true;
	document.getElementById("whoseTurn").innerHTML = "It's your turn!";
	document.getElementById("useAttackButton").disabled = false;
	document.getElementById("usePowerButton").disabled = false;
	for (const bird of enemyBirds) {
		bird.cawed = false;
	}
}

function enemyTakeTurn() {
	setButtonStates(playerBirdButtons.concat(enemyBirdButtons), false);
	document.getElementById("passTurnButton").disabled = true;
	document.getElementById("useAttackButton").disabled = true;
	document.getElementById("usePowerButton").disabled = true;
	document.getElementById("whoseTurn").innerHTML = "It's your enemy's turn!";
	for (const bird of playerBirds) {
		bird.cawed = false;
	}
	//TODO: Actual enemy AI
	if (Math.random() < 0.5) {
		setTimeout(enemyUseAttack, 1000);
		setTimeout(enemyUsePower, 2000);
	} else {
		setTimeout(enemyUsePower, 1000);
		setTimeout(enemyUseAttack, 2000);
		
	}
	setTimeout(() => {
	    // End the enemy's turn.
	    currTurn = PLAYER_TURN;
	    playerTakeTurn();
	}, 3000);
}
