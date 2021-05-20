const express = require('express')
const router = express.Router()

const Auth = require('../utils/security/auth')


router.use('/v1/auth', require('./auth'))

router.use('/v1/user', require('./user'))

router.use('/v1/ong', require('./ong'))

router.get('/ping', [Auth], (req, res) => {
  res.json({ 'pong': true })
})

router.use((req, res, next) => {
  next({
    status: 404,
    code: 3,
    friendlyMsg: 'Rota não encontrada'
  })
})

module.exports = router
