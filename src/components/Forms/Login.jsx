import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { actioncreator } from '../../store';
import { useDispatch } from 'react-redux';
import Context from '../authenticate';
import { postData } from '../../callApi/backend_api';
function Login() {
    const {id}=useParams()
const navigate=useNavigate();
const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)
const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
})
const handleChange = (e) => {
    setFormData({
      ...formData,
        [e.target.name]: e.target.value,
    })
}
const handleSubmit = (e) => {
    e.preventDefault()
    const formdata=new FormData()
    wait(true)
    formdata.append('data', JSON.stringify(formData))
    if(id=='admin')
    {
        postData('/auth/loginAdmin',formdata).then(res => {
            if(res.data.status === 200){
                setIsLoggedIn({login:true,role:"admin"})
                status({type:"success",message:"Login Success"})
            }
            else{
                status({type:"error",message:"Login Failed"})
            }
            wait(false)
        })    
    }
    else{
    postData('/auth/login',formdata).then(res => {
        if(res.data.status === 200){
            setIsLoggedIn({login:true,role:"user"})
            status({type:"success",message:"Login Success"})
        }
        else{
            status({type:"error",message:"Login Failed"})
        }
        wait(false)
    })
}
}
useEffect(()=>{
    if(isLoggedIn.login){
        navigateTo('dashboard')
    }
},[isLoggedIn])

const navigateTo=(url)=>{
    navigate('/'+url);
}
    return (
    <div class="container">
        <button class="btn btn-primary" onClick={()=>navigate('/login/admin')}>Admin Login</button>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card">
                <h2 class="card-title text-center">Login New Payment Gateway</h2>
                <div class="card-body py-md-4">
                    <form _lpchecked="1">
                        <div class="form-group">
                            <input type="email" class="form-control" id="email" name='email' value={formData.email} placeholder="Email" onChange={handleChange}/>
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange}/>
                        </div>
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <a onClick={()=>navigateTo('')} style={{cursor:"pointer"}}>Create Account</a>
                            <button class="btn btn-primary" onClick={handleSubmit}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Login