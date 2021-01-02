import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';


function HomeScreen (prop) {
    //const [products, setProduct] = useState([]);
    const chosenCategory = prop.match.params.id ? prop.match.params.id : '';
    console.log(chosenCategory);
    const productList = useSelector((state) => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch(listProducts(chosenCategory));
        // const fetchData = async () => {
        // const { data } = await axios.get("/api/products"); 
        // setProduct(data);
        // }
        // fetchData();
      return() => {
          //cleanup
      }; 
    }, [chosenCategory]);


    return loading ? <div>loading...</div>:
    error ? <div>{ error }</div>:
    <ul className="products">
    {
    products.map(product => 
        <li key= { product._id }>
            <div className="product">
                <Link to={'/product/' + product._id}>
                <img className="product-img" src={product.image}/>
                </Link>
                <div className="product-brand">{product.brand}</div>
                <div className="product-name">
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                </div>
                
                <div className="product-price">${product.price}</div>
                <div className="product-rating">{product.rating} stars ({product.reviews} reviews)</div>
            </div>
        </li>)
    }
    </ul>
}

export default HomeScreen;