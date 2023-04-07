import React, { useContext } from 'react'
import context from '../Context/Context';
import jwtDecode from 'jwt-decode';
import { GoogleLogin } from "@react-oauth/google"


const GoogleButton = ({text}) => {
    const {user, setUser} = useContext(context);

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
        <GoogleLogin size="large"
            onSuccess={LoginSuccess}
            onError={LoginFail}
            // auto_select='true'
            width="295px"
            useOneTap
            context={text}
            logo_alignment="center"
        // cancel_on_tap_outside='true'
        />
    )
}

export default GoogleButton;