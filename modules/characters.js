import { Character } from './character.js';

export const anakinskywalker = new Character(1, 'Anakin Skywalker', 'Human', 'Male', 188, 84, true,
    { physicalStrength: 90, intelligence: 85, empathy: 70, endurance: 90, agility: 85 }, 
    { forcePush: 90, forceHeal: 60, forceChoke: 80, forceLightning: 0, mindTrick: 50 }, 
    { lightsaberMastery: 95, stealth: 70, defense: 90, healing: 60, illusion: 50 }, 
    100, 100, ['Lightsaber', 'Jedi Robes'], 
    'Anakin Skywalker, the Chosen One, was a Jedi Knight who became the Sith Lord Darth Vader.',
    [1, 3, 4]
);

export const kael = new Character(2, 'Kael Varn', 'Human', 'Male', 185, 80, true, 
    { physicalStrength: 80, intelligence: 70, empathy: 70, endurance: 75, agility: 85 },
    { forcePush: 70, forceHeal: 0, forceChoke: 0, forceLightning: 0, mindTrick: 50 },
    { lightsaberMastery: 90, stealth: 50, defense: 80, healing: 0, illusion: 40 },
    100, 100, ['Lightsaber', 'Jedi Robes'], 
    'A skilled Jedi warrior, Kael Varn has dedicated his life to mastering the lightsaber and defending the galaxy from the dark side.'
);

export const stormtrooper = new Character(3, 'Stormtrooper', 'Human', 'Male', 180, 75, false, 
    { physicalStrength: 50, intelligence: 60, empathy: 60, endurance: 60, agility: 50 },
    { forcePush: 0, forceHeal: 0, forceChoke: 0, forceLightning: 0, mindTrick: 0 },
    { lightsaberMastery: 0, stealth: 0, defense: 0, healing: 0, illusion: 0 },
    80, 80, ['Blaster Rifle', 'Stormtrooper Armor'], 
    'A loyal soldier of the Galactic Empire, the stormtrooper is well-trained but lacks the Force abilities of a Jedi.'
);

export const kylekatarn = new Character(4, 'Kyle Katarn', 'Human', 'Male', 180, 80, true, 
    { physicalStrength: 85, intelligence: 75, empathy: 60, endurance: 80, agility: 70 }, 
    { forcePush: 75, forceHeal: 50, forceChoke: 0, forceLightning: 0, mindTrick: 60 }, 
    { lightsaberMastery: 85, stealth: 70, defense: 80, healing: 50, illusion: 40 }, 
    100, 100, ['Lightsaber', 'Blaster Pistol'], 
    'Kyle Katarn is a former stormtrooper who became a Jedi Knight and fought against the dark side.',
    []
);

export const ezrabridger = new Character(5, 'Ezra Bridger', 'Human', 'Male', 170, 65, true,
    { physicalStrength: 70, intelligence: 80, empathy: 80, endurance: 75, agility: 85 }, 
    { forcePush: 80, forceHeal: 40, forceChoke: 0, forceLightning: 0, mindTrick: 70 }, 
    { lightsaberMastery: 75, stealth: 85, defense: 75, healing: 40, illusion: 60 }, 
    100, 100, ['Lightsaber', 'Energy Slingshot'], 
    'Ezra Bridger, an orphan from Lothal, became a Jedi Padawan and fought alongside the Rebel Alliance.',
    []
);

export const lukeskywalker = new Character(6, 'Luke Skywalker', 'Human', 'Male', 172, 73, true,
    { physicalStrength: 80, intelligence: 90, empathy: 85, endurance: 85, agility: 80 }, 
    { forcePush: 85, forceHeal: 70, forceChoke: 0, forceLightning: 0, mindTrick: 80 }, 
    { lightsaberMastery: 90, stealth: 75, defense: 85, healing: 70, illusion: 65 }, 
    100, 100, ['Lightsaber', 'Blaster Pistol'], 
    'Luke Skywalker, the son of Anakin Skywalker, became a Jedi Master and helped to defeat the Empire.',
    []
);

export const plokoon = new Character(7, 'Plo Koon', 'Kel Dor', 'Male', 188, 80, true,
    { physicalStrength: 85, intelligence: 80, empathy: 75, endurance: 80, agility: 75 }, 
    { forcePush: 80, forceHeal: 65, forceChoke: 0, forceLightning: 0, mindTrick: 60 }, 
    { lightsaberMastery: 85, stealth: 70, defense: 80, healing: 65, illusion: 50 }, 
    100, 100, ['Lightsaber', 'Jedi Robes'], 
    'Plo Koon was a Kel Dor Jedi Master who served on the Jedi High Council during the Clone Wars.',
    []
);

export const obiwankenobi = new Character(8, 'Obi-Wan Kenobi', 'Human', 'Male', 182, 81, true,
    { physicalStrength: 80, intelligence: 90, empathy: 85, endurance: 85, agility: 80 }, 
    { forcePush: 85, forceHeal: 70, forceChoke: 0, forceLightning: 0, mindTrick: 80 }, 
    { lightsaberMastery: 95, stealth: 75, defense: 90, healing: 70, illusion: 60 }, 
    100, 100, ['Lightsaber', 'Jedi Robes'], 
    'Obi-Wan Kenobi was a Jedi Master who trained Anakin Skywalker and later his son, Luke Skywalker. He played a key role in the Clone Wars and the eventual defeat of the Sith.',
    []
);

export const darthvader = new Character(9, 'Darth Vader', 'Human', 'Male', 202, 120, true,
    { physicalStrength: 95, intelligence: 85, empathy: 50, endurance: 95, agility: 70 }, 
    { forcePush: 90, forceHeal: 0, forceChoke: 90, forceLightning: 0, mindTrick: 75 }, 
    { lightsaberMastery: 95, stealth: 65, defense: 90, healing: 0, illusion: 50 }, 
    100, 100, ['Lightsaber', 'Sith Lord Armor'],
    'Darth Vader was once a Jedi Knight turned Sith Lord. He played a key role in the Galactic Empire\'s rise to power and the destruction of the Jedi Order.',
    [1]
);

export const dooku = new Character(10, 'Dooku', 'Human', 'Male', 202, 84, true,
    { physicalStrength: 90, intelligence: 85, empathy: 70, endurance: 90, agility: 85 }, 
    { forcePush: 90, forceHeal: 60, forceChoke: 80, forceLightning: 0, mindTrick: 50 }, 
    { lightsaberMastery: 95, stealth: 70, defense: 90, healing: 60, illusion: 50 }, 
    100, 100, ['Lightsaber', 'Sith Lord Armor'],
    'Darth Vader was once a Jedi Knight turned Sith Lord. He played a key role in the Galactic Empire\'s rise to power and the destruction of the Jedi Order.',
    []
);

export const ventress = new Character(11, 'Asajj Ventress', 'Nightsister', 'Female', 202, 84, true,
    { physicalStrength: 90, intelligence: 85, empathy: 70, endurance: 90, agility: 85 }, 
    { forcePush: 90, forceHeal: 60, forceChoke: 80, forceLightning: 0, mindTrick: 50 }, 
    { lightsaberMastery: 95, stealth: 70, defense: 90, healing: 60, illusion: 50 }, 
    100, 100, ['Lightsaber', 'Sith Lord Armor'],
    'Darth Vader was once a Jedi Knight turned Sith Lord. He played a key role in the Galactic Empire\'s rise to power and the destruction of the Jedi Order.',
    [5]
);