import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Add = () => {
    const [profile, setprofile] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [photo, setPhoto] = useState('');

    var formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('contact', contact);
    formData.append('address', address);
    formData.append('photo', photo);

    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state;


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

    useEffect(() => {
        readProfile();
    }, []);

    const a = profile.filter((ele) => {
        return ele._id === id;
    });



    //     for (var pair of formData.entries())
    // {
    //  console.log(pair[0]+ ', '+ pair[1]); 
    // }

    const updateProfile = async () => {
        const response = await fetch(`http://localhost:3000/user/profile/updateProfile/${id}`, {
            method: 'PUT',
            headers: {
                "token": localStorage.getItem('token')
            },
            // body: JSON.stringify({ name, age, contact, address, photo })
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
                        // String.fromCharCode.apply(null, new Uint8Array(ele.photo.data.data))
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