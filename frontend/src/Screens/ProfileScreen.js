import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { deleteProduct, listProducts, saveProduct } from '../actions/productActions';
import { saveProfile, signin } from '../actions/userActions';


function ProfileScreen (props) {
      
    
    //const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const profileSave = useSelector((state) => state.profileSave);
    const { loading, success, error } = profileSave;
    
    const dispatch = useDispatch();

    useEffect( () => {
        if (userInfo) {
            console.log(userInfo.name)
            setEmail(userInfo.email);
            setName(userInfo.name);
            
          }
       
      return() => {
          //cleanup
      }; 
    }, [userInfo]);


   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(saveProfile({userId:userInfo._id, name, email}));
   }

  
    return <div className="content content-margined">
        <div className="product-header">
            <h3>
                Profile
            </h3>
            
            
         <div className="form">
            <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h3>User Profile</h3>
                </li>
                <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
              {success && <div>Profile Saved Successfully.</div>}
            </li>
                <li>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" value={name} name="name" onChange={(e) => setName(e.target.value)} />
                </li>
                <li>
                    <label htmlFor="email">Email: </label>
                    <input type="email" id="email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
                </li>
                
                
                <li>
                    <button type="submit">Save Profile</button>
                </li>
               
            </ul>
        </form>

    </div>
    
    
            

        </div>

    </div>
    
    
    
    
    
}

export default ProfileScreen;