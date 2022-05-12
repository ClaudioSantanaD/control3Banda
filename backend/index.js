const express = require('express')
const app = express()

require('dotenv').config()
require('./bd/dbConect')

app.get("/", (req, res) => {
    res.send("estas en /")
})

app.use("/auth", require('./routes/auth'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server On"))