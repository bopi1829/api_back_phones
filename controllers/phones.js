import db from '../data/database.js'
import { findPhoneById, deletePhoneById, updatePhoneById, createPhone, validate } from '../buisness/PhonesService.js';

export const createPhoneCtrl = (req, res) => {
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
    })}


export const getAllPhonesCtrl = (req, res) => {
  res.status(200).send({
    success: true,
    message: 'phones récupéré avec succès !',
    phones: db,
  });
}

export const getPhoneByIdCtrl = (req, res) => {
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
}

  export const deletePhoneByIdCtrl = (req, res) => {
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
      }


export const modifyPhoneByIdCtrl = (req, res) => {
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
    }