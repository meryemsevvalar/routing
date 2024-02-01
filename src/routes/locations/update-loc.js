const router = require('express').Router();
const Location = require('../../models/locations');

const isValidLatitude = require('../../validations/isValidLatitude');
const isValidLongitude = require('../../validations/isValidLongitude');
const isValidHexColor = require('../../validations/isValidHexColor')

router.patch('/location/:id', isValidLatitude, isValidLongitude, isValidHexColor, async (req, res) => {
  try {
    const locationId = req.params.id;
    
    const { latitude, longitude, name, markercolor } = req.body;

    const updatedLocation = await Location.findByIdAndUpdate(locationId, {
      latitude,
      longitude,
      name,
      markercolor
    }, { new: true });

    res.status(200).json({ message: "Location updated successfully.", location: updatedLocation });
  } catch (err) {
   
    res.status(500).json({ message: "An error occurred while saving location.", error: err.message });
  }
});

module.exports = router;
