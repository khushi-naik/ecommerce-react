import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckouSteps from '../components/CheckoutSteps';


function PaymentScreen (props) {
      
    const [paymentMethod, setPaymentMethod] = useState('');
    
   
    const dispatch = useDispatch();
    

    

   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(savePayment({ paymentMethod }));
       props.history.push('placeorder');
   }

    return <div>
        <CheckouSteps step1 step2 step3></CheckouSteps>

        <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h3>Payment</h3>
                </li>
               
                <li>
                <div>
                <input value="paypal" type="radio" id="paymentMethod" name="paymentMethod" onChange={(e) => setPaymentMethod(e.target.value)} placeholder="eg. Khushi Naik"/>
                    <label htmlFor="paymentMethod">PayPal </label>
                </div>   
                </li>
                               
                <li>
                    <button type="submit">Continue</button>
                </li>
               
            </ul>
        </form>

    </div>
    </div>
    
    
    
    
}

export default PaymentScreen;