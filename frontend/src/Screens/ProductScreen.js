import React from 'react';
import data from '../data';
import {Link} from 'react-router-dom';

function ProductScreen (prop) {
    console.log(prop.match.params.id);
    const product_details = data.products.find(function(x){
        return x.id === prop.match.params.id;
    })

    return <div>
    <div>
    <Link to="/">Return to Previous Page</Link>
    </div>
    <div className="details">
        <div className="details-image">
            <img src={product_details.image}></img>
        </div>
        <div className="details-info">
            <ul>
                <li>{ product_details.name }</li>
                <li>{ product_details.brand }</li>
                <li>{ product_details.price }</li>
                <li>{product_details.rating } Stars( { product_details.reviews } Reviews)</li>
            </ul>
        </div>

        <div className="details-action">
            <ul>
                <li>{product_details.price}</li>
                <li>{product_details.status}</li>
                <li><select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
                </li>
                <li><button>Add to Cart</button>
                </li>
            </ul>
        </div>
    
    </div>
    
    </div>
    
    
}

export default ProductScreen;