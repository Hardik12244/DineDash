import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

type setShowLogin = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginPopup({ setShowLogin }: setShowLogin) {
    const context = useContext(StoreContext);
    if (!context) return
    const { url,setToken } = context;
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += '/api/user/signIn'
        } else {
            newUrl += '/api/user/signUp'
        }
        const response = await axios.post(newUrl,data);
        
        if(response.data.success){
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }else{
            alert(response.data.msg)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input placeholder='Your Name' name='name' onChange={onChangeHandler} value={data.name} required type="text" /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} placeholder='email' required type="text" />
                    <input name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required type="text" />
                </div>
                <button type='submit'> {currState === "Sign Up" ? "create account" : "login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing i agree to terms and conditions</p>
                </div>
                {currState === "Login" ? <p>Create new account ? <span onClick={() => setCurrState("Sign Up")}>Click here </span></p> : <p>Already have account ? <span onClick={() => setCurrState("Login")}>Click here </span></p>}

            </form>

        </div>
    )
}

export default LoginPopup