import React, { useContext} from 'react'
import { StoreContext } from '../../context/StoreContext'
import  './Cart.css'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const navigate = useNavigate();
  const context = useContext(StoreContext);
  if (!context) return null;
  const { food_list, removeFromCart, cartItems,totalCartValue } = context;

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return <div>
              <div className='cart-items-title cart-items-item'>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>X</p>
              </div>
              <hr />
            </div>
          }
        })}
      </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${totalCartValue()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${totalCartValue()===0?"0":2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${totalCartValue()===0?"0":totalCartValue()+2}</b>
              </div>
            </div>
            <button onClick={()=>navigate('/order')}>Process to Checkout</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>Enter here </p>
              <div className="cart-promocode-input">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart