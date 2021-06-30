/**  Esto es toda la parte de red de  nuestro componente user todos los http se ponen aqui */

const express = require('express');// Sirve par importar el npm i express que instalamos
const secure = require('./secure')
const response = require('../../../network/response') // esto es para poder usar los response si son exitosos y tuvieron error
const Controller = require('./index')// importa el controlador para poder usarlo


const router = express.Router(); /* Router para crear manejadores de rutas montables y modulares.
Una instancia Router es un sistema de middleware y direccionamiento
completo; por este motivo, a menudo se conoce como una “miniaplicación */



// Routes
router.get('/', list)
router.get('/:id', get);
router.post('/', upsert);
router.put('/',secure('update'), upsert); //esto ejecuta la funcion secure de secure.js

// Internal functions
function list(req, res,next) {
    Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
    
}

function get(req, res,next) {
    Controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function upsert(req, res,next) {
    Controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}


module.exports = router; //Recuerte exportar ya que si esta importando en otro lugar se importara un objeto vacio 