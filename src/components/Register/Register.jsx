import React, { useState } from 'react'
import style from './Register.module.css'
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function Register() {

  const { control, handleSubmit, formState: { errors } } = useForm();

 


  let navigate = useNavigate();

  const[isLoading,setIsLoading]=useState(false);
  const[apiError,setApiError]=useState("");
  
     function register(values){
      setIsLoading(true)
      axios.post(`https://ititrello.onrender.com/addUser`,values).then((data)=>{
         console.log(data)
         if(data.data.message =="signUp Success"){
        setIsLoading(false)
        navigate("/login")
      }
      }).catch((err)=>{
        console.log(err.response.data.message)
        setApiError(err.response.data.message)
        setIsLoading(false)
      })
     
  
      
    }

  const onSubmit = (values) => {
    register(values)
    console.log(values);
  };
  return (
    <>
        <div className='w-50 max-auto my-5'>
      <h3 className='text-center'>Register</h3>
          {apiError?<div className='alert alert-danger'>{apiError}</div>:""}
  
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="form-group mb-3">
      <label  htmlFor="userName">Username:</label>
      <Controller

        name="userName"
        control={control}
        defaultValue=""
        rules={{ required: 'Username is required' }}
        render={({ field }) => <input {...field}
        onBlur={field.onBlur}
         type="text" id='userName' 
         className={`form-control ${field.onBlur && errors.userName ? 'is-invalid' : ''}`}
         />}
      />
      {errors.userName && <p className='alert alert-danger'>{errors.userName.message}</p>}
    </div>







    <div>
        <label>Email:</label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email format',
            },
          }}
          render={({ field }) => <input {...field} 
          onBlur={field.onBlur}
         type="email" id='email' 
         className={`form-control ${field.onBlur && errors.email ? 'is-invalid' : ''}`}
          />}
        />
     { errors.email && <p className='alert alert-danger'>{errors.email.message}</p>}
      </div>

    <div>
      <label>Password:</label>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: 'Password is required',
        
        }}
        render={({ field }) => <input {...field} 
        onBlur={field.onBlur}
        type="password" id='password' 
        className={`form-control ${field.onBlur && errors.password ? 'is-invalid' : ''}`}/>}
      />
      {errors.password && <p className='alert alert-danger'>{errors.password.message}</p>}
    </div>

    <div>
      <label>Age:</label>
      <Controller
        name="age"
        control={control}
        defaultValue=""
        rules={{
          required: 'age is required',
        
        }}
        render={({ field }) => <input  {...field} 
        onBlur={field.onBlur}
        type="text" id='age' 
        className={`form-control ${field.onBlur && errors.age ? 'is-invalid' : ''}`}
        
        />}
      />
      {errors.age && <p className='alert alert-danger'>{errors.age.message}</p>}
    </div>

    <div>
      <label>Gender:</label>
      <Controller
        name="gender"
        control={control}
        defaultValue=""
        rules={{
          required: 'gender is required',
        
        }}
        render={({ field }) => <input {...field} 
        onBlur={field.onBlur}
        type="text" id='gender' 
        className={`form-control ${field.onBlur && errors.gender ? 'is-invalid' : ''}`}
        />}
      />
      {errors.gender && <p className='alert alert-danger'>{errors.gender.message}</p>}
    </div>

    
    <div>
      <label>Phone:</label>
      <Controller
        name="phone"
        control={control}
        defaultValue=""
        rules={{
          required: 'phone is required',
        
        }}
        render={({ field }) => <input  {...field}
        onBlur={field.onBlur}
        type="text" id='phone' 
        className={`form-control ${field.onBlur && errors.phone ? 'is-invalid' : ''}`}
        />}
      />
      {errors.phone && <p className='alert alert-danger'>{errors.phone.message}</p>}
    </div>

    <button type="submit" className="btn btn-default-outline d-block my-4 mx-auto ">
    {isLoading ? <i className="fa fa-spin fa-spinner"></i> : <><i className="fa fa-edit"></i>Register </>}
    </button>
  </form>
  </div>
  </>
  )
}
