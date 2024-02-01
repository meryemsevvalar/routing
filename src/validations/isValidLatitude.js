
module.exports = function isValidLatitude(req, res, next) {
    const { latitude } = req.body;
  
    if (latitude >= -90 && latitude <= 90) {
      next(); 
    } else {
      return res.status(400).json({ message: "Please enter a valid latitude." });
    }
  };
  