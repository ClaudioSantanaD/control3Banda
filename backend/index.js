const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
require('./bd/dbConect')

const enablelist = ["http://localhost:3000"]
const corsOpt = {
    origin: enablelist,
    optionsSuccessStatus: 200
}

app.use(cors(corsOpt))

app.get("/", (req, res) => {
    res.json({
        message: "Ruta rais mishangre"
    })
})

app.use(express.json())
app.use(
    express.urlencoded({
        extended:false,
    })
)

app.use("/user", require('./routes/auth'))
app.use("/bandas", require('./routes/banda'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server On"))