const fs = require("fs");
//synchronous
// let textin = fs.readFileSync("1.txt", 'utf-8');
// console.log(textin);
// let textout = `this is what we know :${textin}.\n Created on ${Date.now()}`;
// fs.writeFileSync("2.txt", textout);
// console.log("updated");

//Asynchronous
// 
const http = require("http");
http.createServer((req, res) => {
    res.end("hello from the server");
}).listen(3000, () => {
    console.log("starting server");
});