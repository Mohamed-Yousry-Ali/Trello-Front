import React, { useEffect, useState } from 'react'
import style from './Dashboard.module.css'
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import userImage from '../../images/users.png'
import taskImage from '../../images/tasks.png'
import axios from 'axios';
import { useFormik } from 'formik';
export default function Dashboard() {
  // const { data, error, isLoading } = useQuery('data', gettaskuser);
  // useEffect(() => {
  //   // gettaskuser()
  
  // }, [])


  const [userId, setuserId] = useState("");
  const [userAdmin, setuserAdmin] = useState("");
  let navigate = useNavigate()
  

  function getUserId() {
    let decoded = jwtDecode(localStorage.getItem("userToken"))
    console.log(decoded)
    setuserId(decoded.id)
    setuserAdmin(decoded.isAdmin)
  }
  useEffect(() => {

     getUserId()
 
   }, [])
   function allusers(){
   
   navigate('/allusers')
  }
  function alltasks(){
    
   navigate('/alltasks')
  }

  // async function gettaskuser() {

  //   let response = await axios.get("https://ititrello.onrender.com/usertask", {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer '+localStorage.getItem("userToken")
  //     }
  //   });

  //   console.log(response.data)
  //    return response.data;
    
  //   // setAllMessages(data.allMessages)
  // }

  const [alltasksuser, setalltasksuser] = useState([]);

   function getTasks() {
  axios.get("https://ititrello.onrender.com/usertask", {
    headers: {
      'Content-Type': 'application/json',
       'Authorization': 'Bearer '+localStorage.getItem("userToken")
    }
  }).then(response => {
    //return res.data.alltask
  console.log(response)
  setalltasksuser(response.data.taskUsers)
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
    
  
  getTasks()
  
  }, [])


  function updateStatus(values) {

   
    axios.post(`https://ititrello.onrender.com/updatetaskuser`, values).then((data) => {
console.log(data)
   
    }).catch((err) => {
      console.log(err)

    })
  }

  let formik = useFormik({
    initialValues: {
     
      id:'',
      status:''
     
    },

    onSubmit: (values) => {
      updateStatus(values)
    }
  });

  return (
    <>
  {userAdmin ? 
  <>
  <h1 className='text-center'>Dashboard</h1>

<div className="blocks" style={{display: 'inline-flex'}}>
  <div style={{backgroundColor: '#8293ab', width: 500, marginLeft: 200, borderRadius: 20}}>
    <section>
      <h1 style={{textAlign: 'center', color: 'white'}}>users lists</h1>
      <a  onClick={allusers} style={{cursor:'pointer'}}> <img src={userImage} style={{marginLeft: 50, width: 400, height: 300}} /></a>
      <br />
      {/* <p style={{textAlign: 'center', fontSize: 'xx-large', color: 'white'}}>10+</p> */}
      <hr style={{color: 'blue', height: 5, border: 'solid', width: 450, marginLeft: 25}} />
    </section>
  </div>
  <div style={{backgroundColor: '#8293ab', width: 500, marginLeft: 150, borderRadius: 20}}>
    <section>
      <h1 style={{textAlign: 'center', color: 'white'}}>tasks lists</h1>
      <a  onClick={alltasks} style={{cursor:'pointer'}}> <img src={taskImage} style={{marginLeft: 70, width: 400, height: 300}} /></a>
      {/* <p style={{textAlign: 'center', fontSize: 'xx-large', color: 'white'}}>20+</p> */}
      <hr style={{color: 'blue', height: 5, border: 'solid', width: 450, marginLeft: 25}} />
    </section>
  </div>
</div>







  

  </>
  : <table className="table">
  <thead>
    <tr>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Status</th>
      
      <th scope="col">Dead Line</th>
     
    </tr>
  </thead>
  <tbody>


  {
  // <div>{alltasks}</div>


 alltasksuser.map((task) => <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <form onSubmit={formik.handleSubmit}>
                <input
          type="hidden"
          name="id"
          className='form-control'
          value={formik.values.id} onChange={formik.handleChange} 
         
        />
                <select className='form-control' name='status'  value={formik.values.status} onChange={formik.handleChange}  >
                <option value={task.status}>{task.status}</option>
                <option  value="Active">Active</option>
                <option value="Done">Done</option>
                
                </select>
             
                </form>
                </td>
             
              <td>{task.deadLine}</td>
              
            </tr>)
 }
  </tbody>
</table>
 }
  </>
  )
}
