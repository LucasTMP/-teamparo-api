const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../models/User')

const security = require('../utils/security/')


router.post('/', [security.validations.user.exists], async (req, res, next) => {
  const user = await User.create({
    name: {
      first: req.body.name.first,
      last: req.body.name.last
    },
    birthDate: req.body.birthDate,
    gender: req.body.gender,
    email: req.body.email,
    type: req.body.type,
    phone: req.body.phone,
    password: await bcrypt.hash(req.body.password, 8)
  })

  return res.status(200).json({
    user: {
      _id: user._id
    },
    friendlyMsg: 'Usuário criado com sucesso'
  })
})
module.exports = router;