const mongoose = require('mongoose')

const kommenttiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    teksti: {
      type: String,
      required: [true, 'Lisää kommentti']
    },
  },
  {
    timestamps:true,
  }
)

module.exports = mongoose.model('Kommentti', kommenttiSchema)