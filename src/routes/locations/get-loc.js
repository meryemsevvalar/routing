const router = require('express').Router()
const Location = require('../../models/locations')

router.get('/location/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const location = await Location.findById(id);

        if (!location) {
            return res.status(404).json({ "Message": "Location not found." });
        }

        res.status(200).json({ location });
    } catch (err) {
        console.error(err);
        res.status(500).send({ err });
    }
})


module.exports = router