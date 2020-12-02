"use strict";

const ACTION_ATTACK = 0;
const ACTION_POWER = 1;
const ACTION_POWER_TARGET = 2;

function getPlayerBird(action) {
	setButtonStates(playerBirdButtons, true);
	switch(action) {
		case ACTION_ATTACK:
			document.getElementById("passTurnButton").disabled = false; // You may pass your attack turn.
			for (const button of playerBirdButtons) {
				if (playerBirds[button.birdNum].cawed) {
					button.disabled = true;
				}
			}
			break;
		case ACTION_POWER:
			document.getElementById("passTurnButton").disabled = false; // You may pass your power turn.
			for (const button of playerBirdButtons) {
				if (playerBirds[button.birdNum].cawed || playerBirds[button.birdNum].powerUsed || playerBirds[button.birdNum].power === noPower) {
					button.disabled = true;
				}
			}
			break;
		case ACTION_POWER_TARGET:
			// Nothing yet, since any bird should be targetable with a power.
			break;
	}

	setButtonStates(enemyBirdButtons, false);
	document.getElementById("useAttackButton").disabled = true;
	document.getElementById("usePowerButton").disabled = true;
    return new Promise((resolve, reject) => {
		document.getElementById("passTurnButton").addEventListener("click", function listener(e) {
			this.removeEventListener("click", listener);
			setButtonStates(playerBirdButtons, false);
			this.disabled = true;
			resolve(-1);
		});
		for (const button of playerBirdButtons) {
			button.addEventListener("click", function listener(e) {
				button.removeEventListener("click", listener);
				setButtonStates(playerBirdButtons, false);
				document.getElementById("passTurnButton").disabled = true;
				resolve(button.birdNum);
			});
		}
	});
}

function getEnemyBird(setButtons = true) {
	if (setButtons) {
		setButtonStates(enemyBirdButtons, true);
	}
    return new Promise((resolve, reject) => {
		for (const button of enemyBirdButtons) {
			button.addEventListener("click", function listener(e) {
				button.removeEventListener("click", listener);
				if (setButtons) {
					setButtonStates(enemyBirdButtons, false);
				}
				resolve(button.birdNum);
			});
		}
	});
}
