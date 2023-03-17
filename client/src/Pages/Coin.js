import React, { useContext, useEffect } from 'react';
import Search from '../Components/Search';
import context from '../Context/Context';
import axios from 'axios';
import '../Pages/Coin.css';
import { Link } from 'react-router-dom';
import CoinDetails from './CoinDetails';

const Coin = () => {
    let { coins, setCoins } = useContext(context);

    // let arr = ['aaaa', 'dfgdfg', 'fgdfg', 'dfgdg'];
    // let arr1 = ['bbbb', 'dfgdfg', 'fgdfg', 'dfgdg'];
    // let arr2 = ['cccc', 'dfgdfg', 'fgdfg', 'dfgdg'];
    // console.log(window.location.pathname);
    // useEffect(() => {
    //     if (window.location.pathname == '/type1') {
    //         let res = axios.get('http://localhost:400/type1');
    //         res.then(res => console.log(res.data));
    //         setCoins(arr);
    //     }
    //     else if (window.location.pathname == '/type2') {
    //         setCoins(arr1);
    //     }
    //     else {
    //         setCoins(arr2);
    //     }

    // }, []);

    let getCoins = async () => {
        var arr = [];
        let urlRoute = window.location.pathname;
        let res = axios.get(`http://localhost:400${urlRoute}`);
        res.then(res => {
            console.log(res.data);
            setCoins(res.data)
        });
        console.log(arr);
        // setCoins(arr);
    }
    useEffect(() => {
        console.log('useeffect');
        getCoins();
    }, []);

    return (
        <div className='list-coin'>
            <Search />
            {
                coins != [] ? coins.map((item, index) => {
                    return (
                        <div className='coin' key={index} >
                            <Link to={window.location.pathname + "/" + item.CoinId}>{item.Name}</Link>
                            <p>{item.ShortDesc}</p>
                            <img className='coin-img' src={item.ImgFr} alt={item.Name}></img>
                        </div>
                    )
                }) : <div>Null</div>
            }
        </div>
    )
}

export default Coin;