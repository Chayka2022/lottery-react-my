import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

class App extends React.Component {
  
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.GetPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts  = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success..'})

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered!'})
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    
    this.setState({ message: 'Waiting on transaction success..' });
    
    await lottery.methods.pickwinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' });
  };
  
  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
          <p>
            This contract is managed by {this.state.manager} 
             There are currently {this.state.players.length} people entered competeting to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
          </p>
          <hr />

          <form onSubmit={this.onSubmit}>
            <h4>Want to try your luck?</h4>
            <div>
              <label>Amount of ether to enter</label>
              <input
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value})} 
              /> 
            </div>
            <button type="submit">Enter</button>
          </form>
          
          <hr/>
          <h4>
            Ready to pick a winner?
          </h4>
          <button onClick={this.onClick}>Pick a winner!</button>
          <hr/>
          <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
// function App() {
  
//   const [manager, setManager] = useState('');

//   useEffect(() => {
//     const getManager = async () => {
//       setManager(await lottery.methods.manager().call());
//     };

//     getManager();
//   }, []);

  // constructor(props) {
  //   super(props);

  //   this.state = {manager: ''};
  // }

  // componentDidMMount() {
  //   const manager = await lottery.methods.manager().call();

  //   this.setState({manager})
  // }

  //web3.eth.getAccounts().then(console.log);

  // return (
  //   <div className="App">
  //     <h2>Lottery Contract</h2>
  //     <p>This contract is managed by {this.state.manager}</p>
  //   </div>
  // );
//}

//export default App;
