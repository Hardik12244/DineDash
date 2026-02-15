import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import './FoodDisplay.css'

type category = {
    category : string;
}
function FoodDisplay({category}:category) {
    const context = useContext(StoreContext);
    if (!context) return null;
    const { food_list } = context;
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if(category==="All"||category===item.category){
                        return <FoodItem key={index} _id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} category={item.category} />
                    }
                    
                })}
            </div>
        </div>
    )
}

export default FoodDisplay