const express = require('express');
const { loginForm, registerForm, registerUser } = require('../controllers/authControl');
const router = express.Router()

router.get("/login", loginForm)
router.get("/register", registerForm)
router.post("/register", registerUser)

module.exports = router;