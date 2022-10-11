import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// const host = "http://localhost:3000";
const host = "https://mern-crud-app-dusky.vercel.app";

const View = () => {
    const [profile, setprofile] = useState([]);

    // getting the id from home component
    const location = useLocation();
    const { id } = location.state;

    // api call for reading profile from database
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

    // call funtion when component load
    useEffect(() => {
        readProfile();
    }, []);

    // filtering user in the basis of id coming from home component
    const a = profile.filter((ele) => {
        return ele._id === id;
    });

    return (
        <div className='add_container'>
            <div className='add_title'>
                <h3>View Profiles</h3>
            </div>
            {
                a.map((ele) => {
                    const base64String = btoa(
                        String.fromCharCode(...new Uint8Array(ele.photo.data.data))
                        // String.fromCharCode.apply(null, new Uint8Array(ele.photo.data.data))
                    )
                    return <div className='form_container' key={ele._id}>
                        <div className='view_container'>
                        <img alt='profile' src={`data:image/png;base64, ${base64String}`}/>
                        <ul className='list_container'>
                            <li className='input_container'>
                                <label>Name</label>
                                <input type='text' value={ele.name} />
                            </li>
                            <li className='input_container'>
                                <label>Age</label>
                                <input type='text' value={ele.age} />
                            </li>
                            <li className='input_container'>
                                <label>Contact</label>
                                <input type='text' value={ele.contact} />
                            </li>
                            <li className='input_container'>
                                <label>Address</label>
                                <input type='text' value={ele.address} />
                            </li>
                            {/* <li className='input_container'>
                                <label>Photo</label>
                                <input type='text' defaultValue={ele.photo} onChange={(event) => { setPhoto(event.target.value) }} />
                            </li> */}
                            {/* <li className='input_container'>
                            <input type='file' id='photo' onChange={(event) => { setPhoto(event.target.files[0]) }} />
                            </li> */}

                        </ul>
                        </div>
                        {/* <div className='add_button'>
                            <button onClick={() => {updateProfile()}}>Add</button>
                        </div> */}
                    </div>

                })
            }

        </div>
    )
}

export default View