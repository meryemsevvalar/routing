const router = require('express').Router();
const Location = require('../../models/locations');

const isValidLatitude = require('../../utils/validations/isValidLatitude');
const isValidLongitude = require('../../utils/validations/isValidLongitude');
const limit = require('../../utils/limiting/limit')

router.post('/calculate-rotation', isValidLatitude, isValidLongitude, limit, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const closestLocations = await Location.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          distanceField: "distance",
          spherical: true
        }
      },
      {
        $project: {
          _id: 0,
          distance: 1,
          location: 1,
          name:1
        }
      },
      {
        $sort: {
          distance: 1
        }
      }
    ]);

    if (!closestLocations || closestLocations.length === 0) {
      return res.status(404).json({ message: "No locations." });
    }

    
    closestLocations.forEach((location, index) => {
      location.step = index;
    });

    res.json({ message: "Locations listed successfully.", closestLocations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occured while listing locations.", error: err.message });
  }
});

module.exports = router;
