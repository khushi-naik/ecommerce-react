import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { deleteProduct, listProducts, saveProduct } from '../actions/productActions';
import { signin } from '../actions/userActions';


function AddProductScreen (props) {
      
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    // const [rating, setRating] = useState('');
    // const [reviews, setReviews] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [category, setCategory] = useState('');

    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;

    const productSave = useSelector((state) => state.productSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = productSave;

    const productDelete = useSelector((state) => state.productDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;
    
    const dispatch = useDispatch();

    useEffect( () => {
        if(successSave){
            setModalVisible(false);
        }
       dispatch(listProducts());
       
      return() => {
          //cleanup
      }; 
    }, [successSave, successDelete]);


   const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setDescription(product.description);
        setCategory(product.category);
        setCountInStock(product.countInStock);
   }


   const submitHandler = (e) => {
       e.preventDefault();
       dispatch(saveProduct({_id:id, name, price, brand, image, description, countInStock, category}));
   }

   const deleteHandler = (product) => {
       dispatch(deleteProduct(product._id));
   }
    return <div className="content content-margined">
        <div className="product-header">
            <h3>
                Products
            </h3>
            <button onClick= { () => openModal({}) }>Create Product</button>

            {
                modalVisible && 
                <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h3>Add New Product</h3>
                </li>
                <li>
                    {loadingSave && <div>loading...</div>}
                    {errorSave && <div>{ errorSave }</div>}
                </li>
                <li>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" value={name} name="name" onChange={(e) => setName(e.target.value)} placeholder=" xyz "/>
                </li>
                <li>
                    <label htmlFor="price">Price: </label>
                    <input type="number" id="price" value={price} name="price" onChange={(e) => setPrice(e.target.value)} placeholder=" xyz "/>
                </li>
                <li>
                    <label htmlFor="brand">Brand: </label>
                    <input type="text" id="brand" value={brand} name="brand" onChange={(e) => setBrand(e.target.value)} placeholder=" xyz "/>
                </li>
                <li>
                    <label htmlFor="image">Image: </label>
                    <input type="text" id="image" value={image} name="image" onChange={(e) => setImage(e.target.value)} placeholder=" xyz "/>
                </li>
                <li>
                    <label htmlFor="description">Description: </label>
                    <textarea type="text" id="description" value={description} name="description" onChange={(e) => setDescription(e.target.value)} placeholder=" xyz "/>
                </li>
                
                <li>
                    <label htmlFor="countInStock">Stock: </label>
                    <input type="number" id="countInStock" value={countInStock} name="countInStock" onChange={(e) => setCountInStock(e.target.value)} placeholder=" xyz "/>
                </li>
                <li>
                    <label htmlFor="category">Category: </label>
                    <input type="text" id="category" value={category} name="category" onChange={(e) => setCategory(e.target.value)} placeholder=" xyz "/>
                </li>
                <li>
                    <button type="submit">{ id ? "Update" : "Add Product"}</button>
                </li>
                <li>
                    <button type="button" onClick={() => setModalVisible(false)}>Back</button>
                </li>
               
            </ul>
        </form>

    </div>
    
            }
            
            <div className="product-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((product) => (
                            <tr key={product._id}>
                            <td>{ product._id }</td>
                            <td>{ product.name }</td>
                            <td>{ product.price }</td>
                            <td>{ product.category }</td>
                            <td>{ product.brand }</td>
                            <td>
                                <button onClick= {() => openModal(product)}>Edit</button>
                                <button onClick= {() => deleteHandler(product)}>Delete</button>
                            </td>
                        </tr>
                        ))
                    }
                        
                    </tbody>
                </table>
            </div>

        </div>

    </div>
    
    
    
    
    
}

export default AddProductScreen;