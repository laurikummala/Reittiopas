const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Lisää nimi']
    },
    email: {
      type: String,
      required: [true, 'Lisää sähköpostiosoite'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Lisää salasana']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)