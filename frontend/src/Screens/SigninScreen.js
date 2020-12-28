import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';


function SigninScreen (props) {
      
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useEffect( () => {
        
       
      return() => {
          //cleanup
      }; 
    }, []);

   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(signin(email, password));
   }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h3>SIGN IN</h3>
                </li>
                <li>
                    <label for="email">Email: </label>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="eg. abc@gmail.com"/>
                </li>
                <li>
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </li>
                <li>
                    <button type="submit">Signin</button>
                </li>
                <li>
                    new to amazona?
                </li>
                <li>
                    <Link to="/register">Create your amazona account</Link>
                </li>
            </ul>
        </form>

    </div>
    
    
}

export default SigninScreen;