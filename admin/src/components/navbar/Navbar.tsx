import React from 'react'
import { assets } from '../../assets/assets'
import './navbar.css'

const navbar = () => {
    return (
        <div>
            <div className="navbar">
                <img className='logo' src={assets.logo} alt="" />
                <img className='profile' src={assets.profile_image} alt="" />
            </div>

        </div>
    )
}

export default navbar