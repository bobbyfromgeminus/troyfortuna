import { duels } from './duels.js';

export class Character {
    constructor(id, name, species, gender, height, weight, jedi, attributes, forceAbilities, jediSkills, health, stamina, equipment, backstory, duel) {
        this.id = id;                           // id
        this.name = name;                       // név
        this.species = species;                 // faj
        this.gender = gender;                   // nem
        this.height = height;                   // magasság
        this.weight = weight;                   // súly
        this.jedi = jedi;                       // jedi
        this.attributes = attributes;           // attribútumok
        /*
            physicalStrength                        fizikai erő
            intelligence                            intelligencia
            empathy                                 empátia
            endurance                               kitartás
            agility                                 agilitás
        */
        this.forceAbilities = forceAbilities;   // erő képességek
        /*
            forcePush                               erő lökés
            forceHeal                               erő gyógyítás
            forceChoke                              erő fojtás
            forceLightning                          erő villám
            mindTrick                               elme trükk
            erő Nyomja meg
        */
        this.jediSkills = jediSkills;           // jedi képességek
        /*
            lightsaberMastery                       fénykard jártasság            
            stealth                                 lopakodás
            defense                                 védelem
            healing                                 gyógyulás
            illusion                                illúzió
        */
        this.health = health;                   // egészség
        this.stamina = stamina;                 // állóképesség
        this.equipment = equipment;             // felszerelés
        this.backstory = backstory;             // háttértörténet
        this.duel = duel;
    }

    /*
    calculatePhysicalAttack() {
        return this.attributes.physicalStrength + this.attributes.agility + (this.jedi ? this.jediSkills.lightsaberMastery : 0);
    }
    */

    // !! Enemy Bónusz Statok !!
    calculatePhysicalAttack(enemy) {
        let physicalStrength = this.attributes.physicalStrength;

        let myDuels = [];

        if (this.duel.length > 0) {
            this.duel.forEach( item => {
                let duelX = duels.find( element => element.id == item);
                if (duelX.id) myDuels.push(duelX);
            })
            const duelEnemy = myDuels.find( duel => duel.enemyId == enemy.id);
            physicalStrength *= duelEnemy.multiplier;
        }

        return physicalStrength + this.attributes.agility + (this.jedi ? this.jediSkills.lightsaberMastery : 0);
    }

    calculatePhysicalDefense() {
        return this.attributes.endurance + this.attributes.agility;
    }
    
    /*
    calculateMentalAttack() {
        return this.attributes.intelligence + this.forceAbilities.forcePush; // pl. forcePush képességet használ
    }
    */
    calculateMentalAttack(enemy) {
        let forceChoke = this.forceAbilities.forceChoke;



        if (this.duel.find( duel => duel.enemyName == enemy.name) == true) forceChoke *= 2;

        return this.attributes.intelligence + this.forceAbilities.forcePush + forceChoke;
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