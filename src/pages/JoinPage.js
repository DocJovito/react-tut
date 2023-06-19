import { ethers } from "ethers";
import { useState } from "react";
import ethSharing_abi from "../contracts/ethSharing_abi.json";
import '../App.css';
import BannerImage from '../assets/ethBg.jpg'

function JoinPage() {
  

  let [account, setAccount] = useState("");
  let [userBalance, setUserBalance] = useState("");
  let [userPayOutID, setUserPayOutID] = useState("");

  
  let [totalBalance, setTotalBalance] = useState("");
  

  const { ethereum } = window;
  const connectMetamask = async () => {
		
	  if(window.ethereum !== "undefined") {
      const accounts = await ethereum.request({ method: "eth_requestAccounts"});
	  
      setAccount(accounts[0]);
	  getAccountBalance(accounts[0]);
    }
  }

  const getAccountBalance = (account) => {
	window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
	.then(balance => {
		setUserBalance(ethers.utils.formatEther(balance));
	})
};

  let contract;
  const connectContract = async () => {
    const Address = "0x65d6326BDC8291F325e516bBA0C898799dA18B81";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(Address, ethSharing_abi, signer);
    console.log(contract.address);
  }

  const depositEth = async () => {
	try {
	  const value = ethers.utils.parseEther("0.01234"); // Convert ETH value to Wei
	  const tx = await contract.deposit({ value, gasLimit: 210000 });
	  console.log(tx);
	  // Additional code to handle the transaction response or perform any necessary actions
	} catch (error) {
	  // Handle the error if the transaction fails
	  console.error(error);
	}
  }

  const totalEth = async () => {
    const amount = await contract.getBalance();
    setTotalBalance (amount / 10**18);
  }

  const payOutID = async () => {
    const payid = await contract.StakeIDOf(account);
    setUserPayOutID(payid/1)
  }

/*
//sample readdata
  const getData = async () => {
    const phrase = await contract.myFlower();
    setContractData(phrase)
  }


//sample changedata
  const changeData = async () => {
    const txResponse = await contract.changeWord();
    const txReceipt = await txResponse.wait();
    console.log(txReceipt)
  }

*/

  connectContract();
  
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
		<div className="headerContainer">
      <h1>JOIN</h1>
			<h2>Step 1. Connect your Metamask Wallet.</h2>
          <button onClick={connectMetamask}>CONNECT</button>
          <p>Wallet Address: {account} <br></br>
		  ETH Balance: {userBalance}</p>

		  <h2>Step 2. Deposit 0.01234 ETH to the Smart Contract.</h2>
          <button onClick={depositEth}>JOIN</button>
		<p>You need extra ETH for GAS FEE	<br></br>
    Note:Do not join again unless you alreay withdraw your previous deposit <br></br>
    (Anti Whale Spam)
    </p>

		<h2>Step 3. Check your payout ID and Wait</h2>
		  <button onClick={payOutID}>MY PAYOUT ID</button>
		  <p>Payout ID: {userPayOutID}</p>

		  {/*
			<button onClick={totalEth}>GET TOTAL BALANCE OF CONTRACT</button>
		  	<p>{totalBalance}</p>
  			*/}
		  
		  

          </div>
    </div>
  );
}
export default JoinPage;