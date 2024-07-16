class Character {
    constructor(name, species, gender, height, weight, jedi, attributes, forceAbilities, jediSkills, health, stamina, equipment, backstory) {
        this.name = name;
        this.species = species;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.jedi = jedi;
        this.attributes = attributes;
        this.forceAbilities = forceAbilities;
        this.jediSkills = jediSkills;
        this.health = health;
        this.stamina = stamina;
        this.equipment = equipment;
        this.backstory = backstory;
    }

    calculatePhysicalAttack() {
        return this.attributes.physicalStrength + this.attributes.agility + (this.jedi ? this.jediSkills.lightsaberMastery : 0);
    }

    calculatePhysicalDefense() {
        return this.attributes.endurance + this.attributes.agility;
    }

    calculateMentalAttack() {
        return this.attributes.intelligence + this.forceAbilities.forcePush; // pl. forcePush képességet használ
    }

    calculateMentalDefense() {
        return this.attributes.intelligence + this.attributes.empathy;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        }
    }

    isDefeated() {
        return this.health <= 0;
    }
}

function calculateDamage(attacker, defender, isPhysical) {
    let attackValue, defenseValue;

    if (isPhysical) {
        attackValue = attacker.calculatePhysicalAttack();
        defenseValue = defender.calculatePhysicalDefense();
    } else {
        attackValue = attacker.calculateMentalAttack();
        defenseValue = defender.calculateMentalDefense();
    }

    let damage = attackValue - defenseValue + Math.floor(Math.random() * 10 - 5); // Random variáció: -5 és +5 között
    return damage > 0 ? damage : 0; // Negatív sebzés nem lehetséges
}

function battleTurn(attacker, defender, isPhysical) {
    const damage = calculateDamage(attacker, defender, isPhysical);
    defender.takeDamage(damage);
    console.log(`${attacker.name} dealt ${damage} damage to ${defender.name}`);
    if (defender.isDefeated()) {
        console.log(`${defender.name} is defeated!`);
    }
}

// Példa karakterek
const kael = new Character('Kael Varn', 'Human', 'Male', 185, 80, true, 
    { physicalStrength: 80, intelligence: 70, empathy: 60, endurance: 75, agility: 85 },
    { forcePush: 60, forceHeal: 0, forceChoke: 0, forceLightning: 0, mindTrick: 50 },
    { lightsaberMastery: 90, stealth: 50, defense: 80, healing: 0, illusion: 40 },
    100, 100, ['Lightsaber', 'Jedi Robes'], 
    'A skilled Jedi warrior, Kael Varn has dedicated his life to mastering the lightsaber and defending the galaxy from the dark side.'
);

const stormtrooper = new Character('Stormtrooper', 'Human', 'Male', 180, 75, false, 
    { physicalStrength: 50, intelligence: 40, empathy: 0, endurance: 60, agility: 50 },
    { forcePush: 0, forceHeal: 0, forceChoke: 0, forceLightning: 0, mindTrick: 0 },
    { lightsaberMastery: 0, stealth: 0, defense: 70, healing: 0, illusion: 0 },
    80, 80, ['Blaster Rifle', 'Stormtrooper Armor'], 
    'A loyal soldier of the Galactic Empire, the stormtrooper is well-trained but lacks the Force abilities of a Jedi.'
);

// Példa csata
battleTurn(kael, stormtrooper, true); // Fizikai támadás
battleTurn(kael, stormtrooper, false); // Mentális támadás
