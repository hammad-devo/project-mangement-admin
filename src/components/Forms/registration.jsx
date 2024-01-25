import React, { useContext, useEffect } from 'react'
import { Link, useNavigate, useNavigation } from 'react-router-dom'
import { postData } from '../../callApi/backend_api'
import Context from '../authenticate'
function Registration() {
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
        postData('/auth/registor',formdata).then(res => {
            console.log(res)
            if(res.data.status === 200){
                setIsLoggedIn({login:true,role:"user"})
                status({type:'success',message:"Registration Successful"})
            }
            else{
                status({type:'error',message:"Registration Failed"})

            }
            wait(false)

        })
    }
    useEffect(()=>{
        if(isLoggedIn.login){
            navigateTo('dashboard')
        }
    },[isLoggedIn])

    const navigate=useNavigate();
    const navigateTo=(url)=>{
        navigate('/'+url)
    }
    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card">
                        <h2 class="card-title text-center">Register New Payment Gateway</h2>
                        <div class="card-body py-md-4">
                            <form _lpchecked="1">
                                <div class="form-group">
                                    <input type="text" class="form-control" id="name" placeholder="Name" value={formData.username} onChange={handleChange} name="username"/>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control" id="email" placeholder="Email" value={formData.email} onChange={handleChange} name="email"/>
                                </div>
                                <div class="form-group">
                                    <input type="password" class="form-control" id="password" placeholder="Password" value={formData.password} onChange={handleChange} name="password"/>
                                </div>
                                <div class="d-flex flex-row align-items-center justify-content-between">
                                    <a onClick={()=>navigateTo('login/user')} style={{cursor:'pointer'}}>Login</a>
                                    <button class="btn btn-primary" onClick={handleSubmit}>Create Account</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Registration