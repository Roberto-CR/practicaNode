// El archivo response es para responder si se conecto a la red
// Tener todas la respuestas en el mismo archivo ara que todo sea coerenta y tenga sentido

exports.success =function (req,res,message,status){
    res.status(status|| 200).send({
    error: false,
    status:status,
    body: message
});

}
exports.error =function (req,res,message,status,details){
    console.error(details)
    res.status(status|| 500).send({
        error: message,
        status:status,
        body: false
    });
}
