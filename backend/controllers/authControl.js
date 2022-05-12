const userMong = require("../bd/models")

const registerForm = (req, res) => {
    res.render('register')
}

const registerUser = async (req, res) => {
    console.log(req.body)
    const {userName, email, password} = req.body
    try {

        let user = await userMong.findOne({email: email})
        if(user) throw new Error("Este usuario ya existe >:c")

        user = new userMong({userName, email, password})
        await user.save()

    } catch(error){
        res.json({error: "ocurrio un error al registrar el usuario"})
    }
}

const loginForm = (req, res) => {
    res.render('login')
}


module.exports = { loginForm, registerForm, registerUser }