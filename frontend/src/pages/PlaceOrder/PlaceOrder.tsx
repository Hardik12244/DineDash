import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './PlaceOrder.css'
function PlaceOrder() {
  const context = useContext(StoreContext);
  if (!context) return null;
  const { totalCartValue } = context;

  return (
    <div className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="text" placeholder='email address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder='Pin Code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='phone No' />
      </div>
      <div className="place-order-right">
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
              <p>${totalCartValue() === 0 ? "0" : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${totalCartValue() === 0 ? "0" : totalCartValue() + 2}</b>
            </div>
          </div>

          <button>Process to Payment</button>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder