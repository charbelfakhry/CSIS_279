import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchRefData } from '../../api/api';

 
const ResuableDropDown = (props) => {

  const [data, setData] = useState([]);

  useEffect(()=>{
    loadData();
  }, [])

  

  
  
  const loadData = async () => {

    /**
     * to make sure that the data will come.
     */
    console.log(props);
    let info = props.info;
    const response = await fetchRefData(info);
    console.log(response);
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

      <select>
        {(data)?(data.map((item, index)=>{
          return(<option key={index} id={item.id}>{item.name}</option>)
        })):null}
      </select>
    </div>
  );
};
 

 
export default ResuableDropDown;