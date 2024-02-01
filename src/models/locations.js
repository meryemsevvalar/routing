const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  markerColor: String,
  location: {
    type: {
      type: String,
      enum: ['Point'], // Sadece 'Point' türünü kabul ediyoruz
      required: true
    },
    coordinates: {
      type: [Number], // Koordinatları bir dizi olarak tutuyoruz [longitude, latitude]
      required: true
    }
  }
});

// 2dsphere indeksi oluştur
locationSchema.index({ location: '2dsphere' });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
