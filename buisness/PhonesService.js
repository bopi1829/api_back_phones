import db from '../data/database.js';

export const validate = function (phone) {
  if (!phone.marque) {
    return {
      success: false,
      message: 'marque is required',
    };
  }
  if (!phone.modele) {
    return {
      success: false,
      message: 'modele is required',
    };
  }
  if (!phone.service) {
    return {
      success: false,
      message: 'service is required',
    };
  }
  return {
    success: true,
    message: 'valide',
  };
};

export const createPhone = function (phone) {
  const phoneToSave = {
    id: db.length + 1,
    marque: phone.marque,
    modele: phone.modele,
    description: phone.description,
    annee: phone.annee,
    service: phone.service,
    couleur: phone.couleur,
    capacité: phone.capacité,
    taille: phone.taille,
  };
  db.push(phoneToSave);
  return phoneToSave;
};
