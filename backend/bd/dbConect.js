const mongoose = require('mongoose')
//const option = {useNewUrlParser: true, useUnifiedTopology: true} 
mongoose.connect(process.env.URI, )
    .then( () => console.log("Conectado a la db"))
    .catch(e => console.log("falló conexion a la db" + e))