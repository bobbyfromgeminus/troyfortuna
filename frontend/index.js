import { generated_chars } from './modules/build_characters.js';
import { battle } from './modules/battle.js';

const damageDivider = 4;
const gameField = document.querySelector('main');
const btnBattle = document.getElementById('btn-battle');

let battleResult = '';
let round = 0;

btnBattle.addEventListener('click', ()=>{
    round++;
    battleResult = battle(round, generated_chars[0], generated_chars[2], damageDivider, true);
    gameField.innerHTML = `<pre>${battleResult}</pre>`;
})