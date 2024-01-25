import { Modal } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { getData, updateData,updateStatus } from '../../callApi/backend_api';
import Context from '../authenticate';
import WithdrawRequest from '../Forms/WithdrawRequest';

function Withdraw() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [updateData,setUpdata]=useState(false)
    const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)
    const [tableData, setTableData] = React.useState([]);
    useEffect(() => {
        if(isLoggedIn.role === 'user')
        getData('/withdraw/view').then(res => {
            if(res.data.status === 200) {
                setTableData(res.data.data);
            }
        })
        else
        getData('/withdraw/viewAdmin').then(res => {
            if(res.data.status === 200) {
                setTableData(res.data.data);
            }
        })
    }, [updateData]);
    const updateData2=(id)=>{
        updateStatus('/withdraw/updateStatus?id='+id, {status:"PAID"}).then((res)=>{
            if(res.data.status === 200) {
                setUpdata(true)
            }
        })
        }
    const toDate=(date)=>{
        const d = new Date(date);
        const year = d.getFullYear();
        const month=d.getMonth()+1;
        const day = d.getDate();
        return `${day}/${month}/${year}`;
    }
    const TableData=tableData?tableData.map((data,index) =>{
        return(
            <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{toDate(data.date)}</td>
                        <td>{data.amount}</td>
                        <td>{data.status}</td>
                        {isLoggedIn.login && isLoggedIn.role === 'admin'?
                             <td className='d-flex justify-content-center'> 
                             <button type="button" class="btn btn-primary ml-2" style={{width:'100px',fontSize:"14px"}} disabled={data.status=='PAID'} onClick={()=>updateData2(data._id)}>{data.status!="PAID"?"Approve":"Approved"}</button>
                             </td>:null                        
                        }
     
            </tr>
        )
    }
    ):null
    return (
        <div className='col-8 col-sm-8 mt-3'>
            {isLoggedIn.role==='user'?<button type="button" class="btn btn-primary" style={{float:"left"}} onClick={handleOpen}>New Withdraw Request</button>:null}
            <table class="table" style={{marginTop:"70px"}}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        {
                            isLoggedIn.login && isLoggedIn.role==='admin'?
                            <th scope="col">Action</th>
                            :null
                        }
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
        <WithdrawRequest/>
        </Modal>
        </div>
    )
}

export default Withdraw