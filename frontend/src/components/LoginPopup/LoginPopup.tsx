import React, { useState } from 'react'
import { assets } from '../../assets/assets';
import './LoginPopup.css'
type setShowLogin = {
    setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginPopup({ setShowLogin }: setShowLogin) {
    const [currState, setCurrState] = useState("Login");
    return (
        <div className='login-popup'>
            <form action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} onClick={() => setShowLogin(false)} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <input placeholder='Your Name' required type="text" /> : <></>}
                    <input placeholder='email' required type="text" />
                    <input placeholder='Password' required type="text" />
                </div>
                <button> {currState === "Sign Up" ? "create account" : "login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing i agree to terms and conditions</p>
                </div>
                {currState === "Login" ? <p>Create new account ? <span onClick={() => setCurrState("Sign up")}>Click here </span></p> : <p>Already have account ? <span onClick={() => setCurrState("Login")}>Click here </span></p>}


            </form>


        </div>
    )
}

export default LoginPopup