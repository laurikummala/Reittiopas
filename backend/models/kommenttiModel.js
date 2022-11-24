const mongoose = require('mongoose')

const kommenttiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    teksti: {
      type: String,
      required: [true, 'Lisää kommentti']
    },
    parentId: {
      type: String,
      default: null
    },
  },
  {
    timestamps:true,
  }
)

module.exports = mongoose.model('Kommentti', kommenttiSchema)