import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getAll, update } from './api/api';
import UserForm from './UserForm';
 
const TableExtAPI = () => {

  const [greeting, setGreeting] = useState("Hello functional component");
  const [data, setData] = useState([]);
  const [user, setUser] = useState({
    id: '',
    name: '',
    username: '',
    password: '',
    occupation: '',
    hobby: '',
  })

  useEffect(()=>{
    listCryptoCurrencies();
  }, [])

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      console.log("fetching crypto...")
      listCryptoCurrencies();
    }, 4*1000);
    return () => clearInterval(interval);
  }, []);

  

  const deleteHandler = (item) => (event) =>{
    deleteUser(item).then(res=>{
      loadUsers();
    });
  }

  const listCryptoCurrencies = async () => {

    /**
     * this is the constant url for the external API.
     */
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,BNB,ENJ,DOT,ADA,DOGE,LTC,XRP,BCH,XMR,NEO&tsyms=USD`;
    /**
     * We are loading the results from the url using the fetch functionality.
     */
    let response = await fetch(url, {
      method: "GET",
    });
    /**
     * Parsing the data into JSON Object.
     */
    let result = await response.json();
    let data = [];

    /**
     * Parsed the JSON Object to array for 
     * looping.
     */
    Object.keys(result.RAW).map((key)=>{
      let item = {
        NAME: key,
        PRICE: Number(result.RAW[key].USD.PRICE).toFixed(2),
        OPEN24HOUR: Number(result.RAW[key].USD.OPEN24HOUR).toFixed(2),
        VOLUME24HOUR: Number(result.RAW[key].USD.VOLUME24HOUR).toFixed(2),
        OPENDAY: Number(result.RAW[key].USD.OPENDAY).toFixed(2),
        CHANGEPCT24HOUR: Number(result.RAW[key].USD.CHANGEPCT24HOUR).toFixed(2),
      }
      data.push(item);
    });

    setData(data);


    

  }

  const loadItem = (item) => (event) =>{
    return item;
  }
  
  const loadUsers = async () => {

    /**
     * to make sure that the data will come.
     */
    const response = await getAll();
    /**
     * to make the data global.
     */
    try{
      setData(response?.data);
    }catch(error){
      console.log(error);
    }
    finally{

    }
  }
  
 
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-1">
          <Link to="/userForm" className="btn btn-primary">Add</Link>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              NAME
            </th>
            <th>
              PRICE
            </th>
            <th>
              OPEN24HRS
            </th>
            <th>VOLUME24HOUR</th>
            <th>OPENDAY</th>
            <th>CHANGEPCT24HOUR</th>
          </tr>
        </thead>
        <tbody>
          {
            (data)?data.map((item, index)=>{
              return(
                <tr key={index}>
                  <td>{item.NAME}</td>
                  <td>{item.PRICE}</td>
                  <td>{item.OPEN24HOUR}</td>
                  <td>{item.VOLUME24HOUR}</td>
                  <td>{item.OPENDAY}</td>
                  <td>{item.CHANGEPCT24HOUR}</td>
                </tr>
              )
            }):null
          }
        </tbody>
      </table>
    </div>
  );
};

const Input = ({value, handleChange})=>{
  const ref = useRef();
  useEffect (() => ref.current.focus(), []);
  return(
    <input type="text" value={value} onChange={handleChange} ref={ref} />
  );
};
 

 
export default TableExtAPI;