import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import '../styles/Footer.css';


function Footer() {
  return (
    <div className='footer'>
        <div className="socialMedia">
            <FacebookIcon/>
            <InstagramIcon/>
            <TwitterIcon/>
            <p> &copy; 2023 myethmultiplier.com </p>
            
        </div>
        
    </div>
  )
}

export default Footer