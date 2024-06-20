import express from 'express';
import bodyParser from 'body-parser';
import db from './data/database.js';
import { createPhone, validate } from './buisness/PhonesService.js';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse apllication /json
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World !');
});

// CREER CRUD API
// 1- GET /api/v1/phones
// 2- GET /api/v1/phones/1
// 3- POST /api/v1/phones
// 4- PUT /api/v1/phones/1
// 5- DELETE /api/v1/phones/1

/**
 * 1- GETALL RECUPERER toutes les données phones
 * Définir un ENDPOINT /api/v1/phones
 * Traitement : rien
 * Retour : Retourner les données avec un CODE HTTP 200
 * Retour CODE HTTP 400 si error
 */

app.get('/api/v1/phones', (req, res) => {
  res.status(200).send({
    success: true,
    message: 'phones récupéré avec succès !',
    phones: db,
  });
});

/**
 * 2- CREATE Créer un élément
 * Définir un ENDPOINT /api/v1/phones
 * Retourner CODE HTTP 200 si ok
 * Retourner CODE HTTP 400 si error
 * Retour : Retourner les données de la requête
 * Valider les données
 * Insérer en BDD l'élément créé
 */

app.post('/api/v1/phones', (req, res) => {
  console.log('req:', req.body.marque);
  const phone = req.body;
  const valid = validate(phone);

  // Validation des données
  if (!valid.success) {
    // Return code 400 error
    res.status(400).send(valid);
  }

  // Insérer en BDD
  const phoneToSave = createPhone(phone);
  // Retour code 201
  res.status(201).send({
    success: true,
    message: 'phones ajouté avec succès !',
    phones: phoneToSave,
  });
});

app.listen(port, () => {
  console.log(`Serveur demarré sur le port ${port}`);
  console.log(`http://localhost:${port}`);
});
