const trevelModel = require('../model/Trevel')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.insertTrevel = (data) =>
  new Promise((resolve, reject) => {
    trevelModel.create(data)
    .then(() => resolve(requestResponse.sukses('Berhasil Input Trevel')))
    .catch(() => reject(requestResponse.serverError))
  })

exports.getAllTrevel = () =>
  new Promise((resolve, reject) => {
    trevelModel.find({})
     .then(trevel => resolve(requestResponse.suksesWithData(trevel)))
     .catch(error => reject(requestResponse.serverError))
  })

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    trevelModel.findOne({
      _id: objectId(id)
    }).then(trevel => resolve(requestResponse.suksesWithData(trevel)))
    .catch(error => reject(requestResponse.serverError))
  })

exports.edit = (data, id, changeImage) =>
  new Promise(async(resolve, reject) => {
    trevelModel.updateOne({
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
    trevelModel.findOne({
      _id: objectId(id)
    }).then(trevel => {
      trevelModel.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteImage(trevel.image)
        resolve(requestResponse.sukses('Berhasil Delete Trevel'))
      }).catch(() => reject(requestResponse.serverError))
    })
  })