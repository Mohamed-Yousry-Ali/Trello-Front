import React, { useEffect, useState } from 'react'
import style from './UpdateTask.module.css'
import { Route, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
export default function UpdateTask() {

  const [apiError, setApiError] = useState("");
  const [item, setItem] = useState(null);

  
  const { id } = useParams(); // Retrieve the item ID from the URL

 

   // Simulate fetching item data from an API or other data source
   useEffect(() => {
    
    // Replace this with an actual API call to get item data
    let getItemData = async () => {
      // Simulating data retrieval with a delay
      const response = await fetch(`https://ititrello.onrender.com/task/${id}`);
      const data = await response.json();
      
      setItem(data.task);
      
    };

    getItemData();
    
  }, []);
  const [formData, setFormData] = useState({
 
    title: '',
    description: '',
    status: '',
    assignTo:'',
 
    deadLine:''
 });

  if (!item) {
    return <div>Loading...</div>;
  }


  // //update data
  // const mutation = useMutation(
  //   async (data) => {
  //     console.log(data)
  //      await axios.post('https://ititrello.onrender.com/addtask',data, {
       
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer '+localStorage.getItem("userToken")
  //       }
       
  //     }).then((response) => {
  //       console.log('response',response.data)
  
  //     })
  //     .catch((error) => {
  //       console.log('error',error.response)
       
  
  //     });
  //   }
  // );

  // const handleFormSubmit = (e) => {
  //   e.preventDefault(); // Prevent the default form submission
  //   mutation.mutate(formData);
  // };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <div className='w-50 max-auto my-5'>
    <h3 className='text-center'>Update Task</h3>
    {apiError?<div className='alert alert-danger'>{apiError}</div>:""}

    <form >
        <label>Name:</label>
        <input type="text"  name="title" className='form-control'  onChange={handleInputChange} value={formData.title} />
        {/* Add input fields for other item properties */}
        <button type="submit">Update</button>
      </form>

      {/* <form
      
      >
          <input
          type="text"
          name="title"
          className='form-control'
          value={formData.title}
          onChange={handleInputChange}
          placeholder="title"
        /> */}
  </div>
  )
}
