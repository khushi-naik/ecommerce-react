import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen (props) {
    // console.log(prop.match.params.id);
    // const product_details = data.products.find(function(x){
    //     return x.id === prop.match.params.id;
    // })
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(detailsProduct(props.match.params.id));
       
      return() => {
          //cleanup
      }; 
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
    }

    return <div>
    <div>
    <Link to="/">Return to Previous Page</Link>
    </div>

    { loading ? <div>loading...</div> :
      error ? <div>{ error }</div> :
      (
        <div className="details">
        <div className="details-image">
            <img src={product.image}></img>
        </div>
        <div className="details-info">
            <ul>
                <li>{ product.name }</li>
                <li>{ product.brand }</li>
                <li>{ product.price }</li>
                <li>{product.rating } Stars( { product.reviews } Reviews)</li>
            </ul>
        </div>

        <div className="details-action">
            <ul>
                <li>Price: {product.price}</li>
                <li>Status: {product.countInStock>0 ? "Product in Stock" : "Unavailable"}</li>
                <li>Qty: <select value= { qty } onChange={ (e) => { setQty(e.target.value) }}>
                    { [...Array(product.countInStock).keys()].map(x =>
                    <option key={ x+1 } value={ x+1 }>{ x+1 }</option>
                    )}
                </select>
                </li>
                <li>
                { product.countInStock>0 && <button onClick={ handleAddToCart }>Add to Cart</button> }                
                </li>
            </ul>
        </div>
    
    </div>
      )}
    
    
    </div>
    
    
}

export default ProductScreen;