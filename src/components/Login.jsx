import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // localStorage.removeItem('user');
    const { updateUser } = useContext(AuthContext);
    const navigate=useNavigate()
    var [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    async function loginPost() {
        await fetch('https://musicfyapi.sandeepsingh126.repl.co/api/auth/login', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(function (json) {

            updateUser(json);
            navigate('/')
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
        loginPost();
        setFormData({
            username: "",
            password: "",
        })
        // console.log(formData);
    }
    return (
        <div className='homePage loginPage'>
        <div className='loginCard'>
            <h2>Welcome Back</h2>
            <form>
                <input required onChange={handleChange} value={formData.username} type='text' name='username' placeholder='Username' />
                <input required onChange={handleChange} type='password' value={formData.password} name='password' placeholder='Password' />
                <button onClick={handleSubmit}>Submit</button>
            </form>
            <span onClick={function(){
                navigate('/register')
            }}>New to Musicfy, <a>register</a> here</span>
        </div>
        </div>
    )
}

export default Login