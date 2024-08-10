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
        const productData = { characters: rows };
        const prettyJson = JSON.stringify(productData, null, 2);
        res.type('json').send(prettyJson);
        const currentDate = new Date().toLocaleString();
        console.log(`[API ENDPOINT] ${currentDate}: GET all characters (Get All)`);
      }
    });
  });


  // GET ONE (Read) --------------------------------------
  app.get('/api/characters/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    db.get('SELECT * FROM characters WHERE id = ?', [productId], (error, row) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      } else if (row) {
        const prettyJson = JSON.stringify({ message: 'Get one Product successfully', product: row }, null, 2);
        res.type('json').status(201).send(prettyJson);
        const currentDate = new Date().toLocaleString();
        console.log(`[API ENDPOINT] ${currentDate}: GET one Product (GET One)`);
      } else {
        res.status(404).json({ error: 'Product not found' });
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

    // Az új termék hozzáadása az adatbázishoz
    const sql = 'INSERT INTO characters (name, name2, species, gender, height, weight, jedi, attributes_physicalStrength, attributes_intelligence, attributes_empathy, attributes_endurance, attributes_agility, forceAbilities_forcePush, forceAbilities_forceHeal, forceAbilities_forceChoke, forceAbilities_forceLightning, forceAbilities_mindTrick, jediSkills_lightsaberMastery, jediSkills_stealth, jediSkills_defense, jediSkills_healing, jediSkills_illusion, health, stamina, equipment, backstory, duel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, name2, species, gender, height, weight, jedi, attributes_physicalStrength, attributes_intelligence, attributes_empathy, attributes_endurance, attributes_agility, forceAbilities_forcePush, forceAbilities_forceHeal, forceAbilities_forceChoke, forceAbilities_forceLightning, forceAbilities_mindTrick, jediSkills_lightsaberMastery, jediSkills_stealth, jediSkills_defense, jediSkills_healing, jediSkills_illusion, health, stamina, equipment, backstory, duel];

    db.run(sql, values, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Az új termék ID-je a beszúrás után
      const newCharacterId = this.lastID;

      // Az új termék lekérése a beszúrás után
      db.get('SELECT * FROM characters WHERE id = ?', [newCharacterId], (err, newRow) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Válasz küldése az új termékkel
        res.status(201).json({ message: 'Character created successfully', product: newRow });
        const currentDate = new Date().toLocaleString();
        console.log(`[API ENDPOINT] ${currentDate}: CREATE new Character (POST)`);
      });
    });
  });


  // PUT (Update) ----------------------------------------
  app.put('/api/characters/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    
    // Ellenőrizzük, hogy a megadott ID érvényes
    if (isNaN(productId) || productId <= 0) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    
    // Ellenőrizzük, hogy érkezett-e adat a kérési testtel
    if (!req.body) {
      return res.status(400).json({ error: 'No data provided' });
    }

    // SQL parancs a termék frissítésére
    const sql = `
      UPDATE characters
      SET name = $name, price = $price, description = $description, available = $available, origin = $origin, img = $img
      WHERE id = $productId
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
      $productId: productId
    }, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Ellenőrizzük, hogy valóban módosítottuk-e egy rekordot
        if (this.changes > 0) {
          res.status(200).json({ message: 'Product updated successfully', product: req.body });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      }
    });
  });


  // PATCH (Modify) --------------------------------------
  app.patch('/api/characters/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);

    // Ellenőrizzük, hogy a megadott ID érvényes
    if (isNaN(productId) || productId <= 0) {
      return res.status(400).json({ error: 'Invalid product ID' });
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

    // SQL parancs a termék részleges frissítésére
    const sql = `
    UPDATE characters
    SET ${Object.keys(updatedFields).map(key => `${key} = ?`).join(', ')}
    WHERE id = ?
    `;

    // Az értékeket egy tömbben adjuk át
    const params = [...Object.values(updatedFields), productId];


    // Futtatjuk a részleges frissítő SQL parancsot
    db.run(sql, params, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Ellenőrizzük, hogy valóban módosítottuk-e egy rekordot
        if (this.changes > 0) {
          res.status(200).json({ message: 'Product modified successfully', product: { id: productId, ...updatedFields } });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      }
    });
  });


  // DELETE (Delete) -------------------------------------
  app.delete('/api/characters/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    
    // Ellenőrizzük, hogy a megadott ID érvényes
    if (isNaN(productId) || productId <= 0) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // SQL parancs a termék törlésére
    const sql = `
      DELETE FROM characters
      WHERE id = $productId
    `;

    // Futtatjuk a törlő SQL parancsot
    db.run(sql, { $productId: productId }, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        // Ellenőrizzük, hogy valóban töröltünk-e egy rekordot
        if (this.changes > 0) {
          res.status(200).json({ message: 'Product deleted successfully' });
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      }
    });
  });



// ROUNTING °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°

  // Serve static files from FRONTEND directory
  app.use(express.static(path.join(__dirname, '../frontend')));

  // Root
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving Homepage`);
  });

  // characters
  app.get('/characters', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/characters.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving characters page`);
  });

  // Cart
  app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/cart.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving Cart page`);
  });

  // Checkout
  app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/checkout.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving Checkout page`);
  });

  // Editor
  app.get('/editor', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/editor.html'));
    const currentDate = new Date().toLocaleString();
    console.log(`[SITE ROUTING] ${currentDate}: Serving Editor page`);
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