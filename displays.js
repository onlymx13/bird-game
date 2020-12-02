"use strict";

let playerBirdButtons, enemyBirdButtons;

function updateBirdDisplays() {
	playerBirdButtons = [];
	enemyBirdButtons = [];
	// Update player bird display
	const playerBirdsTable = document.getElementById("playerBirds");
	while (playerBirdsTable.firstChild) {
		playerBirdsTable.removeChild(playerBirdsTable.firstChild);
	}
	for (let i = 0; i < playerBirds.length; i++) {
		const playerBird = playerBirds[i];
		const tr = document.createElement("tr");
		const birdName = document.createElement("td");
		const button = document.createElement("button");
		playerBirdButtons.push(button);
		button.appendChild(document.createTextNode(playerBird.name));
		button.birdNum = i;
		birdName.appendChild(button);
		tr.appendChild(birdName);
		const birdHealth = document.createElement("td");
		birdHealth.appendChild(document.createTextNode(playerBird.health));
		tr.appendChild(birdHealth);
		playerBirdsTable.appendChild(tr);
	}
	// Update enemy bird display
	const enemyBirdsTable = document.getElementById("enemyBirds");
	while (enemyBirdsTable.firstChild) {
		enemyBirdsTable.removeChild(enemyBirdsTable.firstChild);
	}
	for (let i = 0; i < enemyBirds.length; i++) {
		const enemyBird = enemyBirds[i];
		const tr = document.createElement("tr");
		const birdName = document.createElement("td");
		const button = document.createElement("button");
		enemyBirdButtons.push(button);
		button.appendChild(document.createTextNode(enemyBird.name));
		button.birdNum = i;
		birdName.appendChild(button);
		tr.appendChild(birdName);
	    const birdHealth = document.createElement("td");
		birdHealth.appendChild(document.createTextNode(enemyBird.health));
		tr.appendChild(birdHealth);
		enemyBirdsTable.appendChild(tr);
	}
}

function setButtonStates(buttons, enabled) {
	for (const button of buttons) {
		button.disabled = !enabled;
	}
}
