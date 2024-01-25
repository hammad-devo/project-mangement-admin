import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function StaticAmount() {
    const [amount, setAmount] = React.useState(0)
    const { id } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault();
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
        axios.post('https://sandbox-api-d.squadco.com/transaction/initiate', {
    
          "amount": amount * 100,
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
          console.log(err)
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
                <h2 class="card-title text-center">Amount Pay</h2>
                <div class="card-body py-md-4">
                    <form _lpchecked="1">
                    <div class="form-group">
                    <input type="number" class="form-control" id="amount" placeholder="amount" name='amount' value={amount} onChange={handleChange} />
                  </div>
                        <div class="d-flex flex-row align-items-center justify-content-between">
                   
                            <button class="btn btn-primary" onClick={handleSubmit}>Pay</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default StaticAmount