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

export const findPhoneById = function (id) {
  const phoneFound = db.find((phone) => {
    if (phone.id === id) {
      return phone;
    }
  });
  return phoneFound;
};

export const deletePhoneById = function (id) {
  const phoneFound = db.find((phone, index) => {
    if (phone.id === id) {
      db.splice(index, 1);
      return true;
    }
  });
  return phoneFound;
};

/**
 *
 * @param {*} id
 * @param {*} newPhone
 * @returns
 */

export const updatePhoneById = function (id, phoneToUpdate) {
  let phoneFound;
  let itemIndex;

  db.map((phone, index) => {
    if (phone.id === id) {
      phoneFound = phone;
      itemIndex = index;
    }
  });
  if (!phoneFound) {
    return false;
  }
  if (!validate(phoneToUpdate).success) {
    return false;
  }
  const updatedPhone = {
    id: phoneFound.id,
    marque: phoneToUpdate.marque || phoneFound.marque,
    modele: phoneToUpdate.modele || phoneFound.modele,
    description: phoneToUpdate.description || phoneFound.description,
    annee: phoneToUpdate.annee || phoneFound.annee,
    service: phoneToUpdate.service || phoneFound.service,
    couleur: phoneToUpdate.couleur || phoneFound.couleur,
    capacité: phoneToUpdate.capacité || phoneFound.capacité,
    taille: phoneToUpdate.taille || phoneFound.taille,
  };
  db.splice(itemIndex, 1, updatedPhone);
  return updatedPhone;
};
