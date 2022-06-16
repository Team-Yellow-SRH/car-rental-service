const mongoose = require('mongoose')

const serviceCentre = new mongoose.Schema({
    location: {type: Object},
    title: {type: String},
},{collection: 'service_centres_collection'})

const Centres = mongoose.model('Centres', serviceCentre);
module.exports = Centres;