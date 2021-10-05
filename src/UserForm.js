import React, { useState, useEffect, useRef } from 'react';
import { deleteUser, getAll, update } from './api/api';

import { Link, useLocation, useHistory } from "react-router-dom";

const UserForm = () => {

  const [values, setValues] = useState({
    id: '1',
    name: '',
    username: '',
    password: '',
    occupation: '',
    hobby: '',
    age: '',
  })

  let location = useLocation();
  let history = useHistory();

  useEffect(() => {

    const user = location?.state?.user;
    loadUserFromTable(user)

  }, [])

  const loadUserFromTable = (user) => {
    setValues({
      id: user?.user_id,
      name: user?.user_name,
      username: user?.user_name,
      password: user?.user_password,
      occupation: user?.user_occupation,
      hobby: user?.user_hobby,
      age: user?.user_age,
    });
  }

  const updateClickHandler = async (event) => {

    event.preventDefault();

    let user = {
      id: values?.id,
      name: values.name,
      username: values.username,
      password: values.password,
      occupation: values.occupation,
      hobby: values.hobby,
      age: values.age,
    }

    const info = await update(user);
    alert(info?.data.msg);
    history.push("/users");



  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
    console.log(values);
  }


  return (
    <div className="container">
      <form>
        <div className="row">
          <div className="col">
            <label style={{ fontWeight: 'bold', color: 'red' }} className="form-label">Name: &nbsp;</label>
            <input className="form-input" type="text" placeholder={values.name} onChange={handleChange("name")} />
          </div>
          <div className="col">
            <label className="form-label"><b>Username: &nbsp;</b></label>
            <input className="form-input" placeholder={values.username} onChange={handleChange("username")} type="text" />
          </div>
          <div className="col">
            <label className="form-label"><b>Password: &nbsp;</b></label>
            <input className="form-input" placeholder={values.password} onChange={handleChange("password")} type="password" />
          </div>
          <div className="col">
            <label className="form-label"><b>Occupation: &nbsp;</b></label>
            <input className="form-input" placeholder={values.occupation} onChange={handleChange("occupation")} type="text" />
          </div>
          <div className="col">
            <label className="form-label"><b>Hobby: &nbsp;</b></label>
            <input className="form-input" type="text" onChange={handleChange("hobby")} placeholder={values.hobby} />
          </div>
        </div>
        <div style={{ height: '25px' }} />
        <div className="row">
          <div className="col">
            <label className="form-label"><b>Age: &nbsp;</b></label>
            <input className="form-input" type="text" onChange={handleChange("age")} placeholder={values.age} />
          </div>
          <div className="col">
            <button className="btn btn-success" onClick={updateClickHandler}>Save</button>
          </div>
          <div className="col">
            <Link className="btn btn-secondary" to="/users">Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
};



export default UserForm;