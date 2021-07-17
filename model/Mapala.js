const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MapalaSchema = new Schema({
    hargapendaftaran: {
      type: Number
    },
    bataspendaftaran: {
      type: String,

    },
    namalengkap: {
      type: String
    },

    divisi: {
      type: String
    },
    rating: {
      type: Number,
      default: 0
    },
    deskripsi: {
        type: String,
    },
    image: {
        type: String
    }
})

module.exports = mongoose.model('mapala', MapalaSchema)