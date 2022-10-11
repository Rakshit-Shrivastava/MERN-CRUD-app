import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import host from '../config';

const Login = () => {
    const [auth, setAuth] = useState('Signin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // api call for login
    const login = async () => {
      const response = await fetch(`${host}/user/auth/login`, {
        method: 'POST',
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      });
      const json = await response.json();
      if(json.success){
        localStorage.setItem('token', json.token);
        navigate('/')
      }else{
        navigate('/login');
        alert("invalid credentials");
      };
    }

    // api call for creating user
    const createUser = async () => {
      console.log('inside creatuser')
      const response = await fetch(`${host}/user/auth/createUser`, {
        method: 'POST',
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      });
      const json = await response.json();
      if(json.success){
        localStorage.setItem('token', json.token);
        navigate('/')
      }else{
        navigate('/login');
        alert("invalid credentials");
      };
    }
  return (
    <div className='login_container'>
        <h1>please {auth}</h1>
        <div className='login_form'>
        <input type='email' required placeholder='Enter your email' value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
        <input type='password' required minLength={5} placeholder='Enter your password' value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
        <button className='login_btn' onClick={auth === 'Signin'? ()=>{login()} : ()=>{createUser()} }>{auth}</button>
        </div>
        {
            auth === 'Signin' ? <h6 style={{cursor: 'pointer'}} onClick={()=>{setAuth('Signup')}}>Don't have an account, Signup</h6> : <h6 style={{cursor: 'pointer'}} onClick={()=>{setAuth('Signin')}}>Already have an acount, Signin</h6>
        }
    </div>
  )
}

export default Login