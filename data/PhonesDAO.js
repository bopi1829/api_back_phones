import db from '../data/database.js'

export const insert = function(phone) {
  phone.id = db.length + 1
  db.push(phone)
  return phone
}

export const updateById = function(phone) {
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
}

export const delById = function(phone) {
  
}

export const getAll = function(phone) {
  return db
}

export const getById = function(phone) {
  const phoneFound = db.find((phone) => {
    if (phone.id === id) {
      return phone;
    }
  });
  return phoneFound;
}