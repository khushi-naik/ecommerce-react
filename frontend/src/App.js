import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useSelector } from 'react-redux';
import AddProductScreen from './screens/AddProductScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';



function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openHamMenu = () =>{
    document.querySelector('.sidebar').classList.add("open");
  }

  const closeHamMenu = () =>{
    document.querySelector('.sidebar').classList.remove("open");
  }
  return (
    <BrowserRouter>
    <div className="grid-container">
    <header className="header">
        
        <div className="brand">
            <button onClick={openHamMenu}>
                &#9776;
            </button>
            <Link to="/">amazona</Link>
            
        </div>
        <div className="header-links">
         
            {
              userInfo ? <Link to="/cart">CART</Link> :
              <Link to="/">CART</Link>
            }
            {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
              <Link to="/signin">SIGN IN</Link>
            }
            
        </div>
    </header>
    <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="side-close-button" onClick={closeHamMenu}>X</button>
        <ul>
            <h4>Categories</h4>
            <li><Link to='/category/men'>Men</Link></li>
            <li><Link to='/category/women'>Women</Link></li>
        </ul>
    </aside>
    <main className="main">
        
            <div className="content">
                <Route path="/category/:id" component={HomeScreen} />
                <Route path="/profile" component={ProfileScreen} />
                <Route path="/products" component={AddProductScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />                
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/" component={HomeScreen} exact={true} />
                
            </div>
        
    </main>

    <footer className="footer">
        <p>All Rights Reserved.</p>
    </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
