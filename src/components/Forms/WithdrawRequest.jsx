import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../authenticate';
import { postData } from '../../callApi/backend_api';
function WithdrawRequest() {
    const [amount, setAmount] = React.useState(0)
   

    
const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)


const handleSubmit = (e) => {
    e.preventDefault()
    wait(true)
    postData('/withdraw/save?amount='+amount,{}).then(res => {
        console.log(res)
        if(res.data.status === 200){
            
            status({type:"success",message:"Withdraw successfully"})
        }
        else{
            status({type:"error",message:"Cannot withdraw"})
        }
        wait(false)
    })
}
      const handleChange=(e)=>{
        setAmount(e.target.value)
      }
  return (
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <div class="card">
                <h2 class="card-title text-center">Withdraw Amount</h2>
                <div class="card-body py-md-4">
                    <form _lpchecked="1">
                    <div class="form-group">
                    <input type="number" class="form-control" id="amount" placeholder="amount" name='amount' value={amount} onChange={handleChange} />
                  </div>
                        <div class="d-flex flex-row align-items-center justify-content-between">
                   
                            <button class="btn btn-primary" onClick={handleSubmit}>Withdraw</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default WithdrawRequest