let output = ''

function calculateDamage(attacker, defender, isPhysical, damageDivider) {
    let attackValue, defenseValue;

    if (isPhysical) {
        attackValue = attacker.calculatePhysicalAttack(defender);
        defenseValue = defender.calculatePhysicalDefense();
    } else {
        attackValue = attacker.calculateMentalAttack(defender);
        defenseValue = defender.calculateMentalDefense();
    }

    let damage = (attackValue - defenseValue) / damageDivider + Math.floor(Math.random() * 10 - 5); // Random variáció: -5 és +5 között
    return damage > 0 ? damage : 0; // Negatív sebzés nem lehetséges
}


function battleTurn(attacker, defender, isPhysical, damageDivider) {
    const damage = calculateDamage(attacker, defender, isPhysical, damageDivider);
    defender.takeDamage(damage);
    output += `${attacker.name} dealt <b>${damage.toFixed(2)}</b> damage to <b>${defender.name}</b>. <b>${defender.name}</b> has <b>${defender.health.toFixed(2)}</b> health left.\n`;
    if (defender.isDefeated()) {
        output += `\n<span>${defender.name}</span> is defeated!\n`;
    }
}

export function battle(attacker, defender, damageDivider, isPhysical) {
    let round = 1;
    // mindtrick bevezetése
    
    while (!attacker.isDefeated() && !defender.isDefeated()) {
        output += `\n<h2>Round ${round}:</h2>`;
        battleTurn(attacker, defender, isPhysical, damageDivider);
        if (defender.isDefeated()) break;
        battleTurn(defender, attacker, isPhysical, damageDivider);
        round++;
    }
    if (attacker.isDefeated()) {
        output += `<i>${defender.name}</i> wins!\n`;
    } else if (defender.isDefeated()) {
        output += `<i>${attacker.name}</i> wins!\n`;
    }
    return output;
}