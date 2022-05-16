const bandaConcertMong = require('../bd/bandaModel.js')

const findCityConcerts = async(req, res) =>{
    try{

        const cities = await bandaConcertMong.find().distinct("ciudad")
        res.json(cities)

    } catch(error){
        res.status(400).json({message:"ERROR"})
        console.log(error)
    }
}

const findByCity = async(req, res) => {
    
    //console.log(req.body)

    const {ciudad} = req.body
    try{

        const cityConcerts = await bandaConcertMong.find({ciudad:ciudad}).sort({fechaHora:0})
        res.json(cityConcerts)

    } catch(error){
        res.status(400).json(error)
        console.log(error)
    }
}

module.exports = {findCityConcerts, findByCity}