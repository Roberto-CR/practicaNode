/** El controller solo puede tener permiso  de acceder  a la parte de datos pero no a la de redes */
const { nanoid } = require('nanoid'); //Genera el id aliatoria
const auth = require('../auth')
const TABLA = 'user';



module.exports = function(injectedStore){ // exporta la funciones del controlador al network
    let store = injectedStore;
    if (!store) {
        store=require('../../../store/dummy') ;// con esto tenemos acceso al store de dummy
    }

    function list(){
        return store.list(TABLA);
    }
    function get(id){
        return store.get(TABLA,id);
    }
    async function upsert(body) {
        const user = {
            name: body.name,
            username:body.username,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }
        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username:user.username,
                password:body.password,
            })
        }
        return store.upsert(TABLA, user);
    }

    return {
        list,
        get,
        upsert,
    };
}