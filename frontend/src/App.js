import logo from './logo.svg';
import data from './data';
import './App.css';


function App() {

  const openHamMenu = () =>{
    document.querySelector('.sidebar').classList.add("open");
  }

  const closeHamMenu = () =>{
    document.querySelector('.sidebar').classList.remove("open");
  }
  return (
    <div className="grid-container">
    <header className="header">
        
        <div className="brand">
            <button onClick={openHamMenu}>
                &#9776;
            </button>
            <a href="index.html">amazona</a>
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
                <ul className="products">
                {
                data.products.map(product => 
                    <li>
                        <div className="product">
                            <img className="product-img" src={product.image}/>
                            <div className="product-brand">{product.brand}</div>
                            <div className="product-name">
                                <a href="product.html">{product.name}</a>
                            </div>
                            
                            <div className="product-price">${product.price}</div>
                            <div className="product-rating">{product.rating} stars ({product.reviews} reviews)</div>
                        </div>
                    </li>)
                }
                </ul>
            </div>
        
    </main>

    <footer className="footer">
        <p>All Rights Reserved.</p>
    </footer>
    </div>
  );
}

export default App;
