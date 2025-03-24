import React from 'react'
import { Fragment } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Login = () => {

    const [loginData, setLoginData] = useState(
        {"email":"",
        "password":""}
    );
    const {email, password}=loginData;
   const handleChange= e=>{setLoginData(
   { ...loginData, [e.target.name]:e.target.value}
   )

   }
    const handleSubmit=async e=>{
        e.preventDefault();
        const loginInfo ={email, password};
        const body=JSON.stringify(loginInfo);
        try {
            const config ={  headers:{"Content-Type": "application/json"}
          }
          const res=  await axios.post("/api/auth",body, config);
          console.log(res);
        } catch (error) {
            console.log("Unable to login");
            
        }
    }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i class="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    
    </Fragment>
  )
}

export default Login
