import express from 'express'


import { createPhoneCtrl, deletePhoneByIdCtrl, getAllPhonesCtrl, getPhoneByIdCtrl, modifyPhoneByIdCtrl } from '../controllers/phones.js';

export const phonesRoutes = express.Router()

/**
 * 1- GET ALL RECUPERER toutes les données phones
 * Définir un ENDPOINT /api/v1/phones
 * Traitement : rien
 * Retour : Retourner les données avec un CODE HTTP 200
 * Retour CODE HTTP 400 si error
 */

// GET ALL
phonesRoutes.get('/', getAllPhonesCtrl)

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
phonesRoutes.post('/', createPhoneCtrl)

/**
* 3- GETBYID RECUPERER les données d'un élément selon l'id
* Définir un ENDPOINT avec PATH PARAM /api/v1/phones/:id
* Coder fonction findPhoneById(id)
* Retour : Retourner les données avec un CODE HTTP 200
* Retour CODE HTTP 400 si error
*/

// GET BY ID
phonesRoutes.get('/:id', getPhoneByIdCtrl)

/**
* 4- DELETE SUPPRIMER les données d'un élément selon l'id
* Définir un ENDPOINT avec PATH PARAM /api/v1/phones/:id
* Coder fonction deletePhoneById(id)
* Retour : Retourner les données avec un CODE HTTP 200
* Retour CODE HTTP 400 si error
*/

// DELETE
phonesRoutes.delete('/:id', deletePhoneByIdCtrl)

/**
* 5- PUT METTRE A JOUR les données d'un élément selon l'id
* Définir un ENDPOINT avec PATH PARAM /api/v1/phones/:id
* Coder fonction updatePhoneById(id, phone)
* Valider les données
* Retour : Retourner les données avec un CODE HTTP 200
* Retour CODE HTTP 400 si error
*/

// PUT
phonesRoutes.put('/:id', modifyPhoneByIdCtrl)