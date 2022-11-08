const mongoose = require('mongoose')

const reittiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Reitti', reittiSchema)



// const mongoose = require("mongoose");

// const reittiSchema = mongoose.Schema(
//   {
//     user: {                                 // Tämä osio on lisätty jolloin reitin tekijä tunnistetaan
//       type: mongoose.Schema.Types.ObjectId, // ObjectID
//       required: true,
//       ref: 'User',
//     },

//       nimi: String, // reitin nimi
//       pituus: Number, // reitin pituus
//       kuvaus: String, // reitin kuvaus
//       user: String // reitin luojan nimi
    
    
// }, {
//   timestamps: true,
// });
// // user:{type:String,index:true}
// /*{
//         "id": 1,
//         "nimi": "Isokangas",
//         "pituus": 5,
//         "kuvaus": "Neulaspolku harjun laella. Hiekkatiet katkaisevat polun useasta kohtaa, joten polkupyöräilijöiden varottava",
//         "reittiKartalla": "Isokangas.img",
//         "lisääjä": "admin",
//         "lisäysAika": "12.10.2022 klo 12.35",
//         "kommentit":[
//           {
//             "id": 1,
//             "arvosana": 4,
//             "kommentti":"Hyvä reitti!",
//             "kommentoija": "Virpi",
//             "KommentointiAika": "12.10.2022 klo 15.13"
//           }
//         ],
//         "reittityypit":[
//           {"melonta": false},
//           {"vaellus": true}
//         ]
//       }

      

// Schema.virtual("id").get(function() {
//     return this._id;
// })*/

// module.exports = mongoose.model("Reitti",reittiSchema);