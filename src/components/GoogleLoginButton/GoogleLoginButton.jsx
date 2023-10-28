import React from 'react'
import style from './GoogleLoginButton.module.css'
import { GoogleLogin } from '@react-oauth/google';

export default function GoogleLoginButton() {
  return (
    <div>
    <h2>Login with Google</h2>
    <GoogleLogin
      onSuccess={(userInfo) => {
        // Handle successful login
        console.log(userInfo);
      }}
    >
      Login with Google
    </GoogleLogin>
  </div>
  )
}
