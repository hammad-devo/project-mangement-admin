import React, { useEffect, useState } from 'react'
import { getData } from '../callApi/backend_api';

function Dashboard1() {
    const [data,setData]=useState({
        earnings: 0,
        withdraws: 0,
    });
    useEffect(()=>{
        getData('/user/dashboard').then(res=>{
            console.log(res);
            if(res.data.status===200){
               let e=res.data.data.user.earning;
               let w=0;
               res.data.data.withdraws.map(item=>{
                w+=item.amount;
            })
             
               setData({withdraws:w,earnings:res.data.data.user.earning});
            }
            
        });;
        
    },[])
  return (
    <div className='col-8'>
  <div class="container pt-5">
    <div class="row align-items-stretch">
      <div class="c-dashboardInfo col-lg-4 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Income</h4><span class="hind-font caption-12 c-dashboardInfo__count">€{data.earnings}</span>
        </div>
      </div>
      <div class="c-dashboardInfo col-lg-4 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Withdraw</h4><span class="hind-font caption-12 c-dashboardInfo__count">€{data.withdraws}</span>
        </div>
      </div>
      <div class="c-dashboardInfo col-lg-4 col-md-6">
        <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Balance</h4><span class="hind-font caption-12 c-dashboardInfo__count">€{data.earnings-data.withdraws}</span>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Dashboard1