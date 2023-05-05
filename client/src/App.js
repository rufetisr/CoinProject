import './App.css';
// import SignUp from './Pages/SignUp';
import { useState, useEffect } from 'react';
import Context from './Context/Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Header from './Components/Header';
import Coin from './Pages/Coin';
// import Search from './Components/Search';
import CoinDetails from './Pages/CoinDetails';
import axios from 'axios';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';

function App() {
  const [coins, setCoins] = useState([]); // list coins
  const [coinTypes, setCoinTypes] = useState([]); // coin types
  const [coinTypesForSearch, setCoinTypesForSearch] = useState([]); // coin types
  const [coinOfTypes, setCoinOfTypes] = useState([]); // for routes to details
  const [coin, setCoin] = useState({}); // coin detail
  const [newCoinType, setNewCoinType] = useState({
    name: "",
    img: "",

  });
  // const [admin, setAdmin] = useState({
  //   login: false,

  // }); 

  let [user, setUser] = useState({
    email: '', // sign-up input change
    username: '', // sign-up change
    password: '', // sign-up change
    emailorname: "", // sign-in change
    logpassword: "", // sign-in change
    // after signed
    name: "",
    signedEmail: "",
    login: false,  //userlogin
    imgUrl: "",
    logTime: "",
    createAccTime: "",
    // admin
    adminlogin: false,
    typeName: "",
    imgFile: "",
  });

  let data = {
    coins, setCoins,
    user, setUser,
    coinTypes, setCoinTypes,
    coin, setCoin,
    coinOfTypes, setCoinOfTypes,
    newCoinType, setNewCoinType,
    coinTypesForSearch, setCoinTypesForSearch
  }


  useEffect(() => {
    let res = axios.get('http://localhost:400/');
    res.then(res => setCoinOfTypes(res.data));

    let res1 = axios.get('http://localhost:400/cointypes');
    res1.then(res => {
    setCoinTypesForSearch(res.data);
      setCoinTypes(res.data);
    });

  }, []);

  return (

    <Context.Provider value={data}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/sign-in' element={<SignIn />}></Route>
          {
            coinTypes.map((item) => {
              return (
                <Route key={item.TypeId} path={item.Path} element={<Coin />}></Route>
              )
            })
          }
          {
            coinOfTypes.map((item) => {
              return (
                <Route key={item.CoinId} path={"/" + item.TypeName + "/" + item.CoinId} element={<CoinDetails />}></Route>
              )
            })
          }
          {/* <Route path='/commemorative' element={<Coin/>}></Route>
          <Route path='/bullion' element={<Coin/>}></Route>
          <Route path='/exclusive' element={<Coin/>}></Route> */}
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
