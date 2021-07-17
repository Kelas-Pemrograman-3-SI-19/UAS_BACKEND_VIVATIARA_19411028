const mapalaModel = require('../model/Mapala')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertMapala = (data) =>
  new Promise((resolve, reject) => {
    mapalaModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Mapala')))
    .catch(() => reject(requestResponse.serverError))
  })

exports.getAllmapala = () =>
  new Promise((resolve, reject) => {
    mapalaModel.find({})
     .then(mapala => resolve(requestResponse.suksesWithData(mapala)))
     .catch(error => reject(requestResponse.serverError))
  })

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    Model.findOne({
      _id: objectId(id)
    }).then(mapala => resolve(requestResponse.suksesWithData(mapala)))
    .catch(error => reject(requestResponse.serverError))
  })

exports.edit = (data, id, changeImage) =>
  new Promise(async(resolve, reject) => {
    mapalaModel.updateOne({
      _id: objectId(id)
    }, data)
      .then(() => {
        if (changeImage) {
          deleteImage(data.oldImage)
        }
        resolve(requestResponse.sukses('Berhasil Edit Data'))
      }).catch(() => reject(requestResponse.serverError))
  })

exports.delete = (id) =>
  new Promise((resolve, reject) =>{
    mapalaModel.findOne({
      _id: objectId(id)
    }).then(mapala => {
      mapalaModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteImage(mapala.image)
        resolve(requestResponse.sukses('Berhasil Delete mapala'))
      }).catch(() => reject(requestResponse.serverError))
    })
  })