const eventEmitter = require("events");
const myEmitter = new eventEmitter();
const http = require("http");

myEmitter.on('newSale', () => {
    console.log("new sale");
})
myEmitter.on('Sale', y => {
    console.log("yeahhh" + y);
})
myEmitter.emit('Sale', 9);
myEmitter.emit('newSale');




const server = http.createServer();
server.on('request', (req, res) => {
    console.log('Request recieved');
    res.end("recieved");
});

server.on('request', (req, res) => {
    console.log('Request 2 recieved');

});

server.on('close', (req, res) => {
    console.log('server closed');
    res.end("server closed");
});
server.listen(3000, () => {
    console.log('waiting for request');
});


