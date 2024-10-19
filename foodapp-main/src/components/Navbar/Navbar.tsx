import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import { BsCart3 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { PostData } from '../../data';

const Navbar = () => {

  const login = useSelector((state: any) => state.login);
 const email = login.userData ? login.userData.email : '';
  const [i, setI] = useState('');
  const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

  const getLetter = () => {
    const firstLetter = email?.charAt(0);
    setI(firstLetter);
  }

  const locationPath = useLocation().pathname;

  const cart: PostData[] = useSelector((state: {cart: PostData[]}) => state.cart);

  // console.log(login.isLoggedIn);
  // console.log(login.userData.email);

  useEffect(() => {
    if (email) {
      getLetter();
    }
  }, [email]);

  window.addEventListener('scroll', toggleVisible);

  return (
    <div className='navbar_container'>
      <nav className={`${visible && locationPath == '/' ? 'navbar_s' : 'navbar'}`}>
        <div className='navbar_div'>
        <Link to='/'>
          <span className={`${!visible && locationPath == '/' ? "text-white" : "header_left"}`} id="header_left" >HungryHub</span>
        </Link>
        <div className="header_right">
          <Link to='/menu'>
            <span className={`${!visible && locationPath == '/' ? "text-white" : "header_left"} text-md font-medium`}>Menu</span>
          </Link>
          <Link to='/contact'>
            <span className={`${!visible && locationPath == '/' ? "text-white" : "header_left"} text-md font-medium`}>Contact</span>
          </Link>
          <Link to="/cart">
            <div className='relative1'>
              <BsCart3 className={`${!visible && locationPath == '/' ? "text-white" : "header_left"} text-2xl cart_icon`} />
             {cart.length > 0 && (
  <span className='custom-span'>
    {cart.length}
  </span>
)}

            </div>
          </Link>
          {login.isLoggedIn && <Link to='/info'><div className="usericon">
            {i === '' ? <p className="username">0</p> :
              <p className="username">{i}</p>
            }
          </div></Link>}
        </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
