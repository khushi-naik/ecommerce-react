import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { saveShipping } from '../actions/cartActions';
import CheckouSteps from '../components/CheckoutSteps';


function ShippingScreen (props) {
      
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
   
    const dispatch = useDispatch();
    

    

   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(saveShipping({ address, city, postalCode, country }));
       props.history.push('payment');
   }

    return <div>
        <CheckouSteps step1 step2 ></CheckouSteps>

        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h3>Shipping</h3>
                </li>
               
                <li>
                    <label htmlFor="address">Address: </label>
                    <input type="text" id="address" name="address" onChange={(e) => setAddress(e.target.value)} placeholder="eg. Khushi Naik"/>
                </li>
                <li>
                    <label htmlFor="city">City: </label>
                    <input type="text" id="city" name="city" onChange={(e) => setCity(e.target.value)} placeholder="eg. Khushi Naik"/>
                </li>
                <li>
                    <label htmlFor="postalCode">Postal Code: </label>
                    <input type="text" id="postalCode" name="postalCode" onChange={(e) => setPostalCode(e.target.value)} placeholder="eg. Khushi Naik"/>
                </li>
                <li>
                    <label htmlFor="country">Country: </label>
                    <input type="text" id="country" name="country" onChange={(e) => setCountry(e.target.value)} placeholder="eg. Khushi Naik"/>
                </li>
               
                <li>
                    <button type="submit">Continue</button>
                </li>
               
            </ul>
        </form>

    </div>
    </div>
    
    
    
    
}

export default ShippingScreen;