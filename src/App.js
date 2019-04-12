import React, { Component } from "react";
import logo from "./logo.svg";
import web3 from "./web3";
import lottery from "./lottery";
import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            manager: ""
        };
    }
    async componentDidMount() {
        //Don't have to specify from property with MetaMask
        const manager = await lottery.methods.manager().call();

        this.setState({
            manager
        });
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
            </div>
        );
    }
}

export default App;
