const fs = require("fs");
// const { fileURLToPath } = require("url");
const crypto = require('crypto');
const date = Date.now();
process.env.UV_THREADPOOL_SIZE = 1;


setTimeout(() => console.log("timer 1 finish"), 0);
setImmediate(() => { console.log("immediate 1 completed") });

fs.readFile('text-file.txt', () => {
    setTimeout(() => console.log("timer 2 finish"), 0);
    setTimeout(() => console.log("timer 4 finish"), 5000);
    setTimeout(() => console.log("timer 3 finish"), 3000);
    setImmediate(() => { console.log("immediate 2 completed") });
    console.log("fs finished");
    process.nextTick(() => {
        console.log('next tick 1');
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
            console.log(Date.now() - date, "crypto finished");
        });
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
            console.log(Date.now() - date, "crypto finished");
        });
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
            console.log(Date.now() - date, "crypto finished");
        });
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
            console.log(Date.now() - date, "crypto finished");
        });
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
            console.log(Date.now() - date, "crypto finished");
        });
        crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
            console.log(Date.now() - date, "crypto finished");
        });


    })
})
console.log("hello from top");