import React, { useContext, useEffect, useState } from "react";
import context from "../Context/Context";
import "./SignIn.css";
import UserProfile from '../Pages/UserProfile';
import axios from "axios";
// import jwt_decode from 'jwt-decode'
import jwtDecode from "jwt-decode";
// import {GoogleLogin} from 'react-google-login'
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import defpicture from '../../src/Pictures/defprofile.png'
import LinktoSignPages from "../Components/LinktoSignPages";
import HorizontalLine from "../Components/HorizontalLine";

let SignIn = () => {

    let { user, setUser } = useContext(context);

    const [err1, seterr1] = useState();
    const [err2, seterr2] = useState();
    // const [userLog, setUserLog] = useState({

    // }); // for sign in
    // const [err3, seterr3] = useState();

    // function handleCallbackResponse(response) {
    //     console.log(response);
    //     var userObj = jwtDecode(response.credential);
    //     console.log(userObj);
    //     // console.log(userObj.email_verified);
    //     // user.imgUrl = userObj.picture;
    //     // user.name = userObj.name;
    //     setUser({
    //         name: userObj.name,
    //         imgUrl: userObj.picture,
    //         login: userObj.email_verified,
    //         signedEmail: userObj.email,
    //     })
    // }

    useEffect(() => {
        console.log('signin useeffect');
        /*global google*/
        // google.accounts.id.initialize({
        //     client_id: "438501167667-non433gnud5b97kb20qpq6d46bqabi76.apps.googleusercontent.com",
        //     callback: handleCallbackResponse
        // })

        // google.accounts.id.renderButton(
        //     document.getElementById("signinDiv"),
        //     { theme: "outline", size: "large" }
        // );

        // google.accounts.id.prompt();

    }, []);

    const ChangeInput = (e) => {
        let { name, value } = e.target;
        value = value.trim();
        let length = GetLenWithoutSpace(value);
        console.log(name, "\n", value);

        if (name == "emailorname") {

            if (length < 3) {
                seterr1('Min 3 character');
            }
            else if (length == 3) {
                seterr1('');
            }
            else if (containsOnlySpaces(value)) {
                seterr1('Cannot contain space!');
            }
            else if (length < 40) {
                seterr1('');
            }
            else if (length == 40) {
                seterr1('Max 40 character');

                setTimeout(() => {
                    seterr1('');
                }, 3000);
            }
        }

        else if (name == 'logpassword') {
            if (length < 8) {
                seterr2('Min 8 character')
            }
            else if (length == 8) {
                seterr2('');
            }
            else if (containsOnlySpaces(value)) {
                seterr2('Cannot contain space!');
            }
            else if (length == 25) {
                seterr2('Max 25 character');
                setTimeout(() => {
                    seterr2('');
                }, 3000);
            }
        }

        setUser({
            ...user, [name]: value
        })
    }

    const Submit = (e) => {
        e.preventDefault();
        // console.log('submit');
        if (containsOnlySpaces(user.emailorname) && containsOnlySpaces(user.logpassword)) {
            seterr1('Required Email or Username')
            seterr2('Required Password');
        }
        else if (containsOnlySpaces(user.logpassword)) {
            seterr2('Required Password');
        }
        else if (containsOnlySpaces(user.emailorname)) {
            seterr1('Required Email or Username')
        }
        else if (err1 == '' && err2 == '') {
            console.log(user);
            axios.post("http://localhost:400/login", {
                name: user.emailorname,
                password: user.logpassword
            }).then(res => {
                // console.log(res.data);
                if (res.status == 200) {
                    alert("Success signed")
                    setUser({
                        name: res.data.Username,
                        signedEmail: res.data.Email,
                        login: true,
                        imgUrl: ''
                    })

                }
            }).catch(err => {
                alert(err.response.data);
            })

            e.target.emailorname.value = '';
            e.target.logpassword.value = '';


            user = {
                emailorname: "",
                logpassword: ""
            }
        }
    }

    function containsOnlySpaces(str) {
        return str?.trim().length == 0;
    }

    // function isEmail(str) {
    //     return str.includes("@");
    // }
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

    const LoginSuccess = (res) => { // google send response
        // console.log(res);
        let userObj = jwtDecode(res.credential);
        console.log(userObj);
        setUser({
            name: userObj.name,
            imgUrl: userObj.picture,
            login: userObj.email_verified,
            signedEmail: userObj.email,
        })
    }
    const LoginFail = (res) => { // google send response
        console.log(res);
    }


    return (
        <GoogleOAuthProvider clientId="438501167667-non433gnud5b97kb20qpq6d46bqabi76.apps.googleusercontent.com">
            <div className="signin-div">
                {
                    user.login ?
                        <UserProfile />
                        :
                        <>
                            <h2>SignIn</h2>
                            <form onSubmit={Submit}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', columnGap: '25px', alignItems: 'baseline' }}>
                                    <label className='lbl-input'>
                                        Email or Username:
                                    </label>
                                    <LinktoSignPages text='Need an account?' route='/sign-up' routeContext='Sign up' />
                                </div>
                                <input type='text' name='emailorname' placeholder='Email or Username' minLength='3' maxLength='40' onChange={ChangeInput} />
                                <div className="error">{err1}</div>
                                <br></br>

                                <label className='lbl-input'>
                                    Password:
                                </label><br></br>
                                <input type='password' name='logpassword' placeholder='Password' minLength='8' maxLength='25' onChange={ChangeInput} /><br></br>
                                <div className="error">{err2}</div><br></br>

                                <div className='btn-div'>
                                    <button type='submit'>Sign In</button>
                                </div><br />

                                <HorizontalLine/>
                                <br></br>
                                <GoogleLogin size="large"
                                    onSuccess={LoginSuccess}
                                    onError={LoginFail}
                                    // auto_select='true'
                                    width="295px"
                                    useOneTap
                                    context="Sign in"
                                    logo_alignment="center"
                                // cancel_on_tap_outside='true'
                                />
                            </form>
                        </>
                }
            </div>
        </GoogleOAuthProvider>
    )
}

export default SignIn;