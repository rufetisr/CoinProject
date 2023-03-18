import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import context from '../Context/Context';
import "./CoinDetails.css"

let url = '';
const CoinDetails = () => {
    let { coin, setCoin } = useContext(context);

    let getCoin = () => {
        url = window.location.pathname; // /bullion/5
        let res = axios.get(`http://localhost:400${url}`);
        res.then(res => setCoin(res.data));

    }
    useEffect(() => {
        console.log('useeffect details');
        getCoin();

    }, []);

    return (
        <div className='coin-det'>
            {/* <h2>CoinDetails</h2> */}
            <div className='flex'>

                <div className='imgs'>
                    <img src={coin.ImgFr}></img>
                    <img src={coin.ImgBk}></img>
                </div>

                <div className='detail'>
                    <h2>{coin.Name}</h2>
                    <p>{coin.ShortDesc}</p><br></br>
                    <p>{coin.LongDesc}</p><br></br>
                    <table>
                        <tbody>
                            <tr>
                                <td>Country</td>
                                <td>{coin.Country}</td>
                            </tr>
                            <tr>
                                <td>Composition</td>
                                <td>{coin.Composition}</td>
                            </tr>
                            <tr>
                                <td>Quality</td>
                                <td>{coin.Quality}</td>
                            </tr>
                            <tr>
                                <td>Denomination</td>
                                <td>{coin.Denomination}</td>
                            </tr>
                            <tr>
                                <td>Year</td>
                                <td>{coin.Year}</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{coin.Weight}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{coin.Price}$</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <Link to ={url.substring(0, url.lastIndexOf('/'))}>Back to the list</Link>
                </div>

            </div>
        </div>
    )
}

export default CoinDetails