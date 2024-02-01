module.exports = function isValidLongitude(req, res, next) {
    const { longitude } = req.body;
  
    if (longitude >= -180 && longitude <= 180) {
      next(); 
    } else {
      return res.status(400).json({ message: "Please enter a valid longitude." });
    }
  };