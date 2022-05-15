const userMong = require('../bd/userModel.js')
const bandaConcertMong = require('../bd/bandaModel.js')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    //console.log(req.body)

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json(errors)
    }

    const {username, name, email, password} = req.body

    user = new userMong({username, name, email, password })

    try {

        let emailCheq = await userMong.findOne({email: email})
        if(emailCheq) res.status(400).json({message:"Este usuario ya existe >:c"} ) 

        await user.save()

        res.json({messagge: "User registrado"})


    } catch(error){
        res.status(400).json(error)
        console.log(error)
    }

    console.log(req.body)
}

const loginUser = async(req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json(errors)
    }

    const {email, password} = req.body
    try {

        const user = await userMong.findOne({email})
        if(!user) res.status(400).json({message:'Error, datos dados erroneos'})

        if(!await user.comparePass(password)) res.status(400).json({message:'Error, datos dados erroneos'})

        const authToken = jwt.sign({
            username: user.username,
            name: user.name,
            id: user._id
        }, process.env.ACCESS_TOKEN_SEC)

        res.header('auth-token', authToken).json({
            message:"Login Exitoso",
            token: authToken
        })

    } catch(error) {
        res.status(400).json(error)
        console.log(error)
    }


}

const findUserConcert = async(req,res) => {

    try{
        const user = await userMong.findOne({username:req.user.username})
        if(!user) res.status(400).json({message:'No existe este username'})

        const userConcerts = await bandaConcertMong.find({ '_id': { $in: user.myConcerts } }).sort({fechaHora:0})
        res.json(userConcerts)

    }catch(error){
        res.status(400),json(error)
        console.log(error)
    }

}

const addConcertToUser = async(req,res) => {
    const {bandaName, fechaHora} = req.body

    try{

        concert = await bandaConcertMong.findOne({bandaName, fechaHora})
        if(!concert) res.status(400).json({message:'No se encuentra un evento con los datos dados'})

        //console.log(concert._id)

        const user = await userMong.findOneAndUpdate({username:req.user.username}, {$addToSet: {myConcerts:concert._id}})
        if(!user) res.status(400).json({message:'No existe este username'})

        res.json({message: "Concierto añadido a tus favoritos :)"})

    }catch(error){
        //res.status(400).json(error)
        console.log(error)
    }

}

module.exports = {loginUser, registerUser, findUserConcert, addConcertToUser}