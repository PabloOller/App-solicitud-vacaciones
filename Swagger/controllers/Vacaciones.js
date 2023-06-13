'use strict';

var utils = require('../utils/writer.js');
var Vacaciones = require('../service/VacacionesService');

module.exports.deletePeticion = function deletePeticion (req, res, next, id) {
  Vacaciones.deletePeticion(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllVacaciones = function getAllVacaciones (req, res, next) {
  Vacaciones.getAllVacaciones()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllVacacionesUSER = function getAllVacacionesUSER (req, res, next, idUsuario) {
  Vacaciones.getAllVacacionesUSER(idUsuario)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
module.exports.getVacacion = function getVacacion (req, res, next, idVacacion) {
  Vacaciones.getVacacion(idVacacion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postPeticion = function postPeticion (req, res, next, body, idUsuario) {
  Vacaciones.postPeticion(body, idUsuario)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putVacaciones = function putVacaciones (req, res, next, body, id) {
  Vacaciones.putVacaciones(body, id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
