module.exports = function isValidHexColor(req, res, next) {
    const { markerColor } = req.body; 
  
    const hexColorRegex = /^#([0-9A-Fa-f]{6})$/;
    if (hexColorRegex.test(markerColor)) {
      next(); 
    } else {
      return res.status(400).json({ message: "Please enter a valid hex color." });
    }
}