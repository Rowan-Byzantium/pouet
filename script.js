let characters = [
    {
        name: "Godzilla",
        life: 50,
        xp: 10,
        weapon: 8,
        shield: 5
    },
    {
        name: "Kong",
        life: 50,
        xp: 10,
        weapon: 8,
        shield: 5
    },
    {
        name: "Thor",
        life: 50,
        xp: 9,
        weapon: 8,
        shield: 5
    },
    {
        name: "Aquaman",
        life: 50,
        xp: 8,
        weapon: 8,
        shield: 5
    }
];


// FUNCTIONS

// Rolls a dice between 0 and x
function dice(x) {
    return parseInt(Math.random() * x);
}

// Gives a random attack score for the given character
function getAttackScore(c) {
    return c.xp + dice(c.weapon);
}

// Gives a random defense score for the given character
function getDefenseScore(c) {
    return c.xp + dice(c.shield);
}

// Is the given character still alive ?
function isAlive(c) {
    return c.life > 0;
}

// Returns the number of Characters
function getNbOfCharacters() {
    return characters.length;
}

// Returns the last character's name
function getWinnerName() {
    return characters[0].name;
}

// Returns a random character from the list
// if a character is given in args, it will avoid this one
function getRandomCharacter(notThisOne) {
    const c = characters[dice(characters.length)];
    return c === notThisOne ? getRandomCharacter(notThisOne) : c;
}

// Decrease character health
function decreaseLife(c, health) {
    c.life -= health;
}

// A fight between two characters
function fight(attacker, defender) {
    const a = getAttackScore(attacker);
    const d = getDefenseScore(defender);
    if (a > d) {
        decreaseLife(defender, a);
        return true;
    }
    return false;
}

// Removes the dead ones form the characters list 
function buryTheDeads() {
    characters = characters.filter(isAlive);
}

// CODE

let attacker, defender;

const timer = setInterval(
    function () {
        attacker = getRandomCharacter();
        defender = getRandomCharacter(attacker);
        console.log(`${attacker.name} is attacking ${defender.name}.`);

        const fightResult = fight(attacker, defender);
        console.log(`He has ${fightResult ? "won" : "lost"} the fight.`);

        buryTheDeads();

        console.table(characters);

        if (getNbOfCharacters() <= 1) {
            clearInterval(timer);
            console.log(`${getWinnerName()} won the battle!`);
        }
    }, 1000
);


