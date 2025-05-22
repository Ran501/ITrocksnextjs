'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    // Initialize cart
    const storedCart = localStorage.getItem('cart');
    if (!storedCart) {
      localStorage.setItem('cart', JSON.stringify([]));
      setCart([]);
    } else {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const displayToast = useCallback((message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }, []);

  const addItemToCart = useCallback((title, price, imageSrc) => {
    const newCart = [...cart];
    const existingItem = newCart.find(item => item.title === title);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({ title, price, image: imageSrc, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
    displayToast(`${title} added to cart!`);
  }, [cart, displayToast]);

  const changeQuantity = useCallback((index, change) => {
    const newCart = [...cart];
    newCart[index].quantity += change;
    
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  }, [cart]);

  const removeItem = useCallback((index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);

    if (newCart.length === 0) {
      displayToast('Your cart is now empty!');
      setShowModal(false);
    }
  }, [cart, displayToast]);

  const proceedToCheckout = useCallback(() => {
    if (cart.length === 0) {
      displayToast('Your cart is empty!');
      return;
    }

    displayToast('Finished checking out! Thank you for your purchase.');
    localStorage.setItem('cart', JSON.stringify([]));
    setCart([]);
    setShowModal(false);
  }, [cart, displayToast]);

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Cart Badge */}
      {totalItems > 0 && (
        <div className="cart-badge">
          {totalItems}
        </div>
      )}

      {/* Toast Message */}
      {showToast && createPortal(
        <div className="toast-message">
          {toastMessage}
        </div>,
        document.body
      )}

      {/* Cart Modal */}
      {showModal && (
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <span 
              className="close-modal"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h2>Your Cart</h2>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="cart-item-img"
                  />
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>Nu.{item.price.toFixed(2)} x {item.quantity}</p>
                    <p>Subtotal: Nu.{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="item-actions">
                    <button 
                      className="quantity-btn"
                      onClick={() => changeQuantity(index, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => changeQuantity(index, 1)}
                    >
                      +
                    </button>
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <p>Total Items: {totalItems}</p>
              <p>Total Price: Nu.{totalPrice.toFixed(2)}</p>
              <button 
                className="checkout-btn"
                onClick={proceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}