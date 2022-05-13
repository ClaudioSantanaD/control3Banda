const express = require('express')
const app = express()

require('dotenv').config()
require('./bd/dbConect')

app.get("/", (req, res) => {
    res.json({
        message: "Ruta rais mishangre"
    })
})

//app.use(express.json())
/*app.use(
    express.urlencoded({
        extended:true,
    })
)*/

app.use("/api/user", require('./routes/auth'))
app.use("/bandas/", require('./routes/banda'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server On"))