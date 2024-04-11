import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [cat, setCat] = useState([]);
  const [itm, setItm] = useState({});
  const [oldItm, setOldItm] = useState([]);

  function boxes() {
    return cat.map((val, index) => (
      <div onClick={(event) => items(event, val)} className='box' key={index}>
        <p>{val}</p>
      </div>
    ));
  }


  function itemsshow() {

    return oldItm.map((oldItm, index) => (
      <div className='itemsinnerblock' key={index}>
       
         
         <img src={oldItm.thumbnail} />
         <h2>{oldItm.title}</h2>
       </div>
    ));
  }

  useEffect(() => {
    if (Object.keys(itm).length !== 0) {
      setOldItm(itm.products);
    }
  }, [itm]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/categories`)
      .then((res) => res.json())
      .then((r) => setCat(r))
      .catch((error) => console.error('Error fetching categories:', error));


    fetch('https://dummyjson.com/products')
      .then((rr) => rr.json())
      .then((rp) => { setOldItm(rp.products) })  


  }, []);

  function items(event, val) {
    fetch(`https://dummyjson.com/products/category/${val}`)
      .then((re) => re.json())
      .then((rr) => {
        setItm(rr);
      })
      .catch((error) => console.error('Error fetching items:', error));

    event.preventDefault();
  }

  return (
    <div className='screen'>
      <div className='catblock'>
        <div className='innercatblock'>
          <h2>Select Categories</h2>
          {boxes()}
        </div>
      </div>
      <div className='items'>
        <h1>Products</h1>
        <div className='itemsblock'>
          {itemsshow()}
          {console.log(oldItm)}
          
          
        </div>
      </div>
    </div>
  );
}
