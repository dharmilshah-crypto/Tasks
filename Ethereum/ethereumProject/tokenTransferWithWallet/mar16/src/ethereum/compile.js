// const path = require("path");
// // import path from "path";
// const fs = require("fs");
// // import fs from "fs";
// const solc = require("solc");
// // import solc from "solc";
// const inboxPath = path.resolve(__dirname, "contracts", "DTOKEN.sol");
// const source = fs.readFileSync(inboxPath, "utf-8");
// module.exports = solc.compile(source, 1).contracts[":dtoken"];

//experimenting

const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const DTOKENPath = path.resolve(__dirname, "contracts", "DTOKEN.sol");
const source = fs.readFileSync(DTOKENPath, "utf-8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
