const router = require('express').Router()
const trevelController = require('../controller/Trevel')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
  {
    name: 'image',
    maxCount: 1
  }
])

router.post('/insert', fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])

  const data = Object.assign(JSON.parse(req.body.data), {
    image: imageName
  })

  trevelController.insertTrevel(data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get('/getall', (req, res) => {
  trevelController.getAllTrevel()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.get('/getbyid/:id', (req, res) => {
  trevelController.getById(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.put('/edit/:id', fields,(req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])

  let data = JSON.parse(req.body.data)
  let changeImage = false
  if (imageName) {
    changeImage = true
    data = Object.assign(data, {
      image: imageName,
      oldImage: data.image
    })
  }

  trevelController.edit(data, req.params.id, changeImage)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

router.delete('/delete/:id', (req, res) => {
  trevelController.delete(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

module.exports = router