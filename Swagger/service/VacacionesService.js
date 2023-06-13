'use strict';
const { myQuery } = require('../utils/query')


/**
 * Delete Peticion
 * Elimina la peticion de unas vacaciones
 *
 * id Integer Escribe la id e visitas
 * returns String
 **/
exports.deletePeticion = function (id) {
  sumarDiaLaboral(id)
  return new Promise(function (resolve, reject) {
    myQuery(`delete from TablaVacaciones where IdVacaciones = ${id}`)
    .then(result => {
      resolve(result);
    })
    .catch(error => {
      console.log('Error:', error);
      reject(error);
    });
  });

}


/**
 * Obtiene el listado de las de un usuario
 *
 * returns List
 **/
exports.getAllVacaciones = function () {
  return new Promise(function (resolve, reject) {
    myQuery(`select t.*, e.NombreEstado from TablaVacaciones t join Estado e on t.IdEstado = e.IdEstado`)
      .then(
        result => {
          resolve(result.recordset);
        }).catch(error => {
          console.log('Error:', error);
          reject(error);
        });
  });
}


/**
 * Obtiene el listado de las de un usuario
 *
 * idUsuario Integer Escribe la id (optional)
 * returns List
 **/
exports.getAllVacacionesUSER = function (idUsuario) {
  return new Promise(function (resolve, reject) {
    myQuery(`select t.*, e.NombreEstado from TablaVacaciones t join Estado e on t.IdEstado = e.IdEstado where IdUsuario = ${idUsuario} ORDER BY fechaVacaciones`)
      .then(
        result => {
          console.log(result.recordset);
          resolve(result.recordset);
        }).catch(error => {
          console.log('Error:', error);
          reject(error);
        });
  });
}

/**
 * Obtiene el listado de las de un usuario
 *
 * idUsuario Integer Escribe la id (optional)
 * returns List
 **/
exports.getVacacion = function (idVacacion) {
  return new Promise(function (resolve, reject) {
    myQuery(`select t.*, e.NombreEstado from TablaVacaciones t join Estado e on t.IdEstado = e.IdEstado where IdVacaciones = ${idVacacion}`)
      .then(
        result => {
          resolve(result.recordset[0]);
        }).catch(error => {
          console.log('Error:', error);
          reject(error);
        });
  });
}

/**
 * Crea una nueva solicitud
 * Crea una nueva solicitud
 *
 * body List  (optional)
 * idUsuario Integer Escribe la id del usuario
 * returns List
 **/
exports.postPeticion = function (body, idUsuario) {
  let idEstado = 0;
  switch (body[0].estado) {
    case "Aprobada": idEstado = 2; break;
    case "Disfrutada": idEstado = 3; break;
    case "Denegada": idEstado = 4; break;
    case "Pendiente":
    case null:
    default: idEstado = 5; break;
  }
  return new Promise(function (resolve, reject) {

    console.log(`insert into TablaVacaciones (fechaVacaciones,IdEstado,IdUsuario,Tipo) values (CONVERT(DATETIME,'${body[0].fechaVacaciones}'),${idEstado},${idUsuario}, '${body[0].Tipo}')`)
    myQuery(`insert into TablaVacaciones (fechaVacaciones,IdEstado,IdUsuario,Tipo) values (CONVERT(DATETIME,'${body[0].fechaVacaciones}'),${idEstado},${idUsuario}, '${body[0].Tipo}')`)
      .then(result => {
        return restarDiaLaboral(idUsuario); // Resta un día laboral
      })
      .then(result => {
        console.log(result);
        resolve(result);
      })
      .catch(error => {
        console.log('Error:', error);
        reject(error);
      });
  });
}

function sumarDiaLaboral(id) {
  return new Promise(function (resolve, reject) {

    myQuery(`select IdUsuario from TablaVacaciones where IdVacaciones = ${id}`)
      .then(result => {
        console.log(result);
        console.log(result.recordset[0]);
        return myQuery(`update Usuario set diasVacacionales = diasVacacionales + 1 where IdUsuario = ${result.recordset[0].IdUsuario}`);
      })
      .then(result => {
        console.log(result);
        resolve(result);
      })
      .catch(error => {
        console.log('Error:', error);
        reject(error);
      });
  });
}

function restarDiaLaboral(idUsuario) {
  return new Promise(function (resolve, reject) {
    myQuery(`update Usuario set diasVacacionales = diasVacacionales - 1 where IdUsuario = ${idUsuario}`)
      .then(result => {
        console.log(result);
        resolve(result);
      })
      .catch(error => {
        console.log('Error:', error);
        reject(error);
      });
  });
}

/**
 * Update Vacaciones
 * Modifica la fecha y el estado de las vacaciones
 *
 * body Vacaciones  (optional)
 * id Integer Escribe la id
 * returns List
 **/
exports.putVacaciones = function (body, IdVacaciones) {
  let idEstado = 0;
  switch (body[0].estado) {
    case "Aprobada": idEstado = 2; break;
    case "Disfrutada": idEstado = 3; break;
    case "Denegada": idEstado = 4; break;
    case "Pendiente":
    default: idEstado = 5; break;
  }
  return new Promise(function (resolve, reject) {
    resolve(myQuery(`update TablaVacaciones SET fechaVacaciones = CONVERT(DATETIME,'${body[0].fechaVacaciones}'), IdEstado=5, tipo = '${body[0].Tipo}' where IdVacaciones = ${IdVacaciones}`))
      .then(
        result => {
          resolve(result.recordset);
        }).catch(error => {
          console.log('Error:', error);
          reject(error);
        });
  });
}

