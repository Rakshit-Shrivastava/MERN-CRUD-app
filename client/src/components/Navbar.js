import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar_container'>
        <ul>
            <li>
            <Link className='navbar_link' to="/">Home</Link>
            </li>
            <li>
            <Link className='navbar_link' to="/add">Add</Link>
            </li>
            {
              localStorage.getItem('token') ? <li className='navbar_li' onClick={()=>{
                localStorage.removeItem('token');
                navigate('login');
              }}>Logout</li> : ''
            }
        </ul>
    </div>
  )
}

export default Navbar