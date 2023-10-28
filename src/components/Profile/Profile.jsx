import React, { useEffect, useState } from 'react'
import style from './Profile.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
export default function Profile() {
  const [oneUser, setoneUser] = useState([]);

  function getUser() {
 axios.get("https://ititrello.onrender.com/profile", {
   headers: {
     'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("userToken")
   }
 }).then(response => {
   //return res.data.alltask
 console.log(response)
 setoneUser(response.data.user)
 

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
   
 
  getUser()
 
 }, [])



  return (
 <>
 <table class="table">
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Age</th>
      <th scope="col">Gender</th>
      <th scope="col">Phone</th>
   
    </tr>
  </thead>
  <tbody>
    
  {
  <tr>
             
              <td>{oneUser.userName}</td>
              <td>{oneUser.email}</td>
              <td>{oneUser.age}</td>
              <td>{oneUser.gender}</td>
              <td>{oneUser.phone}</td>
          
            
            </tr>
            }

  </tbody>
</table>
 </>
  )
}
