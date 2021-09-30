import React, { useState, useEffect, useRef } from 'react';
import { deleteUser, getAll, update } from './api/api';
import UserForm from './UserForm';
 
const TableFunc = () => {

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
    loadUsers();
  }, [])

  const deleteHandler = (item) => (event) =>{
    deleteUser(item).then(res=>{
      loadUsers();
    });
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
          <button className="btn btn-primary">Add</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Username
            </th>
            <th>
              Password
            </th>
            <th>Occupation</th>
            <th>Hobby</th>
            <th>Age</th>
            <th>Load</th>
            <th>Del.</th>
          </tr>
        </thead>
        <tbody>
          {
            (data)?data.map((item, index)=>{
              return(
                <tr key={index}>
                  <td>{item.user_name}</td>
                  <td>{item.user_username}</td>
                  <td>{item.user_password}</td>
                  <td>{item.user_occupation}</td>
                  <td>{item.user_hobby}</td>
                  <td>{item.user_age}</td>
                  <td><button className="btn-sm btn-secondary" onClick={loadItem(item)}>Update</button></td>
                  <td><button className="btn-sm btn-danger" onClick={deleteHandler(item)}>Del.</button></td>
                </tr>
              )
            }):null
          }
        </tbody>
      </table>
    <UserForm item={user} isUpdate={false}/>
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
 

 
export default TableFunc;