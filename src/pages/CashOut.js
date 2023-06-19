import { ethers } from "ethers";
import { useState } from "react";
import ethSharing_abi from "../contracts/ethSharing_abi.json";
import '../App.css';
import BannerImage from '../assets/ethBg.jpg'

function CashOut() {

  let [account, setAccount] = useState("");
  let [userBalance, setUserBalance] = useState("");
  let [userPayOutID, setUserPayOutID] = useState("");
  let [totalNMembers, setTotalNMembers] = useState("");
  let [DoneWithdraw, setDoneWithdraw] = useState("");
  let [payStatus, setPayStatus] = useState("");
  let [ans, setAns] = useState("");
  
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


  const checkPayout = async () => {
    const payid = await contract.StakeIDOf(account);
    setUserPayOutID(payid/1);

    const TotalMembers = await contract.totalStakers();
    setTotalNMembers(TotalMembers/1);

    const withdrawStat = await contract.DoneWithdraw(account);
    setDoneWithdraw(withdrawStat/1);
    
    const myAns = 15+(8*(payid-1));
    setAns(myAns/1);
    
    if(payid>=myAns && DoneWithdraw == 0)
    {
        setPayStatus("True")        
    }
    else
    {
        setPayStatus("False")
    }
  }



  const userWithdraw = async () => {
	try {
	  const tx = await contract.userWithdraw({gasLimit: 210000 });
	  console.log(tx);
	  // Additional code to handle the transaction response or perform any necessary actions
	} catch (error) {
	  // Handle the error if the transaction fails
	  console.error(error);
	}
  }





  connectContract();
  
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
		<div className="headerContainer">
            <h1>CASH OUT</h1>
			<h2>Step 1. Connect your Metamask Wallet.</h2>
          <button onClick={connectMetamask}>CONNECT</button>
          <p>Wallet Address: {account} <br></br>
		  ETH Balance: {userBalance}<br></br>
  
          </p>

		  <h2>Step 2. Check if Smart Contract Cash Out Conditions are met</h2>
          <button onClick={checkPayout}>CHECK</button>
          <p>Payout ID: {userPayOutID}<br></br>
          Total Members: {totalNMembers}<br></br>
          Members Count to Withdraw: {ans}<br></br>
          Done Withdraw: {DoneWithdraw}<br></br>
          Pay Status: {payStatus}</p>

		<h2>Step 3. Withdraw</h2>
		  <button onClick={userWithdraw}>WITHDRAW</button>
		  
		  
		  

          </div>
    </div>
  );
}
export default CashOut;