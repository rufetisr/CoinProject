import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
// import { Link } from 'react-router-dom';

const Header = () => {
  return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        About us
                    </li>
                    <li>
                        Sign Up
                    </li>
                    <li>
                        Sign in
                    </li>
                </ul>
            </nav>
        </header>
  )
}

export default Header;