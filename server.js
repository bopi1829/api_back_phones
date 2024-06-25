import express from 'express';
import bodyParser from 'body-parser';
import { findPhoneById, deletePhoneById, updatePhoneById, createPhone, validate } from './buisness/PhonesService.js';
import db from './data/database.js'

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse apllication /json
app.use(bodyParser.json());

// CREER CRUD API
// 1- GET /api/v1/phones
// 2- GET /api/v1/phones/1
// 3- POST /api/v1/phones
// 4- DELETE /api/v1/phones/1
// 5- PUT /api/v1/phones/1

/**
 * 1- GET ALL RECUPERER toutes les données phones
 * Définir un ENDPOINT /api/v1/phones
 * Traitement : rien
 * Retour : Retourner les données avec un CODE HTTP 200
 * Retour CODE HTTP 400 si error
 */

// GET ALL
app.get('/api/v1/phones', (req, res) => {
    res.status(200).send({
      success: true,
      message: 'phones récupéré avec succès !',
      phones: db,
    });
})

/**
 * 2- CREATE Créer un élément
 * Définir un ENDPOINT /api/v1/phones
 * Retourner CODE HTTP 200 si ok
 * Retourner CODE HTTP 400 si error
 * Retour : Retourner les données de la requête
 * Valider les données
 * Insérer en BDD l'élément créé
 */

// POST
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
    message: 'phone ajouté avec succès !',
    phones: phoneToSave,
  })})

/**
 * 3- GETBYID RECUPERER les données d'un élément selon l'id
 * Définir un ENDPOINT avec PATH PARAM /api/v1/phones/:id
 * Coder fonction findPhoneById(id)
 * Retour : Retourner les données avec un CODE HTTP 200
 * Retour CODE HTTP 400 si error
 */

// GET BY ID
app.get('/api/v1/phones/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const phone = findPhoneById(id);
  if (phone) {
    res.status(200).send({
      success: true,
      message: 'phone récupéré avec succès !',
      phone,
    });
  } else {
    res.status(404).send({
      success: false,
      message: 'phone not found !',
      phone,
    });
  }
})

/**
 * 4- DELETE SUPPRIMER les données d'un élément selon l'id
 * Définir un ENDPOINT avec PATH PARAM /api/v1/phones/:id
 * Coder fonction deletePhoneById(id)
 * Retour : Retourner les données avec un CODE HTTP 200
 * Retour CODE HTTP 400 si error
 */

// DELETE
app.delete('/api/v1/phones/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const phone = deletePhoneById(id);
  if (phone) {
    res.status(200).send({
      success: true,
      message: 'phone supprimé avec succès !',
      phone,
    });
  } else {
    res.status(404).send({
      success: false,
      message: 'phone not found !',
    });
  }
})

/**
 * 5- PUT METTRE A JOUR les données d'un élément selon l'id
 * Définir un ENDPOINT avec PATH PARAM /api/v1/phones/:id
 * Coder fonction updatePhoneById(id, phone)
 * Valider les données
 * Retour : Retourner les données avec un CODE HTTP 200
 * Retour CODE HTTP 400 si error
 */

// PUT
app.put('/api/v1/phones/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const phoneToUpdate = req.body;
  const phone = updatePhoneById(id, phoneToUpdate);
  if (phone) {
    res.status(200).send({
      success: true,
      message: 'phone mis à jour avec succès !',
      phone,
    });
  } else {
    res.status(404).send({
      success: false,
      message: 'phone not found !',
    });
  }
})

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur demarré sur le port ${port}`);
  console.log(`http://localhost:${port}`);
});
