import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Context from './authenticate'
import { getData } from '../callApi/backend_api'
function MakePayment() {
    const {id} = useParams()
    const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)
    const pay=(data)=>{
        function makeid(length) {
            let result = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charactersLength = characters.length;
            let counter = 0;
            while (counter < length) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
              counter += 1;
            }
            return result;
        }
   
        const {
            name,
            amount,
            type
        } = data;
        if(type=="static"){
            console.log("hello")
            window.location.href = "http://194.113.64.19/static/"+id;
        }
        else{
        axios.post('https://sandbox-api-d.squadco.com/transaction/initiate', {
            "amount": amount*100,
            "email": "henimastic@gmail.com",
            "currency": "NGN",
            "initiate_type": "inline",
            "transaction_ref": makeid(10),
            "callback_url": "http://194.113.64.19/thanks/"+id+"/"+amount,
        }, {
            headers: {
                "Authorization": 'Bearer sandbox_sk_a157ab46704f88a65669d6a536396bf04128c10cf4a9'
            }
        }
        ).then(result => {
            window.location.href = result.data.data.checkout_url
        }).catch(err => {
            status({type:"error",message:"Error"})
        })
    }
    }
    useEffect(()=>{
        wait(true)
        
        getData('/qrcode/viewOne?id='+id).then(res=>{
            console.log(res)
            if(res.data.status==200){
            status({type:"success",message:"success"})
            pay(res.data.data)
            }
            else{
                status({type:"error",message:"error"})
            }
wait(false)
        })
    },[])
  return (
    <div>......</div>
  )
}

export default MakePayment