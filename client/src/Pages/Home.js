import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Search from "../Components/Search";
import context from "../Context/Context";
import axios from "axios";
import './Home.css'
import FileUploader from "../Components/FileUploader";

function Home() {
    let { coinTypes, setCoinTypes, user, setUser, newCoinType, setNewCoinType } = useContext(context);
    const [img, setimg] = useState("");
    // const [img1, setimg1] = useState("");


    // const [img1, setimg1] = useState("");
    // let getCoinTypes = async () => {
    // let res = axios.get('http://localhost:400/cointypes');
    // res.then(res => setCoinTypes(res.data));
    // return res;
    // }
    useEffect(() => {
        console.log('home useffect');
        // getCoinTypes();

    }, []);

    let AddCoinType = (e) => {
        e.preventDefault();
        // var [img1, setimg1] = useState("");
        console.log(e.target);

        // setUser({
        //     ...user,
        //     addCoinType: true
        // })
        console.log(user);

        axios.post('http://localhost:400/addcointype', {
            img: img,
            typeName: user.typeName
        }).then(res=>{
            alert('Success');
        }).catch((err)=>{
            if (err.response.data.errno == 1062) {
                alert("These entries were found in another field!");
            }
        })

        e.target.imgFile.value = "";
        e.target.typeName.value = "";
        setimg();

    }

    let TypeChange = (e) => {
        let { name, value } = e.target;
        if (name == 'imgFile') {
            console.log(e.target);
            setimg(URL.createObjectURL(e.target.files[0]));
            // user.imgFile = "value";
            // setUser(
            //     {
            //         ...user,
            //         imgFile: URL.createObjectURL(e.target.files[0])
            //     });
        }
        else {
            user.typeName = value;
            console.log(value); // typeName
        }
        // setUser({
        //     ...user,
        //     [name]: value
        // })
    }

    return (
        <div className="home">
            <h1 className="home-h1">Homepage</h1>
            <Search />
            <div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap', columnGap: "50px" }}>
                {coinTypes.map((item, index) => {
                    return (
                        <div key={index} id="type-item">
                            <p>{item.TypeName.charAt(0).toUpperCase() + item.TypeName.slice(1)} coins</p>
                            <Link to={item.Path}>All</Link><br></br>
                            <img id="coin-img" src={item.Img} alt={item.TypeName.substring(0, 6)} ></img>
                        </div>)
                })}
                {user.adminlogin == true ?

                    (<form className="add-coin" onSubmit={AddCoinType}>
                        <input name="typeName" onChange={TypeChange} type="text" placeholder="Coin Type name"></input>
                        {/* <input name="imgFile" type="file" onChange={TypeChange} /><br></br> */}
                        <FileUploader state={setimg} />
                        <img id="upload-img" src={img} alt="typeimg"></img>
                        <button>Add</button>
                        {/* <FileUploader state={setimg1}/>
                        <img id="upload-img" src={img1}></img> */}
                    </form>) : null
                }
            </div>

        </div >
    )
}

export default Home;