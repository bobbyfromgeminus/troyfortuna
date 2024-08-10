import { Character } from './class_character.js';
import { characters } from './data_characters.js';


export let generated_chars = [];

characters.forEach( char => {
    const newchar = new Character(char.id, char.name, char.species, char.gender, char.height, char.weight, char.jedi, 
        {
            physicalStrength: char.attributes.physicalStrength,
            intelligence: char.attributes.intelligence,
            empathy: char.attributes.empathy,
            endurance: char.attributes.endurance,
            agility: char.attributes.agility
        },
        {
            forcePush: char.forceAbilities.forcePush,
            forceHeal: char.forceAbilities.forceHeal,
            forceChoke: char.forceAbilities.forceChoke,
            forceLightning: char.forceAbilities.forceLightning,
            mindTrick: char.forceAbilities.mindTrick
        },
        {
            lightsaberMastery: char.jediSkills.lightsaberMastery,
            stealth: char.jediSkills.stealth,
            defense: char.jediSkills.defense,
            healing: char.jediSkills.healing,
            illusion: char.jediSkills.illusion
        },
        char.health, char.stamina, char.equipment, 
        char.backstory, char.duel
    );
    generated_chars.push(newchar);
});