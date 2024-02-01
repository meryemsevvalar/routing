const router = require('express').Router();
const Location = require('../../models/locations');

const isValidLatitude = require('../../validations/isValidLatitude');
const isValidLongitude = require('../../validations/isValidLongitude');

router.post('/calculate-rotation', isValidLatitude, isValidLongitude, async (req, res) => {
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
      return res.status(404).json({ message: "Yakın konum bulunamadı." });
    }

    
    closestLocations.forEach((location, index) => {
      location.step = index;
    });

    res.json({ message: "Konumlar başarıyla sıralandı.", closestLocations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Konumlar sıralanırken bir hata oluştu.", error: err.message });
  }
});

module.exports = router;
