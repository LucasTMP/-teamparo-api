const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const authConfig = require('../config/auth')

router.post('/', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.find({ email: req.body.email }).limit(1).lean()
  console.log(user)
  if (user.length === 0) {
    return res.status(401).json({
      status: 401,
      code: 3,
      friendlyMsg: 'Usuário não encontrado'
    });
  }
  if (!(await bcrypt.compare(password, user[0].password))) {
    return res.status(401).json({
      status: 401,
      code: 3,
      friendlyMsg: 'Senha incorreta'
    });
  }

  const { _id, name, ongs } = user[0]

  return res.status(200).json({
    token: jwt.sign({
      _id,
      name: {
        first: name.first,
        last: name.last,
        complete: `${name.first} ${name.last}`
      },
      email,
      ongs
    }, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    })
  })
})

module.exports = router
