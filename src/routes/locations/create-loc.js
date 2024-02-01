const router = require('express').Router();
const Location = require('../../models/locations');

const isValidLatitude = require('../../validations/isValidLatitude');
const isValidLongitude = require('../../validations/isValidLongitude');
const isValidHexColor = require('../../validations/isValidHexColor')

router.post('/location', isValidLatitude, isValidLongitude, isValidHexColor, async (req, res) => {
  try {
    const { name, latitude, longitude, markerColor } = req.body;

    if (!name || !latitude || !longitude || !markerColor) {
      return res.status(400).json({ message: "Please fill in all." });
    }


    const location = new Location({
      name,
      latitude,
      longitude,
      markerColor,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude]
      }
    });

    const savedLocation = await location.save();

    res.status(201).json({ message: "New location saved successfully.", location: savedLocation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occured while saving location.", error: err.message });
  }
});

module.exports = router;
