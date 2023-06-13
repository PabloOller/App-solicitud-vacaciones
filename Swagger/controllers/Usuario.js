'use strict';

var utils = require('../utils/writer.js');
var Usuario = require('../service/UsuarioService');

module.exports.loginGET = function loginGET (req, res, next, idViewNext, pass) {
  Usuario.loginGET(idViewNext, pass)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GETUsuario = function GETUsuario (req, res, next, idUsuario) {
  Usuario.GETUsuario(idUsuario)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
