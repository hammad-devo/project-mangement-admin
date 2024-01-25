import logo from './logo.svg';
import './App.css';
import Registration from './components/Forms/registration';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Forms/Login';
import { Provider } from'react-redux';
import {store} from './store/store';
import CreateQr from './components/Forms/CreateQr';
import Dashboard from './components/Dashboard';
import QR from './components/Tables/QR';
import Withdraw from './components/Tables/Withdraw';
import { useLayoutEffect, useReducer, useState } from 'react';
import { getData } from './callApi/backend_api';
import { initialState, reducer } from './components/Reducer';
import { ErrorMessage, SuccessMessage, Wait } from './components/Message';
import Context from './components/authenticate';
import Dashboard1 from './components/Dashboard1';
import Tanks from './components/Tanks';
import StaticAmount from './components/StaticAmount';
import MakePayment from './components/MakePayment';
import Users from './components/Tables/Users';
function App() {
  const [isLoggedIn,setIsLoggedIn]=useState({login:false,role:"user"});
  const [messages,dispatch]=useReducer(reducer,initialState)
  const [openWait,setOpenWait]=useState(false);
  const setLoggedInDetails=()=>{
    getData('/auth/isLoggedIn').then((res)=>{
      console.log(res);
      if(res){
        if(res.data.status==200){
          setIsLoggedIn({login:true,role:res.data.role});
         
        }
        else{
          setIsLoggedIn({login:false,role:undefined});
         
        }
      }
      
    }).catch(err=>{
      setIsLoggedIn({login:false,role:undefined});
    })
  
  }
  useLayoutEffect(()=>setLoggedInDetails,[])
  return (
    <Context.Provider value={{status:dispatch,setIsLoggedIn,wait:setOpenWait,setLoggedInDetails,isLoggedIn}}>
        <Wait open={openWait}/>
        <SuccessMessage open={messages.success} message={messages.message}/>
        <ErrorMessage open={messages.error} message={messages.message}/>
    <div className="App">
        <Router>
        <Routes>
            <Route path="/thanks/:id/:amount" element={<Tanks/>}/>
            <Route path="/static/:id" element={<StaticAmount/>}/>
            <Route path="/makePayment/:id" element={<MakePayment/>}/>
            <Route path="/" element={<Registration />} />
            <Route path="login/:id" element={<Login />} />
          
          <Route path="/dashboard" element={<Dashboard/>}>
          {isLoggedIn.login && isLoggedIn.role==='user'?
            <Route path="" element={<Dashboard1 />} />:null}
            {isLoggedIn && isLoggedIn.role==='user'?
              <Route path="qr-code" element={<QR />} />
              :null
            }
            <Route path="withdraw" element={<Withdraw />} />
            {isLoggedIn.login && isLoggedIn.role==="admin"?
            <Route path="users" element={<Users />} />
            :null
            }
          </Route>
          </Routes>
        </Router>
    </div>
    </Context.Provider>
  );
}

export default App;
