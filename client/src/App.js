import './App.css';
// import SignUp from './Pages/SignUp';
import { useState } from 'react';
import Context from './Context/Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Header from './Components/Header';
import Coin from './Pages/Coin';
import Search from './Components/Search';
import CoinDetails from './Pages/CoinDetails';

function App() {
  const [coins, setCoins] = useState([]);
  const [coinTypes, setCoinTypes] = useState([]);
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: ''
  });

  let data = {
    coins, setCoins,
    user, setUser,
    coinTypes, setCoinTypes
  }

  return (

    <Context.Provider value={data}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {
            coinTypes.map((item) => {
              return(
                <Route key={item.TypeId} path={item.Path} element={<Coin/>}></Route>
              )
            })   
          }
          {            
            
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
