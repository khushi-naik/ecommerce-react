import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';
import CheckouSteps from '../components/CheckoutSteps';

function PlaceOrderScreen(props){


const cart = useSelector(state => state.cart);
const { cartItems, shipping, payment } = cart;
if(!shipping.address){
    props.history.push("/shipping");
}

if(!payment.paymentMethod){
    props.history.push("/payment");
}


const dispatch = useDispatch();



const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping")
}

useEffect(() => {
    
},[])

    return <div>
        <CheckouSteps step1 step2 step3 step4></CheckouSteps>

        <div className="placeorder">
    <div className="placeorder-info">
    <div>
        <h3>Shipping Info</h3>
        <div>
            {cart.shipping.address}, {cart.shipping.city}, {cart.shipping.postalCode}, {cart.shipping.country} 
        </div>
    </div>
    <div>
        <h3>Payment Info</h3>
        <div>
            Payment Method: {cart.payment.paymentMethod}
        </div>
    </div>
    <div>
    
    <ul className="cart-list-container">
            <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
            </li>
            {
                cartItems.length === 0 ? 
                <div>
                Your Cart is Empty 
                </div> :
                cartItems.map(item => 
                <li>
                <div className="cart-image">
                    <img src= { item.image }/>
                </div>
                
                    
                    <div className="cart-name">
                        <div>
                            <Link to={ "/product/" + item.product }>
                            { item.name }
                            </Link>
                        </div>
                        <div>Qty: {item.qty}
                                                       
                        </div>
                    </div>
                    <div className="cart-price">
                       ${ item.price }
                    </div>
                
                </li>
                )
            }
        </ul>
    </div>
        
    </div>

    <div className="placeorder-action">
            <h3>
                Subtotal ( { cartItems.reduce((a, c) => a + c.qty, 0) } items)
                :
            $ { cartItems.reduce((a, c) => a + c.price*c.qty, 0) }
            </h3>

            <button onClick={ checkoutHandler } disabled={ cartItems.length === 0}> Proceed to CheckOut </button>
    </div>
    </div>
    </div>
    
    
    
}

export default PlaceOrderScreen;