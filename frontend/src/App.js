import { BrowserRouter, Link, Route } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';


function App() {

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
            <a href="cart.html">CART</a>
            <a href="signin.html">SIGN IN</a>
        </div>
    </header>
    <aside className="sidebar">
        <h3>Shopping Categories</h3>
        <button className="side-close-button" onClick={closeHamMenu}>X</button>
        <ul>
            <li><a href="index.html">Men</a></li>
            <li><a href="index.html">Women</a></li>
        </ul>
    </aside>
    <main className="main">
        
            <div className="content">
                <Route path="/products/:id" component={ProductScreen} />
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
