import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [profile, setprofile] = useState([]);
  const [deleteprofile, setDeleteprofile] = useState('')

  const navigate = useNavigate();

  // api call to read all the profiles from database
  const readProfile = async () => {
    const response = await fetch('http://localhost:3000/user/profile/readProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "token": localStorage.getItem('token')
      }
    });
    const data = await response.json();
    setprofile(data);
  }

  // contitional rendering of the component
  useEffect(() => {
    if (localStorage.getItem('token')) {
      readProfile();
    } else {
      navigate('/login');
    }
  }, []);

  // api call to delete the profile
  const deleteProfile = async (id) => {
    const response = await fetch(`http://localhost:3000/user/profile/deleteProfile/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "token": localStorage.getItem('token')
      }
    });
    const data = await response.json();
    setDeleteprofile(data);
  }

  // rendering component on the basis of delete state
  useEffect(() => {
    readProfile();
  }, [deleteprofile]);

  return (
    <div className='home_container'>
      <div className='home_title'>
        <h3>All Profiles</h3>
      </div>
      <div className='home_table'>
        <table>
          <thead>
            <tr>
              <th>SNo.</th>
              <th>Name</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              profile.map((ele) => {
                return <tr key={ele._id}>
                  <td>{profile.indexOf(ele) + 1}</td>
                  <td>{ele.name}</td>
                  <td>{ele.age}</td>
                  <td>{ele.contact}</td>
                  <td>{ele.address}</td>
                  <td className='table_btn'>
                    <Link to='/view' state={{ id: ele._id }}>
                      <button className='home_btn view_btn'>View</button>
                    </Link>
                    <Link to='/edit' state={{ id: ele._id }}>
                      <button className='home_btn edit_btn'>Edit</button>
                    </Link>
                    <button className='home_btn delete_btn' onClick={() => { deleteProfile(ele._id) }}>Delete</button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home