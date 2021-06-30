const bcrypt = require('bcrypt'); // npm i bcrypt
const auth = require('../../../auth')
const TABLA = 'auth'


module.exports = function(injectedStore){ // exporta la funciones del controlador al network
    let store = injectedStore;
    if (!store) {
        store=require('../../../store/dummy') ;// con esto tenemos acceso al store de dummy
    }
    async function login(username,password){
        const data = await store.query(TABLA, { username: username }); //llama a la funcion query desde el store/dummy y le regresa la data
        return bcrypt.compare(password,data.password)// compara la clave del login con la de la data si son iguales regresa true
        .then(sonIguales =>{
            if (sonIguales===true) { //si sonIguales es true genera el token 
                //generar token
                return  auth.sign(data);
            }else{
                throw new Error('Informacion invalidad')
            }
        })
    }
    async function upsert(data){
        const authData = {
            id: data.id,
        }
        if (data.username){
            authData.username=data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password , 7); // esto encripta la clave y la hace dificil de conseguir
        } //  el 7 es las veces que se  va a ejecutar el agoritmo es bueno ejecutarlo entre 5 y 10 veces

        return store.upsert(TABLA, authData);
    }

    return{
        upsert,
        login,
    };

}