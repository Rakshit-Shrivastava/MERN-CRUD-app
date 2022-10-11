import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// const host = "http://localhost:3000";
const host = "https://mern-crud-app-dusky.vercel.app";

const Add = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');

  const navigate = useNavigate();

  // rendering component on the basic of token
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);

  // creating formdata multi/part for file upload
  var formData = new FormData();
  formData.append('name', name);
  formData.append('age', age);
  formData.append('contact', contact);
  formData.append('address', address);
  formData.append('photo', photo);


  // api call to create a new profile and upload it to the database
  const createProfile = async () => {
    if(name === '' || age === '' || contact === '' || address === '' || photo === ''){
      return alert('All fields are required');
    }
    const response = await fetch(`${host}/user/profile/createProfile`, {
      method: 'POST',
      headers: {
        "token": localStorage.getItem('token')
      },
      body: formData
    });
    const data = await response.json();
    navigate('/');
  }

  return (
    <div className='add_container'>
      <div className='add_title'>
        <h3>Add Profiles</h3>
      </div>
      <div className='form_container'>
        <ul className='list_container'>
          <li className='input_container'>
            <label>Name</label>
            <input type='text' required onChange={(event) => { setName(event.target.value) }} />
          </li>
          <li className='input_container'>
            <label>Age</label>
            <input type='text' required onChange={(event) => { setAge(event.target.value) }} />
          </li>
          <li className='input_container'>
            <label>Contact</label>
            <input type='text' required onChange={(event) => { setContact(event.target.value) }} />
          </li>
          <li className='input_container'>
            <label>Address</label>
            <input type='text' required onChange={(event) => { setAddress(event.target.value) }} />
          </li>
          <li className='input_container'>
            <input type='file' id='photo' required onChange={(event) => { setPhoto(event.target.files[0]) }} />
          </li>
        </ul>
        <div className='add_button'>
          <button className='add_btn' onClick={() => { createProfile() }}>Add</button>
        </div>
        <div className='image_warning'>
          <h6>Please upload a png image only of size under 10kb*</h6>
        </div>
      </div>
    </div>
  )
}

export default Add