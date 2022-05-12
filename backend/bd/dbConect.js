const mongoose = require('mongoose')

mongoose.connect(process.env.URI)
    .then( () => console.log("Conectado a la db"))
    .catch(e => console.log("falló conexion a la db" + e))