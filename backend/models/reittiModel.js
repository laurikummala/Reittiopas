const mongoose = require("mongoose");

let reittiSchema = mongoose.Schema({
    text: {
      type: String,
      required: [true, 'Lisää teksti']
    }
    // user:{type:String,index:true}
}, {
  timestamps: true,
});

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

module.exports = mongoose.model("Reitti",reittiSchema);