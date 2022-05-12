const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const userSchema = new Schema({
    userName:{ 
        type: String, 
        lowercase: true, 
        required: true },

    email:{
        type: String, 
        lowercase: true, 
        required: true,
        unique: true,
        index: {unique: true} },

    password:{
        type: String,
        requiered: true },

    myConcerts:{
        type: [bandaShema],
        default: undefined }
})

const bandaShema = new Schema({

    bandaName:{
        type: String,
        required: true },

    fechaHora:{
        type: Date,
        required:true,
        unique: true },

    detalle:{
        productoraEvento:{
            type: String,
            required: true },
        
        descrEvento:{
            type: String,
            required: true },

         lugar:{
            type: String,
            lowercase: true,
            required: true },

        auspiciadores:{
            type: Array },

        required: true },

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

const userMong = mongoose.model('User', userSchema)
const bandaMong = mongoose.model('BandaEnConcierto', bandaShema)

module.exports = {userMong,bandaMong}