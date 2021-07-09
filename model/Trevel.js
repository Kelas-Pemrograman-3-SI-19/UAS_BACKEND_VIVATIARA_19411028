const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrevelSchema = new Schema({
    harga: {
      type: Number
    },
    tujuan: {
      type: String,

    },
    typemobil: {
      type: String
    },

    TGLkeberangkatan: {
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

module.exports = mongoose.model('trevel', TrevelSchema)