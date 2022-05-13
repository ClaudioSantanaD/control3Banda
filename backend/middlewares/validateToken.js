const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).json({message: "Accesso denegado"})

    try{

        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SEC)
        req.user = verified
        next()

    } catch(error){
        res.status(400).json(error)
        console.log(error)
    }
}

module.exports = verifyToken