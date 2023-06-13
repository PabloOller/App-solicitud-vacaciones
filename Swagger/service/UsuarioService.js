'use strict';
const { myQuery } = require('../utils/query')

/**
 * loggear usuario
 * Aquí se va a loguear el usuario.
 *
 * idViewNext Integer Coge la id
 * pass String Coge la contraseña
 * returns Usuario
 **/
exports.loginGET = function (idViewNext, pass) {
  return new Promise(function (resolve, reject) {
    myQuery(`select * from Usuario where IdViewNext = ${idViewNext} AND Pass = '${pass}'`)
      .then(result => {
        console.log(result.recordset[0]);
        resolve(result.recordset[0]);
      })
      .catch(error => {
        console.log('Error:', error);
        reject(error);
      });
  });
};



/**
 * desloggear usuario
 * Aquí se va a desloguear el usuario.
 *
 * returns String
 **/
exports.GETUsuario = function (idUsuario) {
  return new Promise(function (resolve, reject) {
    myQuery(`select * from Usuario where IdUsuario = ${idUsuario}`)
      .then(result => {
        resolve(result.recordset[0]);
      })
      .catch(error => {
        console.log('Error:', error);
        reject(error);
      });
  });
}

