const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const OngSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: String,
  photo: {
    url: {
      type: String,
      default: null
    }
  },
  description: {
    type: String,
    required: true
  },
  payment: {
    bank: {
      number: String,
      agency: String,
      account: String,
    }
  },
  
  users: [
    {
      type: ObjectId,
      ref: 'User'
    }
  ],

  social:{
    facebook: String,
    instagram: String,
    twitter: String,
  },

  tags: Array,
  cnpj: String,
  city: String,
  address: String,
  email: String,
  cep: String
}, { timestamps: true })

module.exports = mongoose.model('Ong', OngSchema)
