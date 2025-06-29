import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  // Calculate subtotal for a single item (quantity × unit cost)
  const calculateTotalCost = (item) => {
    return (item.quantity * item.cost).toFixed(2);
  };

  // Calculate total cost for all items in the cart
  const calculateTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + item.quantity * item.cost, 0)
      .toFixed(2);
  };

  // Handle incrementing item quantity
  const handleIncrement = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  // Handle decrementing item quantity
  const handleDecrement = (id) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      if (item.quantity > 1) {
        dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
      } else {
        dispatch(removeItem(id));
      }
    }
  };

  // Handle removing item from cart
  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  // Handle checkout (placeholder)
  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart ({totalQuantity} items)</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Unit Cost: ${item.cost.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <div className="cart-item-actions">
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                  <button onClick={() => handleDecrement(item.id)}>−</button>
                  <button onClick={() => handleRemove(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ${calculateTotalAmount()}</h3>
            <button onClick={onContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;