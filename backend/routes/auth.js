const express = require('express')
const {body} = require('express-validator')
const { loginUser, registerUser, findUserConcert, addConcertToUser } = require('../controllers/authControl.js')
const router = express.Router()
const verifyToken = require('../middlewares/validateToken')

router.post("/login",
    body("email","Ingrese un email valido").trim().isEmail().normalizeEmail().escape(),
    body("password","Ingrese contraseña valida de minimo 8 caracteres").trim().isLength({min:8}).escape(),
    loginUser)

router.post("/register", 
    body("username","Ingresa un username valido").trim().notEmpty().escape(),
    body("email","Ingrese un email valido").trim().isEmail().normalizeEmail().escape(),
    body("password","Ingrese contraseña valida de minimo 8 caracteres").trim().isLength({min:8}).escape(), 
    registerUser)

router.get("/getMyConcerts", verifyToken, findUserConcert)
router.put("/addFavoriteConcert", verifyToken, addConcertToUser)

module.exports = router;