import axios from "axios"
const callApi= {
   getData: async (api)=>{
    try{
      const res=await axios.get(process.env.REACT_APP_API_URL+api,{
      withCredentials:true,
    
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
  postData: async (api,data)=>{
    try{
      const res=await axios.post(process.env.REACT_APP_API_URL+api,data,{
      withCredentials:true,
     
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
  deleteData: async (api)=>{
    try{
      const res=await axios.delete(process.env.REACT_APP_API_URL+api,{
    
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
  updateData: async (api,data)=>{
    try{
      const res=await axios.put(process.env.REACT_APP_API_URL+api,data,{
    
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
  updateStatus: async (api,data)=>{
    try{
      const res=await axios.put(process.env.REACT_APP_API_URL+api,JSON.stringify({status:data}),{
   
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
}
const {postData,getData,updateData,deleteData,updateStatus}=callApi
export {postData,getData,updateData,deleteData,updateStatus}