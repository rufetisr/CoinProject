import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Search from "../Components/Search";
import context from "../Context/Context";
import axios from "axios";
import './Home.css'

function Home() {
    let { coinTypes, setCoinTypes } = useContext(context);

    let getCoinTypes = async () => {
        // let res = axios.get('http://localhost:400/cointypes');
        // res.then(res => setCoinTypes(res.data));
        // return res;
    }
    useEffect(() => {
        console.log('home useffect');
        // getCoinTypes();

    }, []);


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
            </div>
        </div>
    )
}

export default Home;