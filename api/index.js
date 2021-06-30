
/* El index.js es para poder construir todo el servidor
y todo lo que se necesita   */

const express = require('express'); // Sirve par importar el npm i express que instalamos
const bodyParser = require('body-parser');// ayuda a conseguir los datos desde el body hay que hacer npm install body-parser
const config = require('../config.js'); // es para si hay algo que se deba cambiar no tener que cambiar desde aqui si no desde config como el port
const user = require('./components/user/network'); //  esto es para poder importar network de user a la app.user  es muy importante
const auth = require('./components/auth/network')
const errors = require('../network/errors')//esto importa los errors de la network de la raiz principal
const app = express(); // Se crea el app


// Router
//app.use es para crear las rutas del sitio
app.use(bodyParser.json());
app.use('/api/user', user); // esto es la direccion web de http://localhost:3000/api/user 
app.use('/api/auth', auth); 

app.use(errors)// es MUY importante que esto se el ultimo en ponerse  si hay un app.use despues de este no va a funcionar

app.listen(config.api.port,()=>{ //es para que se puede escuchar en puerto
    console.log('Api escuchando en el puerto', config.api.port);
}); // como por ejemplo el 300