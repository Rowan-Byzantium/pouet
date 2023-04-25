function dice(x) {
    return parseInt(Math.random() * x);
}

class Character {
    constructor(name, properties) {
        this.name = name;
        this.life = properties.life || 50;
        this.xp = properties.xp || 5;
        this.weapon = properties.weapon || 5;
        this.shield = properties.shield || 5;
    }

    getName() {
        return this.name;
    }

    getAttackScore() {
        return this.xp + dice(this.weapon);
    }

    getDefenseScore() {
        return this.xp + dice(this.shield);
    }

    isAlive() {
        return this.life > 0;
    }

    decreaseLife(health) {
        this.life -= health;
    }

    attack(enemy) {
        const a = this.getAttackScore();
        if (a > enemy.getDefenseScore()) {
            enemy.decreaseLife(a);
            return true;
        }
        return false;
    }
}

class SuperHero extends Character {
    constructor(name, properties) {
        super(name, properties)
    }
    
    getAttackScore() {
        return this.xp + this.weapon;
    }
    
    getDefenseScore() {
        return this.xp + this.shield;
    }

}

class BattleField {
    constructor(charactersList) {
        this.list = charactersList;
    }

    getNbOfCharacters() {
        return this.list.length;
    }

    getWinnerName() {
        return this.list[0];
    }

    getRandomCharacter(notThisOne) {
        const c = this.list[dice(this.getNbOfCharacters())];
        return c === notThisOne ? this.getRandomCharacter(notThisOne) : c;
    }

    buryTheDeads() {
        this.list = this.list.filter(c => c.isAlive());
    }

    start() {
        let attacker, defender;

        while (this.getNbOfCharacters() > 1) {
            attacker = this.getRandomCharacter();
            defender = this.getRandomCharacter(attacker);
            console.log(`${attacker.getName()} is attacking ${defender.getName()}.`);

            const fightResult = attacker.attack(defender);
            console.log(`He has ${fightResult ? "won" : "lost"} the fight.`);

            this.buryTheDeads();

            console.table(this.list);
        }

        console.log(`${this.getWinnerName().getName()} won the battle!`);
    }
}

const battleField = new BattleField([
    new Character('Thor', { xp: 8, weapon: 7, shield: 6 }),
    new Character('Kong', { xp: 8, weapon: 7, shield: 6 }),
    new Character('Aquaman', { xp: 8, weapon: 7, shield: 6 }),
    new SuperHero('Godzilla', { xp: 8, weapon: 7, shield: 6 })
]);

battleField.start();


console.log(battleField);
