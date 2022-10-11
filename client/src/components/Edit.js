import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// const host = "http://localhost:3000";
const host = "https://mern-crud-app-dusky.vercel.app";

const Add = () => {
    const [profile, setprofile] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState('');

    //creating formdata multi/part for file upload
    var formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('contact', contact);
    formData.append('address', address);
    formData.append('photo', photo);

    const navigate = useNavigate();

    // using location hook to get id from link state
    const location = useLocation();
    const { id } = location.state;

    // api call to read profile from data base and to display it to frontend
    const readProfile = async () => {
        const response = await fetch(`${host}/user/profile/readProfile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "token": localStorage.getItem('token')
            }
        });
        const data = await response.json();
        setprofile(data);
    }

    // rendering component only one time
    useEffect(() => {
        readProfile();
    }, []);

    // filltering id that is coming from home component among all the ids.
    const a = profile.filter((ele) => {
        return ele._id === id;
    });

    // api call to update profile data onto database
    const updateProfile = async () => {
        const response = await fetch(`${host}/user/profile/updateProfile/${id}`, {
            method: 'PUT',
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
                <h3>Update Profiles</h3>
            </div>
            {
                a.map((ele) => {
                    const base64String = btoa(
                        String.fromCharCode(...new Uint8Array(ele.photo.data.data))
                    )
                    return <div className='form_container' key={ele._id}>
                        <div className='edit_container'>
                            <img alt='profile' src={`data:image/png;base64, ${base64String}`} width='30' />
                            <ul className='list_container'>
                                <li className='input_container'>
                                    <label>Name</label>
                                    <input type='text' defaultValue={ele.name} onChange={(event) => { setName(event.target.value) }} />
                                </li>
                                <li className='input_container'>
                                    <label>Age</label>
                                    <input type='text' defaultValue={ele.age} onChange={(event) => { setAge(event.target.value) }} />
                                </li>
                                <li className='input_container'>
                                    <label>Contact</label>
                                    <input type='text' defaultValue={ele.contact} onChange={(event) => { setContact(event.target.value) }} />
                                </li>
                                <li className='input_container'>
                                    <label>Address</label>
                                    <input type='text' defaultValue={ele.address} onChange={(event) => { setAddress(event.target.value) }} />
                                </li>
                                <li className='input_container'>
                                    <input type='file' id='photo' onChange={(event) => { setPhoto(event.target.files[0]) }} />
                                </li>
                                <div className='edit_button_container'>
                                    <button className='edit_button' onClick={() => { updateProfile() }}>Update</button>
                                </div>
                            </ul>
                        </div>
                        <div className='edit_image_warning'>
                            <h6>Please upload a png image only of size under 10kb*</h6>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default Add