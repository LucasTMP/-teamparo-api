const Ong = require('../../../models/Ong')

module.exports.exists = (req, res, next) => {
  Ong.find({ email: req.body.email }).limit(1).lean().then(ong => {
    if (ong.length > 0) return res.status(400).json({
      status: 400,
      friendlyMsg: 'Ja existe uma ong com o email informado',
    })
    next()
  })
}
