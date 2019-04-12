import Web3 from "web3";

//Creates instance of web3 and passes provider from MetaMask library
const web3 = new Web3(window.ethereum);

export default web3;
