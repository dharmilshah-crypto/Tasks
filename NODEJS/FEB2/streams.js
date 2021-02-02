const fs = require('fs');

const server = require('http').createServer();

server.on('request', (req, res) => {
    //     // fs.readFile('text-file.txt', (err, data) => {
    //     //     if (err) console.log(err);
    //     //     res.end(data);
    //     // })

    //     const readable = fs.createReadStream('text-file.txt');
    //     readable.on('data', chunk => {
    //         res.write(chunk);
    //     })
    //     readable.on('end', () => {
    //         res.end();
    //     })
    //     readable.on('error', (err) => {
    //         console.log(err);
    //         res.statusCode = 500;
    //         res.end("file not found");
    //     })
    // })




    const readable = fs.createReadStream('text-file.txt');
    readable.pipe(res);

});
server.listen((3000), () => {
    console.log("listening");
});
