const random = require("random");

export const constrain = (val, min, max) => Math.max(min, Math.min(max, val));

const roll = () => random.float(0, 5);

const smallRoll = () => random.float(0, .5)

const attack = (force, defense) => {
	return Math.max(0, (force * roll()) - (defense * roll()));
};

export const fight = (r1, r2) => {
	const robot1 = {...r1}
	const robot2 = {...r2}
	let winner
	const maxRounds = 25
	for(let i= 0; i < maxRounds; i++) {
		const robot2Damage = attack(robot1.attack, robot2.defense);

		const robot1Damage = attack(robot2.attack, robot1.defense);

		robot1.health -= robot1Damage;
		robot1.health += robot1.healing * smallRoll();
		
		robot1.health = constrain(robot1.health, 0, 100)

		if(robot1.health <= 0) break
		// robot1 can only attack if its still alive

		robot2.health -= robot2Damage;
		robot2.health += robot2.healing * smallRoll();

		robot2.health = constrain(robot2.health, 0, 100)

		if (robot2.health <= 0) break;
	}

	const members =  [robot1, robot2]
	winner = members.reduce((acc, cur) => cur.health > acc.health ? cur : acc)

	return {winner, members};
};
