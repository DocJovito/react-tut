import React from 'react'
import {Link} from 'react-router-dom'
import BannerImage from '../assets/ethBg.jpg'
import '../styles/Home.css';

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer" >
        <h1>ETHEREUM MULTIPLIER</h1>
        <p>Store your ETH and get <b>700%</b> of amount! <br></br>
          (once Smart Contract is met)</p>
        <Link to="/joinPage">
          <button>Join Now!</button>
        </Link>
      </div>
    </div>

  )
}

export default Home