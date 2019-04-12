import React, { Component } from "react";
import logo from "./logo.svg";
import web3 from "./web3";
import lottery from "./lottery";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manager: "",
            players: [],
            balance: "",
            value: "",
            message: ""
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    async componentDidMount() {
        //Don't have to specify from property with MetaMask inside call
        const manager = await lottery.methods.manager().call();
        const players = await lottery.methods.getPlayers().call();
        const balance = await web3.eth.getBalance(lottery.options.address);

        this.setState({
            manager,
            players,
            balance
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        try {
            //Grab all the accounts from metamask
            const accounts = await web3.eth.getAccounts();

            this.setState({ message: "Waiting on transaction success..." });

            //Send transaction to enter method with desired account
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });

            this.setState({ message: "You have been entered!" });
        } catch (e) {
            console.log(e);
        }
    }

    async onClick() {
        try {
            //Grab all the accounts from metamask
            const accounts = await web3.eth.getAccounts();

            this.setState({ message: "Choosing a winner..." });

            //Send transaction to enter method with desired account
            await lottery.methods.pickWinner().send({
                from: accounts[0]
            });

            this.setState({ message: "A winner has been picked!" });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        window.addEventListener("load", async () => {
            // Modern dapp browsers...
            if (window.ethereum) {
                try {
                    // Request account access if needed
                    await window.ethereum.enable();

                    console.log(window.ethereum.selectedAddress);
                    web3.eth.getAccounts().then(console.log);
                    // Acccounts now exposed
                } catch (error) {
                    // User denied account access...
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                // Acccounts always exposed
            }
            // Non-dapp browsers...
            else {
                console.log(
                    "Non-Ethereum browser detected. You should consider trying MetaMask!"
                );
            }
        });
        return (
            <div className="App">
                <h2>Lottery Contract</h2>
                <p>This contract is managed by {this.state.manager}</p>
                <p>
                    There are currently {this.state.players.length} people
                    entered, competing to win{" "}
                    {web3.utils.fromWei(this.state.balance, "ether")} ether.
                </p>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <h4>Want to try your luck?</h4>
                    <div>
                        <label>Amount of ether to enter</label>{" "}
                        <input
                            onChange={event =>
                                this.setState({ value: event.target.value })
                            }
                            value={this.state.value}
                        />
                    </div>
                    <button>Enter</button>
                </form>
                <hr />
                <h4>Ready to pick a winner?</h4>
                <button onClick={this.onClick}>Pick Winner</button>
                <hr />
                <h5>{this.state.message}</h5>
            </div>
        );
    }
}

export default App;
