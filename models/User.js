const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const UserSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  birthDate: Date,
  gender: {
    type: 'String',
    enum: ['male', 'female', 'other']
  },
  email: {
    type: String
  },
  type: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  phone: {
    type: String
  },
  photo: {
    url: {
      type: String,
      default: null
    }
  },
  password: {
    type: String,
    bcrypt: true
  },
  permissions: {
    changePassword: {
      type: Boolean,
      default: false
    }
  },
  ongs: [{
    ongId: {
      type: ObjectId,
      ref: 'Ong'
    },
    joinedAt: {
      type: Date,
    },
    type: {
      type: String,
      enum: ['owner', 'collaborator'],
    }
  }]
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)
