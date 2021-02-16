const { Console } = require('console')
const express = require('express')
const app = express()
const fs = require('fs')
const { mongo } = require('mongoose')
const xlsx = require('node-xlsx')
const excel = require('./model')

const outbound = xlsx.parse('./Outbound.xlsx')
console.log(typeof(outbound));
fs.writeFileSync('./test.json',JSON.stringify(outbound ))
const data = fs.readFileSync('test.txt','utf-8')

const insert = async ()=>{
    
    await excel.create(JSON.parse(data))
   console.log('uploaded successfully')
    
   
}

// console.log(data)
mongo.connect('mongodb+srv://User:User2304-@cluster0.n0ujr.mongodb.net/Task1?retryWrites=true&w=majority',{
  useNewUrlParser:true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log("successful connection to database");
 insert();
}).catch(err=>{
  console.log("error occured while connecting to database");
})