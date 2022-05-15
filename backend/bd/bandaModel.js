const mongoose = require('mongoose')
const { Schema } = mongoose

const bandaConcertShema = new Schema({
    bandaName:{type: String, required: true},
    fechaHora:{type: Date, required: true, unique: true },
    ciudad:{type: String, required: true},
    detalle:{

        productoraEvento:{type: String, required: true },
        descriptEvento:{type: String, required: true },
        lugar:{type: String, lowercase: true, required: true },
        auspiciadores:{type: [String], default: undefined}

       }

})

const bandaConcertMong = mongoose.model('BandaEnConcierto', bandaConcertShema)
module.exports = bandaConcertMong