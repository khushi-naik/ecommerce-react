import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { register } from '../actions/userActions';


function RegisterScreen (props) {
      
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('');
    
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    
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
       dispatch(register(name, email, password));
   }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    {loading && <div>loading...</div>}
                    {error && <div>{ error }</div>}
                </li>
                <li>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" name="name" onChange={(e) => setName(e.target.value)} placeholder="eg. Khushi Naik"/>
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
                    <label htmlFor="rePassword">Password: </label>
                    <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)}/>
                </li>
                <li>
                    <button type="submit">Register</button>
                </li>
                <li>
                    Already a member? <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}>SignIn</Link>
                </li>
            </ul>
        </form>

    </div>
    
    
}

export default RegisterScreen;