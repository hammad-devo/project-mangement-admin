import React, { useContext, useState } from 'react'
import QRCode from "qrcode.react";
import axios from "axios"
import { postData } from '../../callApi/backend_api';
import Context from '../authenticate';
function CreateQr() {
  const [view, setView] = useState(false)
  const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)
  const [QR, setQR] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    type: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    wait(true)
    
      const formdata=new FormData();
      formdata.append('data', JSON.stringify({...formData}));
      postData('/qrcode/save',formdata).then(res => {
        if(res.data.status==200) {
          setQR('http://194.113.64.19/makePayment/'+res.data.data._id)
          setView(true)
          status({type: 'success', message: 'QR code created'})
        }
        else{
          status({type: 'error', message: "QR code not created"})

        }
        wait(false)
      })
    
  }
  const downloadQR = () => {
    const canvas = document.getElementById("123456");
    console.log(canvas)
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "123456.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (

    <div style={{ height: "auto", margin: "0 auto", width: "100%" }}>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-5">
            <div class="card">
              <h2 class="card-title text-center">{!view ? "Create QR Code" : "QR Code"}</h2>
              <div class="card-body py-md-4 align-self-center" >
                {!view ? <form _lpchecked="1">
                  <div class="form-group">
                    <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" id="customRadioInline1" name="type" value="static" onChange={handleChange} class="custom-control-input" />
                      <label class="custom-control-label" for="customRadioInline1">Static</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                      <input type="radio" id="customRadioInline2" name="type" class="custom-control-input" value="dynamic" onChange={handleChange}/>
                      <label class="custom-control-label" for="customRadioInline2">Dynamic</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" id="name" name='name' value={formData.name} placeholder="name" onChange={handleChange} />
                  </div>{formData.type==='dynamic'?
                  <div class="form-group">
                    <input type="number" class="form-control" id="amount" placeholder="amount" name='amount' value={formData.amount} onChange={handleChange} />
                  </div>:null}
                  <div class="d-flex flex-row align-items-center justify-content-between">
                    <button class="btn btn-primary" onClick={handleSubmit}>Add</button>
                  </div>
                </form> : <div className='d-flex' style={{ flexDirection: "column" }}>
                  <QRCode
                    id='123456'
                    size={256}
                    style={{ height: "auto", width: "200px" }}
                    value={QR}
                    viewBox={`0 0 256 256`}
                  />
                  <a onClick={downloadQR}> Download QR </a>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateQr