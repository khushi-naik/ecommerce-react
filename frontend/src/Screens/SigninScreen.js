import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';


function SigninScreen (props) {
      
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const {loading, userInfo, error} = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

    useEffect( () => {
        if(userInfo){
            props.history.push(redirect);
        }
       
      return() => {
          //cleanup
      }; 
    }, [userInfo]);

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
                    {loading && <div>loading...</div>}
                    {error && <div>{ error }</div>}
                </li>
                <li>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="eg. abc@gmail.com"/>
                </li>
                <li>
                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}/>
                </li>
                <li>
                    <button type="submit">Signin</button>
                </li>
                <li>
                    new to amazona?
                </li>
                <li>
                    <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect}>Create your amazona account</Link>
                </li>
            </ul>
        </form>

    </div>
    
    
}

export default SigninScreen;