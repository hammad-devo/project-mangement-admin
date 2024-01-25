import React, { useContext, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import Context from './authenticate'
function Dashboard() {
  const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)
  const navigate=useNavigate();
  useEffect(()=>{
    if(!isLoggedIn.login){
        navigate('/login/user')
    }
},[isLoggedIn])
  return (
    <div className='row'>
        <Sidebar/>
        <Outlet/>
    </div>
  )
}

export default Dashboard