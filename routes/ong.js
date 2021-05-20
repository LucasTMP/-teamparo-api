const express = require('express')
const router = express.Router()

const Ong = require('../models/Ong')
const User = require('../models/User')

const auth = require('../utils/security/auth')
const security = require('../utils/security/')


router.post('/', [auth, security.validations.ong.exists], async (req, res, next) => {
  const user = await User.find({ _id: req.user._id }, { ongs: 1 })
  Ong.create(req.body).then(ong => {
    user[0].ongs.push({
      ongId: ong._id,
      joinedAt: new Date(),
      type: 'owner'
    })
    ong.users.push(req.user._id)
    ong.save()
    user[0].save()
    return res.status(200).json({
      _id: ong._id,
      name: ong.name,
    })
  }).catch(err => console.log(err))
})

router.get('/', [auth], async (req, res, next) => {
  Ong.find().lean().then(ong => {
    console.log(ong)
    return res.status(200).json(ong)
  })
})

router.get('/:id', [auth], async (req, res, next) => {
  Ong.find({ _id: req.params.id }).limit(1).lean().then(ong => {
    if (ong.length === 0) return res.status(400).json({
      status: 400,
      friendlyMsg: 'Nenhuma ong encontrada',
    })

    return res.status(200).json(ong[0])
  })
})

module.exports = router


