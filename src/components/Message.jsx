import React, { useContext, useState } from 'react'
import { Snackbar,Alert, CircularProgress, Modal, Box } from '@mui/material'
import Context from './authenticate'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};



function SuccessMessage(props) {
    const {open,message}=props
    const {status}=useContext(Context)
    
    const handleClose=()=>status({type:'success',message:null,value:true})
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
    </Alert>
    </Snackbar>
  )
}

function ErrorMessage(props) {
    const {open,message}=props
    const {status}=useContext(Context)
    
    const handleClose=()=>status({type:'error',message:null,value:true})
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
    </Alert>
    </Snackbar>
  )
}

function Wait(props){
  const {open}=props
  return(
    <Modal
    sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
  
  <CircularProgress sx={{width:'100px', height:'100px'}}/>
  </Modal>

)
}

function requiredError(formdata) {
 for(let [key,value] of Object.entries(formdata)){
  console.log(key,value)
  if(key!='__v'&&key!='_id'){
    if(value==null){
      return true
    }
    else if(value.toString().length<=0){
      
      return true

    }
  }
 }
 return false;
}

export {SuccessMessage,ErrorMessage,Wait,requiredError}