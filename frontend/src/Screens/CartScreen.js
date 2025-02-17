import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom';

function CartScreen(props){
const cart = useSelector(state => state.cart);
const { cartItems } = cart;
const productId = props.match.params.id;
const qty = props.location.search ? Number(props.location.search.split("=")[1]): 1;
const dispatch = useDispatch();

const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
}

const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping")
}

useEffect(() => {
    if(productId){
        dispatch(addToCart(productId,qty))
    }
},[])

    return <div className="cart">
    <div className="cart-list">
        <ul className="cart-list-container">
            <li>
                <h2>Shopping Cart</h2>
                <div>Price</div>
            </li>
            {
                cartItems.length === 0 ? 
                <div>
                Your Cart is Empty 
                </div> :
                cartItems.map(item => 
                <li className="cart-item">
                <div className="cart-image">
                    <img src= { item.image }/>
                </div>
                
                    
                    <div className="cart-name">
                        <div>
                            <Link to={ "/product/" + item.product }>
                            { item.name }
                            </Link>
                        </div>
                        <div>
                            <select className="quantity" value={ item.qty } onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                            { [...Array(item.countInStock).keys()].map(x =>
                                <option key={ x+1 } value={ x+1 }>Qty: { x+1 }</option>
                            )}                                
                            </select>
                            <button onClick={ () => removeFromCartHandler(item.product) }> Delete</button>
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

    <div className="cart-action">
            <h3>
                Subtotal ( { cartItems.reduce((a, c) => a + c.qty, 0) } items)
                :
            $ { cartItems.reduce((a, c) => a + c.price*c.qty, 0) }
            </h3>

            <button onClick={ checkoutHandler } disabled={ cartItems.length === 0}> Proceed to CheckOut </button>
    </div>
    </div>
}

export default CartScreen;