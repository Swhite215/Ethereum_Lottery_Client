import React, { Component } from "react";
import logo from "./logo.svg";
import web3 from "./web3";
import "./App.css";

class App extends Component {
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
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
