const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
console.log(interface)
console.log(bytecode)
const provider = new HDWalletProvider(
  "stand drill mobile mean tent whip horror ritual truth lawn version alarm",
  "https://rinkeby.infura.io/v3/44274788c5da4c38ac096f248d577767"
);
const web3 = new Web3(provider);

const deploys = async () => {
  const accounts = await web3.eth.getAccounts();
  //   console.log(JSON.parse(interface));
  console.log("Attempting to deply from account ", accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode
    })
    .send({ gas: "2000000", from: accounts[0] });
  console.log("contract deployed to", result.options.address);
};
deploys();
