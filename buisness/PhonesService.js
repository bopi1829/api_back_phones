import { getById, insert, updateById, deleteById } from '../data/PhonesDAO.js';

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
  
  return insert(phone)
};

export const findPhoneById = function (id) {
  return getById(id);
};

export const deletePhoneById = function (id) {
  deleteById(id)
};

/**
 *
 * @param {*} id
 * @param {*} newPhone
 * @returns
 */
export const updatePhoneById = function (id, phoneToUpdate) {
  if (!validate(phoneToUpdate).success) {
    return false;
  }
  phoneToUpdate.id = id
  return updateById(phoneToUpdate)
};