const { Console } = require('console')
const express = require('express')
const app = express()
const fs = require('fs')
const mongo  = require('mongoose')
const xlsx = require('node-xlsx')
const excel = require('./model')
const xls = require('excel')
let arr = []


 const outbound = xlsx.parse('./Outbound.xlsx')
//  console.log(outbound);
// fs.writeFileSync('test.json',outbound)
// const data = fs.readFileSync('test.json','utf-8')

// xls('Outbound.xlsx', function(err, data) {
//   if(err) throw err;
//     // data is an array of arrays
// });

function convertToJSON(array)
 {
  // console.log(array[0].data[0])
  
  const x1 = [...array[0].data[0]];
   let len = [...array[0].data]
   console.log(len.length);
  
    let x2 = [...array[0].data[5]];
    console.log(x2)
    
   let obj ={}

  
// for(let a=0;a<x1.length;a++){


  
//     obj[x1[a]] = [x2[a]]
      
      
  

// arr.push(obj)

//  }
// console.log(arr);

  }
  // const x2 = array[0].data[1];
  
  // console.log(obj);
  // var first = array[0].join();
  // console.log(array);
  // var headers = first.split(',');

  // var jsonData = [];
  // for ( var i = 1, length = array.length; i < length; i++ )
  // {

  //   var myRow = array[i].join();
  //   var row = myRow.split(',');

  //   var data = {};
  //   for ( var x = 0; x < row.length; x++ )
  //   {
  //     data[headers[x]] = row[x];
  //   }
  //   jsonData.push(data);

  // }
  // return jsonData;
 convertToJSON(outbound)
// console.log(data);
// xlsx('tasks.xlsx', function(err,data) {
//   if(err) throw err;
//   //console.log(jsonDataArray(data));
//   console.log(JSON.stringify(convertToJSON(data)));
//   //console.log(data);
// });


 
// const insert = async ()=>{
//     try{
//     await excel.create(outbound.data);
//     console.log("added successfully")
//     }
//     catch(err){ 
//       console.log(err.message)
//     }
  // console.log('uploaded successfully')
    
   


// console.log(data)
// mongo.connect('mongodb+srv://User:User2304-@cluster0.n0ujr.mongodb.net/tasksdb?retryWrites=true&w=majority',{
//   useNewUrlParser:true,
//   useUnifiedTopology: true,
// }).then(()=>{
//   console.log("successful connection to database");
//  insert();
// }).catch(err=>{
//   console.log("error occured while connecting to database");
// })