import React, { useContext, useEffect } from 'react'
import Modal from '@mui/material/Modal';
import CreateQr from '../Forms/CreateQr';
import { deleteData, getData } from '../../callApi/backend_api';
import QRCode from "qrcode.react";
import Context from '../authenticate';
function QR() {
    const [open, setOpen] = React.useState(false);
    const [deleted, setDeleted] = React.useState(false);
    const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tableData, setTableData] = React.useState([]);
    useEffect(() => {
        getData('/qrcode/view').then(res => {
            if(res.data.status === 200) {
                setTableData(res.data.data);
            }
        })
    }, [deleted,open])
    const downloadQR = (index) => {
        const canvas = document.getElementById("abc"+index);
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
      const deleteData2=(id)=>{
        wait(true)
        deleteData('/qrcode/delete?id='+id).then(res=>{
            console.log(res)
            
            if(res.data.status === 200) {
                setDeleted(!deleted);
                status({type:'success',message:"Data Deleted Successfully"})

            }
            else{
                status({type:'error',message:"Data Deleted Error"})
            }
            wait(false)
        }) 
      }
    const TableData=tableData?tableData.map((data,index) =>{
        return(
            <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{data.name}</td>
                        <td>{data.amount?data.amount:0}</td>
                        <td><QRCode
                    id={"abc"+index}
                    size={256}
                    style={{ height: "auto", width: "100px" }}
                    value={'http://194.113.64.19/makePayment/'+data._id}

                    viewBox={`0 0 256 256`}
                  /></td>
                        <td>{data.type}</td>
                        <td className='d-flex justify-content-center'> 
                        <button type="button" class="btn btn-primary mr-2" style={{width:'100px',fontSize:'14px'}} onClick={()=>downloadQR(index)}>Download</button>
                        <button type="button" class="btn btn-primary ml-2" style={{width:'100px',fontSize:"14px"}} onClick={()=>deleteData2(data._id)}>Delete</button>
                        </td>
                        
            </tr>
        )
    }
    ):null
    return (
        <div className='col-8 col-sm-8 mt-3'>
        <button type="button" class="btn btn-primary" style={{float:"left"}} onClick={handleOpen}>Create QR Code</button>
        <table class="table" style={{marginTop:"70px"}}>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">QR_Code</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>                   
                </tr>
            </thead>
            <tbody>
                {TableData}
            </tbody>
        </table>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateQr/>
        </Modal>
        </div>
    )
}

export default QR