import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { updateData } from '../callApi/backend_api'
import Context from './authenticate'
function Tanks() {
    const { id,amount } = useParams()
    const [tanks, setTanks] = React.useState()
    const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)
    useEffect(()=>{
        wait(true)
        
        updateData('/user/addAmount?id='+id+"&amount="+amount, {id:id}).then(res=>{
            console.log(res)
            if(res.data.status === 200){
                status({type:'success',message:"Thanks"})
                setTanks(true)
            }
            else{
                status({type:'error',message:res.data.message})
            }
            wait(false)
        }

            )
            

    },[])
    return (
        <div class="content body">
            <div class="wrapper-1">
                <div class="wrapper-2">
                    <h1 className='h1'>{tanks?"Thank you !":"Sorry"}</h1>
                </div>            
            </div>
        </div>
    )
}

export default Tanks