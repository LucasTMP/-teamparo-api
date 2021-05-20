const User = require('../../../models/User')


module.exports.exists = (req, res, next) => {
  User.find({ email: req.body.email }).limit(1).lean().then(user => {
    if (user.length > 0) return res.status(400).json({
      status: 400,
      friendlyMsg: 'Ja existe um usuario com este email',
    })
    next()
  }).catch(err => console.log(err))
}
