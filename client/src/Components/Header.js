import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
import context from '../Context/Context';
import defpicture from '../../src/Pictures/defprofile.png'

// import { Link } from 'react-router-dom';

const Header = () => {
    const { user } = useContext(context);

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {/* <li>
                        About us
                    </li> */}
                    <li>
                        <Link to='sign-up'>Sign Up</Link>
                    </li>
                    <li>
                        <Link to='sign-in'>
                            {
                                user.login || user.adminlogin ?
                                    <div style={{display: 'flex', alignItems: "center", width: "90px"}}>
                                        <p style={{marginRight: "-25px"}}>
                                            {user.name.split(" ")[0].charAt(0).toUpperCase() + user.name.split(" ")[0].slice(1)}
                                        </p>
                                        <img style={{width: 'min-content', height: "30px",padding: "0px", borderRadius: "50%"}} src={user.imgUrl != 'undefined' && useContext.imgUrl != null ? user.imgUrl : defpicture} alt='prof'></img>
                                    </div>
                                    :
                                    <span>Sign in</span>
                            }
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;