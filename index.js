import { generated_chars } from './modules/characters.js';
import { battle } from './modules/battle.js';

const damageDivider = 4;
const gameField = document.querySelector('main');

const battleResult = battle(generated_chars[1], generated_chars[2], damageDivider, true);

gameField.innerHTML = `<pre>${battleResult}</pre>`;