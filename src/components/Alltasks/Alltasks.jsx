import React, { useContext, useEffect, useState } from 'react'
import style from './Alltasks.module.css'
import { tokenContext } from '../../Context/tokenContext';
import { useFormik } from 'formik';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
export default function Alltasks() {
  let navigate = useNavigate()
  const [apiError, setApiError] = useState("");
  let{setToken} = useContext(tokenContext);

const queryClient = useQueryClient();
const [formData, setFormData] = useState({
 
   title: '',
   description: '',
   status: '',
   assignTo:'',

   deadLine:''
});
const mutation = useMutation(
  async (data) => {
    console.log(data)
     await axios.post('https://ititrello.onrender.com/addtask',data, {
     
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem("userToken")
      }
     
    }).then((response) => {
      console.log('response',response.data)

    })
    .catch((error) => {
      console.log('error',error.response)
     

    });
  }
);

const handleFormSubmit = (e) => {
  e.preventDefault(); // Prevent the default form submission
  mutation.mutate(formData);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const [alltasks, setalltasks] = useState([]);

async function getTasks() {
let res =  await axios.get("https://ititrello.onrender.com/tasks", {
  headers: {
    token: localStorage.getItem("userToken")
  }
})

//return res.data.alltask

 setalltasks(res.data.alltask)
}

useEffect(() => {
  

getTasks()

}, [])


useEffect(() => {
  getTasks();
  if (getTasks.length) getTasks();
  }, [getTasks]);


//delete task
function deleteTask (id) {
  axios.delete(`https://ititrello.onrender.com/deletetask/${id}`,{
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem("userToken")
    }
  }
  
  ).then(response => {

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
  getTasks();
  if (getTasks.length) getTasks();
  }, [getTasks]);





//get all user name
  const [alluser, setalluser] = useState([]);

  async function getallUsers() {
    let res =  await axios.get("https://ititrello.onrender.com/user", {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
    
    //return res.data.alltask
  console.log(res.data.allUsers)
    setalluser(res.data.allUsers)
    }

    useEffect(() => {
  
      getallUsers()
   
      
      }, [])

      function updateTaskNavigate(id){
   
        navigate(`/updatetask/${id}`)
       }


       

  return (
<>
    <div className='w-50 max-auto my-5'>
    <h3 className='text-center'>Add Task</h3>
    {apiError?<div className='alert alert-danger'>{apiError}</div>:""}
 
<form
       onSubmit={handleFormSubmit}
      >
          <input
          type="text"
          name="title"
          className='form-control'
          value={formData.title}
          onChange={handleInputChange}
          placeholder="title"
        />

<input
          type="text"
          name="description"
          className='form-control'
          value={formData.description}
          onChange={handleInputChange}
          placeholder="description"
        />
       <input
          type="text"
          name="status"
          className='form-control'
          value={formData.status}
          onChange={handleInputChange}
          placeholder="status"
        />
          
       
        <select className='form-control' name='assignTo' onChange={handleInputChange} value={formData.assignTo}>
        <option>User Name</option> 
                
                {alluser.map((user, index) => {
                    return (
                        <option key={index} value={user._id}>
                            {user.userName}
                        </option>
                    );
                })}
            
        </select>
         
        <input
          type="date"
          name="deadLine"
          className='form-control'
          value={formData.deadLine}
          onChange={handleInputChange}
          placeholder="deadLine"
        />
 
        <button  className="btn btn-default-outline d-block my-4 mx-auto " type="submit">Submit</button>
      </form>
    
  </div>
<hr />
<table className="table">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Status</th>
        <th scope="col">assignTo</th>
        <th scope="col">Dead Line</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>


    {
    // <div>{alltasks}</div>


    alltasks.map((task) => <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>
                {task.assignTo.userName}
                </td>
                <td>{task.deadLine}</td>
                <td>
                <button onClick={()=>deleteTask(task._id)}>Delete</button>
            
            
              </td>
              </tr>)
   }
    </tbody>
  </table>
  </>

  )
}
