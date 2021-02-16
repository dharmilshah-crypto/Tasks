const mongo = require('mongoose')
const excelSchema = new mongo.Schema({
    date : {
        type : Date,
        
    },
    mode : {
        type : String,
        
    },

location : {type : String,
   },

customer : {type : String,
     },

productCode :{type : String,
   },

source : {type : String,
    },

railcar : {type : String,
    },

fleet : {type : String,
    },

subFleet : {type : String,
    },

railcarSeals : {
    type : [Number],
    
},
bol : {type : String,},
terminal : {type : String,},
city : {type : String,},
state :{type : String,},
weight :{type : Number,},
temprature : {type : Number,},
density : {type : Number,},
swRatio : {type : Number,},
swBBL: {type : Number},
netOilBBL:{type : Number,},
totalVolBBL : {type : Number,},
swMM3: {type : Number},
netOilMM3:{type : Number,},
totalVolMM3 : {type : Number,},
bolDate :{type : Date,},
heelVolume : {type : Number,},
heelWeight : {type : Number,},
contractId : {type : String,}
})
const excel = new mongo.model('Task1',excelSchema)

module.exports = excel