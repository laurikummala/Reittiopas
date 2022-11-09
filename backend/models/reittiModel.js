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
  },
  {
    timestamps:true,
  }
)

module.exports = mongoose.model('Reitti', reittiSchema)



/*{
        "id": 1,
        "nimi": "Isokangas",
        "pituus": 5,
        "kuvaus": "Neulaspolku harjun laella. Hiekkatiet katkaisevat polun useasta kohtaa, joten polkupyöräilijöiden varottava",
        "reittiKartalla": "Isokangas.img",
        "lisääjä": "admin",
        "lisäysAika": "12.10.2022 klo 12.35",
        "kommentit":[
          {
            "id": 1,
            "arvosana": 4,
            "kommentti":"Hyvä reitti!",
            "kommentoija": "Virpi",
            "KommentointiAika": "12.10.2022 klo 15.13"
          }
        ],
        "reittityypit":[
          {"melonta": false},
          {"vaellus": true}
        ]
      }

      

Schema.virtual("id").get(function() {
    return this._id;
})*/
    
    
