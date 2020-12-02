"use strict";

class Bird {
	constructor(name, power, damage, startingHealth, powerArg) { // There is no concept of "max health", only starting health, so 1 var suffices here.
		this.name = name;
		this.power = power;
		this.powerArg = powerArg; // powerArg is optional and is used to pass an argument to the power.
		this.damage = damage;
		this.health = startingHealth;
		this.powerUsed = false;
		this.cawed = false;
	}
}

// These bird variables are functions that return a new Bird. This way, they can be called multiple times for duplicate Birds without issues.
/* Summoned by Quack Quack */
const mallard            = () => new Bird("Mallard", noPower, 1, 5);
const woodDuck           = () => new Bird("Wood Duck", noPower, 1, 5);

/* Normal birds */
const robin              = () => new Bird("Robin", healPower, 1, 5, 3); // There are 2 of these
const crow               = () => new Bird("Crow", cawPower, 1, 10);
const meadowlark         = () => new Bird("Meadowlark", healPower, 1, 5, 3); // There are 3 of these
const cardinal           = () => new Bird("Cardinal", attackPower, 2, 10);
const bluejay            = () => new Bird("Blue Jay", noPower, 1, 10);
const oriole             = () => new Bird("Oriole", cheddarCheesePower, 1, 10);
const yellowFinch        = () => new Bird("Yellow Finch", summonBirdPower, 1, 10);
const redWingedBlackbird = () => new Bird("Red-Winged Blackbird", noPower, 1, 10);
const eagle              = () => new Bird("Eagle", stealBirdPower, 1, 10);
const bluebird           = () => new Bird("Bluebird", healPower, 1, 5, 5);
