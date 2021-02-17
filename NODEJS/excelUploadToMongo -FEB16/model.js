const mongo = require('mongoose')
const excelSchema = new mongo.Schema({
    "date" : {
        type : Date
        
    },
    "mode" : {
        type : String
        
    },

    "location"  : {type : String
   },

   "customer": {type : String
     },

"product code" :{type : String
   },

   "source" : {type : String
    },

    "railcar" : {type : String
    },
    "railcar seals" : {type : [String]},

"fleet" : {type : String
    },

    "subfleet" : {type : String
    },

"bol" : {type : String},
"terminal/ destination" : {type : String},
"city" : {type : String},
"state" :{type : String},
"weight\n(kg)" :{type : Number},
"temperature\n(c)" : {type : Number},
"density\n(kg/m3 @ 15c)" : {type : Number},
"s&w %" : {type : Number},
"s&w\n(bbl @ 15c)": {type : Number},
"net oil\n(bbl @ 15c)":{type : Number},
"total vol\n(bbl @ 15c)" : {type : Number},
"bol date": {type : Number},
"net oil\n(m3 @ 15c)":{type : Number},
"total vol\n(m3 @ 15c)" : {type : Number},
"bol date" :{type : Date},
"heel volume\n(m3 @ 15c)" : {type : Number},
"heel weight\n(kg)" : {type : Number},
"contract id" : {type : String},
"s&w\n(m3 @ 15c)": {type : Number},
"net oil\n(m3 @ 15c)":{type : Number},
"total vol\n(m3 @ 15c)":{type : Number}
})
const excel =  mongo.model('d',excelSchema)
console.log(excelSchema.path);
module.exports = excel