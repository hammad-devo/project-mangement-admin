import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { postData } from '../callApi/backend_api';
import Context from './authenticate';

function SidebarMain() {
    const [active,setActive]=useState('dashboard');
    const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)
    const navigate=useNavigate();
    const navigateTo=(url)=>{
        setActive(url?url:'dashboard');
        if(url)
        navigate('/dashboard/'+url);
        else
        navigate('/dashboard');
    }
    const logout=()=>{
      postData('/auth/logout',{logout:true}).then(res=>{
        if(res.data.status === 200){
          setIsLoggedIn({login:false,role:undefined});
          navigate('/login/user');
        }
      })
    }
    return (
        <div className='col-3'>
        <nav class="d-none d-sm-block bg-light sidebar">
        <ul class="nav nav-pills flex-column">
           {isLoggedIn.login && isLoggedIn.role=='user'?
            <li class="nav-item">
            <a class={active=='dashboard'?"nav-link active":"nav-link"} onClick={()=>navigateTo()} >Dashboard</a>
          </li>:null}
          {isLoggedIn.login && isLoggedIn.role=='user'?
            <li class="nav-item">
            <a class={active=='qr-code'?"nav-link active":"nav-link"} onClick={()=>navigateTo('qr-code')} >QR Codes</a>
          </li>:null}
          <li class="nav-item">
            <a class={active=='withdraw'?"nav-link active":"nav-link"} onClick={()=>navigateTo('withdraw')} >Withdraw</a>
          </li>
          {isLoggedIn.login && isLoggedIn.role==="admin"?
          <li class="nav-item">
            <a class={active=='users'?"nav-link active":"nav-link"} onClick={()=>navigateTo('users')} >Users</a>
          </li>:null}
          <li class="nav-item">
            <a class={active=='withdraw'?"nav-link":"nav-link"} onClick={()=>logout()} >Logout</a>
          </li>
          
        </ul>
      </nav>
      </div>
    )
}

export default SidebarMain