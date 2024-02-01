const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  markerColor: String,
  location: {
    type: {
      type: String,
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number], 
      required: true
    }
  }
}, { timestamps: true});

locationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
