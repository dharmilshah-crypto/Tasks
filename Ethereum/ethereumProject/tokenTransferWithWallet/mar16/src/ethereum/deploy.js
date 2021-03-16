// const HDWalletProvider = require("truffle-hdwallet-provider");
// // import HDWalletProvider from "truffle-hdwallet-provider";
// const Web3 = require("web3");
// // import Web3 from "web3";
// // import { interface as interfaces, bytecode } from "./compile";
// const { interface, bytecode } = require("./compile");
// const provider = new HDWalletProvider(
//   "stand drill mobile mean tent whip horror ritual truth lawn version alarm",
//   "https://rinkeby.infura.io/v3/44274788c5da4c38ac096f248d577767"
// );
// const web3 = new Web3(provider);
// let result;
// deploys = async () => {
//   const accounts = await web3.eth.getAccounts();

//   result = await new web3.eth.Contract(JSON.parse(interface))
//     .deploy({
//       data: bytecode,
//     })
//     .send({ gas: "2000000", from: accounts[0] });
//   console.log("contract deployed to", result.options.address);
// };
// deploys();

// experimenting

const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
// const { interface, bytecode } = require("./compile");
const dtoken = require("./build/dtoken.json");

const provider = new HDWalletProvider(
  "stand drill mobile mean tent whip horror ritual truth lawn version alarm",
  "https://rinkeby.infura.io/v3/44274788c5da4c38ac096f248d577767"
);
const web3 = new Web3(provider);
let contractAddress;
let result;
let contractOwnerAccount;
const deploys = async () => {
  const accounts = await web3.eth.getAccounts();
  //   console.log(JSON.parse(interface));
  contractOwnerAccount = accounts[0];
  console.log("Attempting to deply from account ", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(dtoken.interface))
    .deploy({
      data: dtoken.bytecode,
    })
    .send({ gas: "2000000", from: accounts[0] });
  // console.log(interface)

  // result = await Result;
  // console.log("1", result);
  console.log("contract deployed to", result.options.address);
  contractAddress = result.options.address;
  module.exports = { contractAddress, result, contractOwnerAccount };
  const balance = await result.methods
    .balanceOf("0x6c85F36AC64463a517379aBF377288E2Ef94Fb0F")
    .call();
  console.log(balance);
};

deploys();
