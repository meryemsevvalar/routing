const router = require('express').Router()
const Location = require('../../models/locations')

router.get('/location-list', async (req, res, next) => {

    try {
        const locationList = await Location.find()
        
        res.status(200).json({ locationList})
        
    }catch(err){
        console.log(err)
        res.status(500).json({ "An error occured while listing location, ": err})
        }

})

module.exports = router