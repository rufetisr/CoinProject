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
                        <Link to='sign-up'>Sign Up</Link>
                    </li>
                    <li>
                        <Link to='sign-in'>Sign in</Link>
                    </li>
                </ul>
            </nav>
        </header>
  )
}

export default Header;