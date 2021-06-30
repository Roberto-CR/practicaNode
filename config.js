
/* Es para exportar informacion que se puede cambiar mas facil desde aqui 
    el process.env nor sirve para que sea una variable de entorno .API_PORT es  para decir en .env que entorno es o si no vaya al 3000
*/
module.exports={
    api:{
        port:process.env.API_PORT || 3000,
    },
    jwt:{
        secret:process.env.JWT_SECRET||'notasecret',
    }
}

