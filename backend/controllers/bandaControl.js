const bandaConcertMong = require('../bd/models.js')

const findAllConcerts = async(req,res) =>{
    try{

        res.json(await bandaConcertMong.find())

    } catch(error){
        res.status(400).json({message:"ERROR"})
        console.log(error)
    }
}

const findByCity = async(req, res) => {
    
    const{ciudad} = req.body
    try{

        const cityConcerts = await bandaConcertMong.findOne({ciudad:ciudad})
        res.json(cityConcerts)

    } catch(error){
        res.status(400).json(error)
        console.log(error)
    }
}

module.exports = {findAllConcerts, findByCity}