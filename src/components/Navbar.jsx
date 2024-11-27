import { Link } from 'react-router-dom';
import './Navbar.css'; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo">
            ProductStore
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="navbar-link">
              Products
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
