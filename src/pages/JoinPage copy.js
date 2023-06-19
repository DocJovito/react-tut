import { ethers } from "ethers";
import { useState } from "react";
import ethSharing_abi from "../contracts/ethSharing_abi.json";
import '../App.css';
import BannerImage from '../assets/ethBg.jpg'

function JoinPage() {
  

  let [account, setAccount] = useState("");
  let [contractData, setContractData] = useState("");
  let [userBalance, setUserBalance] = useState("");
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
    const Address = "0x326ea49bc9A9D0D4F96941652834Ca09e62E91e1";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(Address, ethSharing_abi, signer);
    console.log(contract.address);
  }


  const getData = async () => {
    const phrase = await contract.myFlower();
    setContractData(phrase)
  }

  //jovy
  const depositEth = async () => {
	try {
	  const value = ethers.utils.parseEther("0.01234"); // Convert ETH value to Wei
	  const tx = await contract.deposit({ value, gasLimit: 200000 });
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
          <button onClick={connectMetamask}>CONNECT TO METAMASK</button>
          <p>Wallet Address: {account}</p>
		  <p>ETH Balance: {userBalance}</p>

          <button onClick={depositEth}>JOIN (DEPOSIT 0.01234 ETH)</button> <br /> <br />
		  <button onClick={totalEth}>GET TOTAL BALANCE OF CONTRACT</button>
		  <p>{totalBalance}</p>

          </div>
    </div>
  );
}
export default JoinPage;