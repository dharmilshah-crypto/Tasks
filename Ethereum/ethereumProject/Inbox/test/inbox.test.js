const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3') 
const web3 = new Web3(ganache.provider())
const {interface,bytecode} = require('../compile')

let accounts
let inbox
beforeEach(async ()=>{
    //get a list of all accounts
        //  web3.eth.getAccounts().then(a=>{
        //      console.log(a)
        //  })

        const accounts = await  web3.eth.getAccounts()
        console.log(accounts)

       inbox = await  new web3.eth.Contract(JSON.parse(interface))
        .deploy({data : bytecode, arguments : ['hi there']})
        .send({from : accounts[0],gas : '1000000'})
         
         })

describe('Inbox',()=>{
    it('list of accs',()=>{
console.log(inbox)
    })
})