import logo from './logo.svg';
import React ,{Component} from 'react';
import './App.css';
import web3 from './web3'
import lottery from './lottery'


class App extends Component {
  
  state = {
    manager : '',
    players : [],
    balance : '',
    value : '',
    message : ''
  }
  // web3.eth.getAccounts().then(console.log)  
   async componentDidMount() {
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()  
    const balance = await web3.eth.getBalance(lottery.options.address);  
    console.log(players.length)
    this.setState({manager,players,balance})

  }
  onSubmit = async (event) => {
   event.preventDefault()
   const accounts = await web3.eth.getAccounts()

   this.setState({message : 'Processing your transaction ....'})
   await lottery.methods.enter().send({
     from : accounts[0],
     value : web3.utils.toWei(this.state.value,'ether')
   })
this.setState({message : 'Transaction completed , you have been entered successfully in the lucky draw'})
}

  onClick = async ()=>{
    const accounts = await web3.eth.getAccounts()
    this.setState({message : 'Processing your transaction ....'})
    await lottery.methods.pickWinner().send({
from : accounts[0]
    })
    this.setState({message : 'Transaction completed , Winner picked'})
  }
  render(){
  return (
   <div>
     <h2>Lottery Contract</h2>
     <p> This Contract is managed by {this.state.manager} <br></br><br></br>
     There are currently {this.state.players.length} competitors competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether !
     </p>

     <hr>
     </hr>

     <form onSubmit={this.onSubmit} > 
       <h4>Want to try your luck?</h4>
       <div>
         <label>
           Amount of ether you want to stake
         </label>&nbsp;&nbsp;&nbsp;
         <input value={this.state.value}  onChange={event=>{this.setState({value : event.target.value})}}></input>
         &nbsp;&nbsp;&nbsp;&nbsp;<button>Enter the lucky draw</button>
       </div>
     </form>
     <hr></hr>
     <h4>Ready to pick a winner??</h4>
     <button onClick={this.onClick}>Pick a winner</button>
     <hr></hr>
     <h1>{this.state.message}</h1>
   </div>  );
}
}
export default App;
