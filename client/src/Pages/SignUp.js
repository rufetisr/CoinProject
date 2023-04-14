import React, { isValidElement, useRef, useContext, useState } from 'react'
import "./SignUp.css"
import context from '../Context/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import LinktoSignPages from '../Components/LinktoSignPages';
import HorizontalLine from '../Components/HorizontalLine';
// import GoogleButton from '../Components/GoogleButton';
import jwtDecode from 'jwt-decode';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function SignUp() {
    let { user, setUser } = useContext(context);

    const [err1, seterr1] = useState();
    const [err2, seterr2] = useState();
    const [err3, seterr3] = useState();
    const [hide, setHide] = useState("password");
    const [text, setText] = useState("Show"); // password show or hide


    let ShowOrHide = (e) => {
        if (e.target.checked) {
            setHide("text");
            setText("Hide")
        }
        else {
            setHide("password");
            setText("Show")
        }
    }

    let onSubmit = (e) => {
        e.preventDefault();

        // console.log(err1 + '\n' + err2 + '\n' + err3);
        if (containsOnlySpaces(user.email) && containsOnlySpaces(user.username) &&
            containsOnlySpaces(user.password)) {
            seterr1('Required Email')
            seterr2('Required Username');
            seterr3('Required Password');
        }
        else if (containsOnlySpaces(user.email) && containsOnlySpaces(user.username)) {
            seterr1('Required Email')
            seterr2('Required Username')
        }
        else if (containsOnlySpaces(user.email) && containsOnlySpaces(user.password)) {
            seterr1('Required Email')
            seterr3('Required Password');
        }
        else if (containsOnlySpaces(user.username) && containsOnlySpaces(user.password)) {
            seterr2('Required Username');
            seterr3('Required Password');
        }
        else if (err1 == '' && err2 == '' && err3 == '') {
            console.log('Access');
            console.log(user);

            user.createAccTime = getCurrentDateTime();
            let res = axios.post('http://localhost:400/signup', {
                user
            })
            res.then(res => {
                if (res.status == 200) {
                    alert('Success added user');
                }
            }).catch((err) => {
                if (err.response.data.errno == 1062) {
                    alert("These entries were found in another user!");
                }
            })
            e.target.email.value = '';
            e.target.username.value = '';
            e.target.password.value = '';

            setUser({
                email: '',
                username: '',
                password: ''
            });

            // console.log(res.then(res => console.log(res.data)));

        }

        console.log('submit');
    }


    function containsOnlySpaces(str) {
        if (str == undefined) {
            return true;
        }
        else {
            return str.trim().length == 0;
        }
    }

    let getCurrentDateTime = () => {
        let date = new Date();
        return date.getFullYear() + "/" + (date.getMonth() + 1) + '/' + date.getDate() + " " + date.toTimeString().slice(0, 8);
    }

    function GetLenWithoutSpace(str) {
        str = str.split('');
        // console.log(str);
        str = str.filter(item => {
            if (item !== ' ') {
                return item;
            }
        });
        // console.log(str);
        return str.length;
    }

    let ChangeInput = (e) => {
        console.log('change');
        let name = e.target.name;
        let value = e.target.value.trim();
        let length = GetLenWithoutSpace(value);
        console.log(value);
        if (name == 'username') {
            if (length < 3) {
                seterr2('Min 3 character');
            }
            else if (length == 3) {
                seterr2('');
            }
            else if (containsOnlySpaces(value)) {
                seterr2('Cannot contain space!');
            }
            else if (length < 15) {
                seterr2('');
            }
            else if (length == 15) {
                seterr2('Max 15 character');

                setTimeout(() => {
                    seterr2('');
                }, 3000);
            }
        }
        else if (name == 'password') {
            if (length < 8) {
                seterr3('Min 8 character')
            }
            else if (length == 8) {
                seterr3('');
            }
            else if (containsOnlySpaces(value)) {
                seterr3('Cannot contain space!');
            }
            else if (length == 25) {
                seterr3('Max 25 character');
                setTimeout(() => {
                    seterr3('');
                }, 3000);
            }
        }
        else if (name == 'email') {
            let regPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (value.match(regPattern)) {
                seterr1('');
            }
            else {
                seterr1('Email is not valid!');
            }
        }
        setUser({
            ...user, [name]: value
        })
    }

    const SignUpSuccess = (res) => { // google send response
        // console.log(res);user.createAccTime = getCurrentDateTime();
        
        let userObj = jwtDecode(res.credential);
        console.log(userObj);
        user = {
            username: userObj.name,
            imgUrl: userObj.picture,
            login: userObj.email_verified,
            email: userObj.email,
            createAccTime: getCurrentDateTime(),
            password: "googledefault123"
        };

        axios.post('http://localhost:400/signup', {
            user
        }).then(res => {
            if (res.status == 200) {
                alert('Success added user');                
            }
        }).catch((err) => {
            if (err.response.data.errno == 1062) {
                alert("This account was found in another user!");
            }
        })
    }
    const SignUpFail = (res) => { // google send response
        console.log(res);
    }

    return (
        <GoogleOAuthProvider clientId="438501167667-non433gnud5b97kb20qpq6d46bqabi76.apps.googleusercontent.com">

            <div className='signup-div'>
                <h2>Sign Up</h2>
                <form onSubmit={onSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', columnGap: '25px', alignItems: 'baseline' }}>
                        <label className='lbl-input'>
                            Email:
                        </label>
                        <LinktoSignPages text='Already have an account?' route='/sign-in' routeContext='Log in' />
                    </div>

                    <input type='email' name='email' placeholder='Email' onChange={ChangeInput} minLength='4' maxLength='40' />
                    <div className='error' >{err1}</div>
                    <br></br>
                    <label className='lbl-input'>
                        Username:
                    </label><br></br>
                    <input type='text' name='username' placeholder='Username' onChange={ChangeInput} minLength='3' maxLength='15' />
                    <div className='error' >{err2}</div>

                    <br></br>
                    <div style={{ display: 'flex', alignItems: "baseline", justifyContent: "space-between" }}>
                        <label className='lbl-input'>
                            Password:
                        </label>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input type='checkbox' onChange={ShowOrHide} />
                            <label>{text}</label><br></br>
                        </div>
                    </div>
                    <input type={hide} name='password' placeholder='Password' onChange={ChangeInput} minLength='8' maxLength='25' /><br></br>

                    <div className='error'>{err3}</div><br></br>

                    <div className='btn-div'>
                        <button type='submit'>Sign Up</button>
                    </div><br></br>
                    <HorizontalLine /><br></br>
                    <GoogleLogin size="large"
                        onSuccess={SignUpSuccess}
                        onError={SignUpFail}
                        // auto_select='true'
                        width="295px"
                        useOneTap
                        context='signup'
                        logo_alignment="center"
                    // cancel_on_tap_outside='true'
                    />
                </form>
            </div>
        </GoogleOAuthProvider>
    )
}

export default SignUp;