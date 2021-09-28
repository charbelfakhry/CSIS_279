import React, { useState, useEffect, useRef } from 'react';
import { deleteUser, getAll, update } from './api/api';
 
const TableFunc = () => {

  const [greeting, setGreeting] = useState("Hello functional component");
  const [data, setData] = useState([]);
  
  const [name, setName] = useState("");

  const[id, setId] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [hobby, setHobby] = useState("");
  const [age, setAge] = useState("");

  useEffect(()=>{
    loadUsers();
  }, [])
  

  const handleChange = event => setGreeting(event.target.value);

  const deleteHandler = (item) => (event) =>{
    deleteUser(item).then(res=>{
      loadUsers();
    });
  }

  const loadItem = (item) => (event) =>{
    setId(item?.user_id); 
    setName(item?.user_name);
    setUserName(item?.user_username);
    setPassword(item?.user_password);
    setOccupation(item?.user_occupation);
    setHobby(item?.user_hobby);
    setAge(item?.user_age);
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

  const updateClickHandler = async(event) =>{
    
    event.preventDefault();
    
    let user = {
      id : id,
      name: name,
      username: username,
      password: password,
      occupation: occupation,
      hobby: hobby,
      age: age,
    }

    console.log(user);

    await update(user);
    loadUsers();
  }
 
  const nameChangeHandler = (event) =>{
    setName(event.target.value);
  }
  const userNameChangeHandler = (event) =>{
    setUserName(event.target.value);
  }
  const passwordChangeHandler = (event) =>{
    setPassword(event.target.value);
  }
  const occupationChangeHandler = (event) =>{
    setOccupation(event.target.value);
  }
  const hobbyChangeHandler = (event) =>{
    setHobby(event.target.value);
  }
  const ageChangeHandler = (event) =>{
    setAge(event.target.value);
  }
  
 
  return (
    <div className="container">
      <h1>{greeting}</h1>
      <Input value={greeting} handleChange={handleChange} />
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
                  <td><button className="btn-sm btn-secondary" onClick={loadItem(item)}>Load</button></td>
                  <td><button className="btn-sm btn-danger" onClick={deleteHandler(item)}>Del.</button></td>
                </tr>
              )
            }):null
          }
        </tbody>
      </table>
      <form>
        <div className="row">
          <div className="col">
            <label style={{fontWeight: 'bold', color: 'red'}} className="form-label">Name: &nbsp;</label>
            <input className="form-input"  type="text" placeholder={name} onChange={nameChangeHandler}/>
          </div>
          <div className="col">
            <label className="form-label"><b>Username: &nbsp;</b></label>
            <input className="form-input" placeholder={username} onChange={userNameChangeHandler} type="text" />
          </div>
          <div className="col">
            <label className="form-label"><b>Password: &nbsp;</b></label>
            <input className="form-input" placeholder={password} onChange={passwordChangeHandler} type="text" />
          </div>
          <div className="col">
            <label className="form-label"><b>Occupation: &nbsp;</b></label>
            <input className="form-input" placeholder={occupation}  onChange={occupationChangeHandler} type="text" />
          </div>
          <div className="col">
            <label className="form-label"><b>Hobby: &nbsp;</b></label>
            <input className="form-input"  type="text" onChange={hobbyChangeHandler} placeholder={hobby} />
          </div>
          <div className="col">
            <label className="form-label"><b>Age: &nbsp;</b></label>
            <input className="form-input"  type="text" onChange={ageChangeHandler} placeholder={age} />
          </div>
        </div>
        <div style={{height: '25px'}} />
        <div className="row">
        <div className="col-1">
            <button className="btn btn-success" onClick={updateClickHandler}>Save</button>
          </div>
        </div>
    </form>
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