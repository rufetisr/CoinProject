import axios from 'axios';
import React, {useContext, useEffect} from 'react'
import context from '../Context/Context';


const CoinDetails = () => {
    const {coins, setCoins} = useContext(context);

    let getCoin = ()=>{
        console.log(window.location.pathname);
        axios.get(``)
    }
    useEffect(() => {
      getCoin();
    }, []);

    return (
        <div className='coin-det'>
            <h1>CoinDetails</h1>
            coins 
            <div>
                <img src=''></img>
                <img src=''></img>
            </div>
        </div>
    )
}

export default CoinDetails