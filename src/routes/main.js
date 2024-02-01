const createLocation  = require('./locations/create-loc')
const updateLocation = require('./locations/update-loc')
const getLocation     = require('./locations/get-loc')
const getLocationList = require('./locations/get-loc-list')

const getRotation = require('./rotations/getRotation')


module.exports = [ 
    createLocation,
    getLocationList,
    updateLocation,
    getLocation,
    getRotation
]
