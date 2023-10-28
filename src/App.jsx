import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Notfound from './components/Notfound/Notfound';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { useContext, useEffect } from 'react';
import { tokenContext } from './Context/tokenContext';
import Allusers from './components/Allusers/Allusers';
import Alltasks from './components/Alltasks/Alltasks';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';
import UpdateTask from './components/UpdateTask/UpdateTask';
import axios from 'axios';



const routes = createBrowserRouter([{
  path: "", element: <Layout />, children: [
    {index:true,element: <ProtectedRoutes><Dashboard/> </ProtectedRoutes>},
    { path: "register", element: <Register /> },
    { path: "login", element: <Login /> },
    { path: "profile", element: <ProtectedRoutes> <Profile /> </ProtectedRoutes> },
    
    { path: "allusers", element: <ProtectedRoutes> <Allusers /> </ProtectedRoutes> },
    { path: "alltasks", element: <ProtectedRoutes> <Alltasks /> </ProtectedRoutes> },
    { path: "updatetask/:id", element: <ProtectedRoutes> <UpdateTask /> </ProtectedRoutes> },

    // { path: "message/:userId", element:  <SendMessage />  },

    { path: "*", element: <Notfound /> }
  ]
}])

function App() {

// const responseSuccessGoogle=(response)=>{
//   try{
//     axios.post("https://ititrello.onrender.com/googlelogin",{
//       tokenId: response.tokenId
//     }).then((res)=>{
//       console.log(res)
//     }).catch((err)=>{
//       console.log(err)
//     })
//   }catch(error){
//     console.log(error)
//   }
//   console.log(response)
// }

  let {setToken}= useContext(tokenContext)

  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"));
    }
  },[])


  return (
<>
<QueryClientProvider client={queryClient}>
<RouterProvider router={routes}></RouterProvider>
</QueryClientProvider>
</>
  );
}

export default App;
