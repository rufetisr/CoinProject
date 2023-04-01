import React, { useContext, useState } from "react";
import context from "../Context/Context";
import "./SignIn.css";
import axios from "axios";

let SignIn = () => {

    let { user, setUser } = useContext(context);

    const [err1, seterr1] = useState();
    const [err2, seterr2] = useState();
    // const [userLog, setUserLog] = useState({

    // }); // for sign in
    // const [err3, seterr3] = useState();

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
              //  if (res.status == 200) {
                    alert("Success signed")
              //  }                                
            }).catch(err=>{
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

    function isEmail(str) {
        return str.includes("@");
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
    return (
        <div className="signin-div">
            <h2>SignIn</h2>
            <form onSubmit={Submit}>
                <label>
                    Email or Username:
                </label><br></br>
                <input type='text' name='emailorname' placeholder='Email or Username' minLength='3' maxLength='40' onChange={ChangeInput} />
                <div className="error">{err1}</div>
                <br></br>
                {/* <label>
                    Username:
                </label><br></br>
                <input type='text' name='username' placeholder='Username' onChange={ChangeInput} minLength='3' maxLength='15' />
                <div className='error' >{err2}</div>

                <br></br> */}
                <label>
                    Password:
                </label><br></br>
                <input type='password' name='logpassword' placeholder='Password' minLength='8' maxLength='25' onChange={ChangeInput} /><br></br>
                <div className="error">{err2}</div><br></br>

                <div className='btn-div'>
                    <button type='submit'>Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;