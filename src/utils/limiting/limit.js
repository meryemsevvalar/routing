const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100, 
  message: "Too many request, please try again later.",
});

module.exports = limiter;
