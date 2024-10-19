import React from 'react'
import './Footer.css'
import { FaSquareFacebook, FaInstagram,FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div>
        <div className="footer-main">
        <div className="footer-main-container">
            <div className="footer-left"><h2>HungryHub</h2></div>
            
            <div className="footer-center">
                <div className="footer-center-row">
                    <ol className="list">
                        <h4 className="footer-heading">Company</h4>
                        <li>Contact us</li>
                        <li>About</li>
                        <li>Partners</li>
                    </ol>
                </div>
                <div className="footer-center-row">
                    <ol className="list">
                        <h4 className="footer-heading">About</h4>
                        <li>Hotels</li>
                        <li>My Order</li>
                        <li>Payment</li>
                        <li>Instalment</li>
                    </ol>
                </div>
                <div className="footer-center-row-tree">
                    <ol className="list">
                        <h4 className="footer-heading">Support</h4>
                        <li>Help Center</li>
                        <li>Privacy Policy</li>
                        <li>FAQ</li>
                        <li>Terms and Conditions</li>
                    </ol>
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-right-first">Follow Social Media</div>
                <div className="footer-right-second">
                    <FaInstagram className="icon" />
                    <FaTwitter className="icon" />
                    <FaSquareFacebook className="icon" />
                </div>
                <div className="footer-right-third">
                    <h4>Download Aplikasi TIX ID</h4>
                </div>
                <div className="footer-right-four">
                    <img src="https://github.com/dharmik2003/poster_movie/blob/main/Footer/Google%20Play.png?raw=true" />
                    <img src="https://github.com/dharmik2003/poster_movie/blob/main/Footer/App%20Store.png?raw=true" />
                </div>
                <div  className="footer-right-five">
                    2021 TIX ID - PT Nusantara Elang Sejahtera.
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Footer