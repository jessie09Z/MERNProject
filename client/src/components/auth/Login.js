import React from 'react'
import { Fragment } from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../actions/auth'
const Login = ({login}) => {

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
       
        login({email, password});
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

Login.propTypes = {
  
  login:PropTypes.func.isRequired,
};


export default connect(null, {login})(Login)
