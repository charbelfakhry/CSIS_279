import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, loadCustomers } from '../api/api';
import ResuableDropDown from '../components/reusable-cmpts/ResuableDropDown';

let info = {
  tableName: "country",
  id: "country_id",
  name: "country_name"
}

let cityInfo = {
  tableName: "city",
  id: "city_id",
  name: "city"
}

 
const CustomerTable = () => {

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
    loadCustomer();
  }, [])

  const deleteHandler = (item) => (event) =>{
    deleteUser(item).then(res=>{
      // loadUsers();
    });
  }

  const loadItem = (item) => (event) =>{
    return item;
  }
  
  const loadCustomer = async () => {

    /**
     * to make sure that the data will come.
     */
    const response = await loadCustomers();;
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
        <div className="col">
          <ResuableDropDown info={info} />
        </div>
        <div className="col">
          <ResuableDropDown info={cityInfo} />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Phone
            </th>
            <th>
              Email
            </th>
            <th>Address</th>
            <th>Del.</th>
          </tr>
        </thead>
        <tbody>
          {
            (data)?data.map((item, index)=>{
              return(
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.address.city}-{item.address.country}</td>
                  <td><button className="btn-sm btn-danger" onClick={deleteHandler(item)}>Del.</button></td>
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
 

 
export default CustomerTable;