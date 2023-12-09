import React, { useState } from 'react'
import './css/login.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'


function Login() {
  const [auth,setAuth]=useAuth()
  const [email,setEmail]=useState()
  const[password,setPassword]=useState()
  const navigate = useNavigate();
  const handleSubmit=async()=>{
    try{
      const body={
        "email":email,
        "password":password}
      
   const res = await axios.post("/v1/auth/login",body);
   console.log(res);
    if(res.data.success){
      navigate('/');
      toast.success(res.data.message);
      setAuth({...auth,user:res.data.user,token:res.data.token})
      localStorage.setItem("auth",JSON.stringify(res.data));
    }
    else{
      toast.error(res.data.message);
    }
   
    }catch(err){
     console.log("Login data can't be send to api",err)
    }
  }
  return (
    <div className='login'>
      <div className='login_conatainer'>
       <div className='login_left'>
        <img src={require("./img/Illustration.png")}/>
       </div>
       <div className='login_right'>
        <div className='login_form'>
        <h5>Login</h5>
        <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"value={email}
           onChange={(e)=>setEmail(e.target.value)} required/>
        <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"  value={password}
           onChange={(e)=>setPassword(e.target.value)} required/>
        <label for="floatingPassword">Password</label>
        </div>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Log In</button>
        <p>Doesn't have account?<a href='/signup'>Sign up</a></p>
       </div>
       </div>
      </div>
    </div>
  )
}

export default Login
