import db from '../data/database.js'

export const insert = function(phone) {
  phone.id = db.length + 1
  db.push(phone)
  return phone
}

export const updateById = function(phoneToUpdate) {
  let phoneFound;
  let itemIndex;

  db.map((phone, index) => {
    if (phone.id === phoneToUpdate.id) {
      phoneFound = phone;
      itemIndex = index;
    }
  });
  if (!phoneFound) {
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
  return updatedPhone
}

export const deleteById = function(id) {
  const phoneFound = db.find((phone, index) => {
    if (phone.id === id) {
      db.splice(index, 1);
      return true;
    }
  });
  return phoneFound;
}

export const getAll = function() {
  return db;
}

export const getById = function(id) {
  const phoneFound = db.find((phone) => {
    if (phone.id === id) {
      return phone;
    }
  });
  return phoneFound;
}