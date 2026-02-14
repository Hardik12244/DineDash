import React from 'react'
import { menu_list } from '../../assets/assets'
import './ExploreMenu.css'

type ExploreMenuProps={
    category:string;
    setCategory:React.Dispatch<React.SetStateAction<string>>

}

function ExploreMenu({category,setCategory}:ExploreMenuProps) {
    return (
        <div>

            <div className='explore-menu' id='explore-menu'>
                <h1>Explore your menu</h1>
                <p className='explore-menu-text'>Choose from diverse menu</p>
                <div className="explore-menu-list">
                    {menu_list.map((item, index) => {
                        return (
                            <div key={index} className='explore-menu-list-item' onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}>
                                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ExploreMenu