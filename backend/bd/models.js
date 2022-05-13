const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose
 
const userSchema = new Schema({

    username:{ type: String, lowercase: true, required: true, unique: true },
    name:{type: String},
    email:{ type: String, lowercase: true, required: true, unique: true},
    password:{type: String, required: true},
    myConcerts:[{type: Schema.Types.ObjectId, ref:"BandaEnConcierto", default: undefined}]
})

const bandaConcertShema = new Schema({
    bandaName:{type: String, required: true},
    fechaHora:{type: Date, required: true, unique: true },
    ciudad:{type: String, lowercase:true, required: true},
    detalle:{

        productoraEvento:{type: String, required: true },
        descriptEvento:{type: String, required: true },
        lugar:{type: String, lowercase: true, required: true },
        auspiciadores:{type: [String], default: undefined}

       }

})

userSchema.pre('save', async function(next){
    const usr = this
    if(!usr.isModified('password')) return next()

    try{
        const salt = await bcrypt.genSalt(11)
        const hash = await bcrypt.hash(usr.password, salt)

        usr.password = hash
        next()

    } catch(error){
        console.log(error)
        next()
    }
})

userSchema.methods.comparePass = async function(givenPass){
    return await bcrypt.compare(givenPass, this.password)
}

const userMong = mongoose.model('User', userSchema)
const bandaConcertMong = mongoose.model('BandaEnConcierto', bandaConcertShema)

module.exports = userMong, bandaConcertMong