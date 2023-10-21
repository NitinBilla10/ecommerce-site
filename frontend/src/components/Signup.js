import React, { useState } from 'react'
import './css/signup.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


function Signup() {
    const [name,setName]=useState()
    const [phone,setphone]=useState()
    const [address,setAddress]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate = useNavigate();
    const handleSubmit=async()=>{
        try{
           const res = await axios.post("http://localhost:3000/v1/auth/register",{name,email,password,phone,address});
         
           if(res.data.success){
            toast.success("Registered Successfully");
            navigate('/login');
           }
           else{
            toast.error(res.data.message);
           }
           console.log(res);

        }
        catch(err){
            console.log("data can't send to api",err)
        }

    }
  return (
    <div className='signup'>
      
        <div className='signup_conatainer'>
       <div className='signup_left'>
        <img src={require("./img/Illustration.png")}/>
       </div>
       <div className='signup_right'>
        <div className='signup_form'>
        <h5>Sign Up</h5>
        <div className='row'>
        <div className='col'>
        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <label for="floatingInput">Name</label>
        </div>
        </div>
        <div className='col'>
        <div class="form-floating mb-3">
        <input type="text" pattern="[0-9]" class="form-control" id="floatingInput" placeholder="name@example.com"
        value={phone}
        onChange={(e)=>setphone(e.target.value)}
        />
        <label for="floatingInput">Contact</label>
        </div>
        </div>
        </div>
        <div class="form-floating mb-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com"
           value={address}
           onChange={(e)=>setAddress(e.target.value)}/>
        <label for="floatingInput">Address</label>
        </div>
        <div class="form-floating mb-3">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
           value={email}
           onChange={(e)=>setEmail(e.target.value)}/>
        <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
           value={password}
           onChange={(e)=>setPassword(e.target.value)}/>
        <label for="floatingPassword">Password</label>
        </div>
        <button type="button" onClick={handleSubmit}class="btn btn-primary">Submit</button>
        <p>Already Have Account?<a href='/login'>Log In</a></p>
       </div>
       </div>
      </div>
      <Toaster/>
    </div>
  )
}

export default Signup
