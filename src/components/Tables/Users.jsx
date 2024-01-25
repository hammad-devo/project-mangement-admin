import { Modal } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { deleteData, getData } from '../../callApi/backend_api';
import Context from '../authenticate';
import WithdrawRequest from '../Forms/WithdrawRequest';

function Users() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [deleted, setDeleted] = React.useState(false);
    const {setIsLoggedIn,wait,status,isLoggedIn} = useContext(Context)
    const [tableData, setTableData] = React.useState([]);
    useEffect(() => {
        getData('/user/view').then(res => {
            if(res.data.status === 200) {
                setTableData(res.data.data);
            }
        })
    }, [deleted]);
    const deleteData2=(id)=>{
        wait(true)
        deleteData('/user/delete?id='+id).then(res=>{
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
                        <td>{data.username}</td>
                        <td>{data.email}</td>
                        <td className='d-flex justify-content-center'> 
                        <button type="button" class="btn btn-primary ml-2" style={{width:'100px',fontSize:"14px"}} onClick={()=>deleteData2(data._id)}>Delete</button>
                        </td>
     
            </tr>
        )
    }
    ):null
    return (
        <div className='col-8 col-sm-8 mt-3'>
            <table class="table" style={{marginTop:"70px"}}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {TableData}
                </tbody>
            </table>
            
        </div>
    )
}

export default Users