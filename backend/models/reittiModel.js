const mongoose = require('mongoose')

const reittiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    nimi: {
      type: String,
      required: [true, 'Lisää reitin nimi']
    },
    pituus: {
      type: Number,
      required: [true, 'Lisää reitin pituus kilometreinä']
    },
    kuvaus: {
      type: String,
      required: [true, 'Lisää reitin kuvaus']
    },
    reittityypit:[{
      melonta: {
        type: Boolean,
        default: false
      },
      pyoraily: {
        type: Boolean,
        default: false
      },
      vaellus: {
        type: Boolean,
        default: false
      },
    }],
  },
  {
    timestamps:true,
  }
)

module.exports = mongoose.model('Reitti', reittiSchema)

