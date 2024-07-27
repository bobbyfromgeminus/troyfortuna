import { Character } from './modules/character.js';
import * as char from './modules/characters.js';
import { battle } from './modules/battle.js';

const damageDivider = 4;
const gameField = document.querySelector('main');


const battleResult = battle(char.anakinskywalker, char.obiwankenobi, damageDivider, true);

gameField.innerHTML = `<pre>${battleResult}</pre>`;