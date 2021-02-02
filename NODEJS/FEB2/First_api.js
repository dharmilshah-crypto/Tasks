const fs = require("fs");
const http = require("http");
const url = require('url');
const tempOverview = fs.readFileSync("./final/templates/template-overview.html", "utf-8");
const tempCard = fs.readFileSync("./final/templates/template-card.html", "utf-8");
const tempProduct = fs.readFileSync("./final/templates/template-product.html", "utf-8");
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
}
const data = fs.readFileSync("./final/dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {

    const { query, pathName } = url.parse(req.url, true);
    // const pathName = req.url;
    console.log(query)
    console.log(pathName)
    console.log(req.url);
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        const cardsHTML = dataObj.map(el => {
            replaceTemplate(tempCard, el);
        })
        console.log(cardsHTML);
        res.end(tempOverview);
    }
    else if (pathName === '/product')
        res.end(tempProduct);

    else if (pathName === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json'
        });

        res.end(data);
    }


    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found hahaha</h1>');
    }

}).listen(3000);
