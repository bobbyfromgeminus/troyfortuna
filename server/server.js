import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import sqlite3 from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.join(__dirname, 'data/database_sqlite.db');
// Az adatbázis kapcsolat inicializálása
const db = new sqlite3.Database(dbPath);

// Tábla létrehozása, ha még nem létezik
db.run(`
  CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY,
    name TEXT,
    name2 TEXT,
    species TEXT,
    gender TEXT,
    height INTEGER,
    weight INTEGER,
    jedi BOOLEAN,
    attributes_physicalStrength INTEGER,
    attributes_intelligence INTEGER,
    attributes_empathy INTEGER,
    attributes_endurance INTEGER,
    attributes_agility INTEGER,
    forceAbilities_forcePush INTEGER,
    forceAbilities_forceHeal INTEGER,
    forceAbilities_forceChoke INTEGER,
    forceAbilities_forceLightning INTEGER,
    forceAbilities_mindTrick INTEGER,
    jediSkills_lightsaberMastery INTEGER,
    jediSkills_stealth INTEGER,
    jediSkills_defense INTEGER,
    jediSkills_healing INTEGER,
    jediSkills_illusion INTEGER,
    health INTEGER,
    stamina INTEGER,
    equipment TEXT,
    backstory TEXT,
    duel TEXT
  )
`);

const app = express();

app.use(express.json());

// characters API °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

  // GET ALL (Read) --------------------------------------
  app.get('/api/characters', (req, res) => {
    db.all('SELECT * FROM characters', (error, rows) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error'); 
      } else {
        const characterData = { characters: rows };
        const prettyJson = JSON.stringify(characterData, null, 2);
        res.type('json').send(prettyJson);
        const currentDate = new Date().toLocaleString();
        console.log(`[API ENDPOINT] ${currentDate}: GET all characters (Get All)`);
      }
    });
  });


  // GET ONE (Read) --------------------------------------
  app.get('/api/characters/:id', (req, res) => {
    const characterId = parseInt(req.params.id, 10);
    db.get('SELECT * FROM characters WHERE id = ?', [characterId], (error, row) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else if (row) {
        const prettyJson = JSON.stringify({ message: 'Get one character successfully', character: row }, null, 2);
        res.type('json').status(201).send(prettyJson);
        const currentDate = new Date().toLocaleString();
        console.log(`[API ENDPOINT] ${currentDate}: GET one character (GET One)`);
      } else {
        res.status(404).json({ error: 'character not found' });
      }
    });
  });


  // POST (Create) ---------------------------------------
  app.post('/api/characters', async (req, res) => {
    // Ellenőrizzük, hogy érkezett-e adat a kérési testtel
    if (!req.body) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // Ellenőrizzük, hogy a szükséges adatok elérhetőek-e
    const { name, name2, species, gender, height, weight, jedi, attributes_physicalStrength, attributes_intelligence, attributes_empathy, attributes_endurance, attributes_agility, forceAbilities_forcePush, forceAbilities_forceHeal, forceAbilities_forceChoke, forceAbilities_forceLightning, forceAbilities_mindTrick, jediSkills_lightsaberMastery, jediSkills_stealth, jediSkills_defense, jediSkills_healing, jediSkills_illusion, health, stamina, equipment, backstory, duel } = req.body;
    if (!name || !name2 || !species || !gender || !height || !weight || !jedi || !attributes_physicalStrength || !attributes_intelligence || !attributes_empathy || !attributes_endurance || !attributes_agility || !forceAbilities_forcePush || !forceAbilities_forceHeal || !forceAbilities_forceChoke || !forceAbilities_forceLightning || !forceAbilities_mindTrick || !jediSkills_lightsaberMastery || !jediSkills_stealth || !jediSkills_defense || !jediSkills_healing || !jediSkills_illusion || !health || !stamina || !equipment || !backstory || !duel) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    // Az új karakter hozzáadása az adatbázishoz
    const sql = 'INSERT INTO characters (name, name2, species, gender, height, weight, jedi, attributes_physicalStrength, attributes_intelligence, attributes_empathy, attributes_endurance, attributes_agility, forceAbilities_forcePush, forceAbilities_forceHeal, forceAbilities_forceChoke, forceAbilities_forceLightning, forceAbilities_mindTrick, jediSkills_lightsaberMastery, jediSkills_stealth, jediSkills_defense, jediSkills_healing, jediSkills_illusion, health, stamina, equipment, backstory, duel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, name2, species, gender, height, weight, jedi, attributes_physicalStrength, attributes_intelligence, attributes_empathy, attributes_endurance, attributes_agility, forceAbilities_forcePush, forceAbilities_forceHeal, forceAbilities_forceChoke, forceAbilities_forceLightning, forceAbilities_mindTrick, jediSkills_lightsaberMastery, jediSkills_stealth, jediSkills_defense, jediSkills_healing, jediSkills_illusion, health, stamina, equipment, backstory, duel];

    db.run(sql, values, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Az új karakter ID-je a beszúrás után
      const newCharacterId = this.lastID;

      // Az új karakter lekérése a beszúrás után
      db.get('SELECT * FROM characters WHERE id = ?', [newCharacterId], (err, newRow) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Válasz küldése az új karakterrel
        res.status(201).json({ message: 'Character created successfully', character: newRow });
        const currentDate = new Date().toLocaleString();
        console.log(`[API ENDPOINT] ${currentDate}: CREATE new Character (POST)`);
      });
    });
  });


  // PUT (Update) ----------------------------------------
  app.put('/api/characters/:id', (req, res) => {
    const characterId = parseInt(req.params.id, 10);
    
    // Ellenőrizzük, hogy a megadott ID érvényes
    if (isNaN(characterId) || characterId <= 0) {
      return res.status(400).json({ error: 'Invalid character ID' });
    }
    
    // Ellenőrizzük, hogy érkezett-e adat a kérés-törzzsel
    if (!req.body) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // SQL parancs a karakter frissítésére
    const sql = `
      UPDATE characters
      SET 
      name = $name, 
      name2 = $name2, 
      species = $,species 
      gender = $gender, 
      height = $height, 
      weight = $weight, 
      jedi = $jedi, 
      attributes_physicalStrength = $attributes_physicalStrength, 
      attributes_intelligence = $attributes_intelligence, 
      attributes_empathy = $attributes_empathy, 
      attributes_endurance = $attributes_endurance, 
      attributes_agility = $attributes_agility, 
      forceAbilities_forcePush = $forceAbilities_forcePush, 
      forceAbilities_forceHeal = $forceAbilities_forceHeal, 
      forceAbilities_forceChoke = $forceAbilities_forceChoke, 
      forceAbilities_forceLightning = $forceAbilities_forceLightning, 
      forceAbilities_mindTrick = $forceAbilities_mindTrick, 
      jediSkills_lightsaberMastery = $jediSkills_lightsaberMastery, 
      jediSkills_stealth = $jediSkills_stealth, 
      jediSkills_defense = $jediSkills_defense, 
      jediSkills_healing = $jediSkills_healing, 
      jediSkills_illusion = $jediSkills_illusion, 
      health = $health, 
      stamina = $stamina, 
      equipment = $equipment, 
      backstory = $backstory, 
      duel = $duel 
      WHERE id = $characterId
    `;

    const { name, price, description, available, origin, img } = req.body;

    // Futtatjuk a frissítő SQL parancsot
    db.run(sql, {
      $name: name,
      $price: price,
      $description: description,
      $available: available,
      $origin: origin,
      $img: img,
      $characterId: characterId
    }, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Ellenőrizzük, hogy valóban módosítottuk-e egy rekordot
        if (this.changes > 0) {
          res.status(200).json({ message: 'character updated successfully', character: req.body });
        } else {
          res.status(404).json({ error: 'character not found' });
        }
      }
    });
  });


  // PATCH (Modify) --------------------------------------
  app.patch('/api/characters/:id', (req, res) => {
    const characterId = parseInt(req.params.id, 10);

    // Ellenőrizzük, hogy a megadott ID érvényes
    if (isNaN(characterId) || characterId <= 0) {
      return res.status(400).json({ error: 'Invalid character ID' });
    }

    // Ellenőrizzük, hogy érkezett-e adat a kérési testtel
    if (!req.body) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // Készítünk egy objektumot a részleges frissítendő adatokkal
    const updatedFields = req.body;

    // Ellenőrizzük, hogy valamely adat érkezett-e a részleges frissítéshez
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: 'No data provided for partial update' });
    }

    // SQL parancs a karakter részleges frissítésére
    const sql = `
    UPDATE characters
    SET ${Object.keys(updatedFields).map(key => `${key} = ?`).join(', ')}
    WHERE id = ?
    `;

    // Az értékeket egy tömbben adjuk át
    const params = [...Object.values(updatedFields), characterId];


    // Futtatjuk a részleges frissítő SQL parancsot
    db.run(sql, params, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Ellenőrizzük, hogy valóban módosítottuk-e egy rekordot
        if (this.changes > 0) {
          res.status(200).json({ message: 'character modified successfully', character: { id: characterId, ...updatedFields } });
        } else {
          res.status(404).json({ error: 'character not found' });
        }
      }
    });
  });


  // DELETE (Delete) -------------------------------------
  app.delete('/api/characters/:id', (req, res) => {
    const characterId = parseInt(req.params.id, 10);
    
    // Ellenőrizzük, hogy a megadott ID érvényes
    if (isNaN(characterId) || characterId <= 0) {
      return res.status(400).json({ error: 'Invalid character ID' });
    }

    // SQL parancs a karakter törlésére
    const sql = `
      DELETE FROM characters
      WHERE id = $characterId
    `;

    // Futtatjuk a törlő SQL parancsot
    db.run(sql, { $characterId: characterId }, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Ellenőrizzük, hogy valóban töröltünk-e egy rekordot
        if (this.changes > 0) {
          res.status(200).json({ message: 'character deleted successfully' });
        } else {
          res.status(404).json({ error: 'character not found' });
        }
      }
    });
  });



// ROUNTING °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

  // Serve static files from FRONTEND directory
  app.use(express.static(path.join(__dirname, '../client')));

  // Root
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving Homepage`);
  });

  // characters
  app.get('/characters', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/characters.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving characters page`);
  });

  // Editor
  app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/editor/index.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving Editor front page`);
  });

  // Editor - Character list
  app.get('/editor/characters', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/editor/list_characters.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving Character list page`);
  });

  // Editor - Character creator
  app.get('/editor/create_new_character', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/editor/create_character.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving Character creator page`);
  });


// SERVER STARTING ----------------------------------------------

  const endPoints = {
    "Read all Characters": {
      method: 'GET',
      endpoint: '/api/characters',
    },
    "Read one Character": {
      method: 'GET',
      endpoint: '/api/characters/:id',
    },
    "Create new Character": {
      method: 'POST',
      endpoint: '/api/characters',
    },
    "Update Character": {
      method: 'PUT',
      endpoint: '/api/characters/:id',
    },
    "Modify Character": {
      method: 'PATCH',
      endpoint: '/api/characters/:id',
    },
    "Delete Character": {
      method: 'DELETE',
      endpoint: '/api/characters/:id',
    }, 
    
  };


  // A szerver indítása
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.table(endPoints);
    console.log(`Server is running on port ${PORT}`);
  });