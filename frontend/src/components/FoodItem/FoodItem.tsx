import React, { useContext, useState } from 'react'
import { assets, type FoodItemType } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

function FoodItem({ _id, name, description, price, image }: FoodItemType) {

    const context = useContext(StoreContext);
    if (!context) return null;

    const { cartItems, addToCart, removeFromCart } = context;
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={image} alt="" />
                {!cartItems[_id] ? <img onClick={() => addToCart(_id)} className='add' src={assets.add_icon_white} /> : <div className='food-item-counter'>
                    <img onClick={() => removeFromCart(_id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[_id]}</p>
                    <img onClick={() => addToCart(_id)} src={assets.add_icon_green} alt="" />
                </div>}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className='food-item-price'>${price}</p>
            </div>
        </div>
    )
}

export default FoodItem