import React, { useEffect } from 'react'
import style from './Allusers.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
export default function Allusers() {
   const { data, error, isLoading } = useQuery('data', getMessages);
   useEffect(() => {
     //getMessages()
   
   }, [])

   async function getMessages() {

    let response = await axios.get("https://ititrello.onrender.com/user", {
      headers: {
        token: localStorage.getItem("userToken")
      }
    });

    
     return response.data;
    
    // setAllMessages(data.allMessages)
  }
   function deleteUser (id) {
    axios.delete(`https://ititrello.onrender.com/deleteUserid/${id}`).then(response => {
      console.log(response);
    }).catch(error => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    
  }

  useEffect(() => {
    getMessages();
    if (getMessages.length) getMessages();
    }, [getMessages]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">user name</th>
      <th scope="col">email</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    
  {data.allUsers.map((ele) => <tr key={ele._id}>
              <td>{ele._id}</td>
              <td>{ele.userName}</td>
              <td>@{ele.email}</td>
              <td>
                <button onClick={()=>deleteUser(ele._id)}>Delete</button>
                <button>update</button>
              </td>
              
              
            </tr>)}

  </tbody>
</table>
    </>
  )
}
