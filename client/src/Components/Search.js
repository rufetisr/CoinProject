import React, { useRef } from 'react'
import './Search.css'

const Search = (props) => {
    let {inp, setInp, click} = props;
    const refInp = useRef();

     let ChangeInput =()=>{
        console.log('change');
        setInp(refInp.current.value);
    }

    return (
        <div className='search-div'>
            <input onKeyUp={click} ref={refInp} onChange={ChangeInput} placeholder="Search..."></input>
            <button onClick={click}>Search</button>
        </div>
    )
}

export default Search;