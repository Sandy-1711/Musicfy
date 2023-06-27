import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { updateUser } = useContext(AuthContext)
    const navigate = useNavigate()
    var [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
    async function signupPost() {
        var check=false;
        await fetch('https://musicfyapi.sandeepsingh126.repl.co/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        }).then(function (response) {
            if(response.status===200)
            {
                check=true;
            }
            return response.json();
        }).then(function (json) {
            updateUser(json);
            if(check===true)
            {

                navigate('/')
            }
            else{
                alert('Error creating account')
            }
            console.log(json);
            return json;
        }).catch(function (err) {
            console.log(err);
        })
    }
    function handleChange(e) {
        var { name, value } = e.target;
        setFormData(function (prev) {
            return { ...prev, [name]: value };
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        signupPost()
        // console.log(formData);
        setFormData({
            username: "",
            email: "",
            password: "",
        })
    }
    return (
        <div className='homePage loginPage'>
            <div className='loginCard'>
                <h2>Registration</h2>
                <form>
                    <input required onChange={handleChange} type='text' name='username' placeholder='Username' />
                    <input required onChange={handleChange} type='email' name='email' placeholder='Email' />
                    <input required  minLength='8' onChange={handleChange} type='password' name='password' placeholder='Password' />
                    <button onClick={handleSubmit}>Submit</button>
                </form>
                <span>Already a user? <a onClick={function(){
                    navigate('/login')
                }}>login</a></span>
            </div>
        </div>
    )
}

export default Register