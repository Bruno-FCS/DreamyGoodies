import { Link } from "react-router-dom";

const Navbar = () => {

    return (

        <nav className="navbar">
            <Link to="/">
                <img
                    src={require(".../assets/logo.png")}
                    alt="logo"
                    />
            </Link>
            <div className="navbar-links">
                <Link to="/aboutUs">
                    About Us
                </Link>
                <Link to="/aboutUs">
                    About Us
                </Link>
                <Link to="/faq">
                    FAQ
                </Link>
                <Link to="/products">
                    Products
                </Link>
                <Link to="/reviews">
                    Reviews
                </Link>
                <Link to="/user-profile">
                    <img 
                        src="user-profile-img"
                        alt="user-profile-icon"
                    />
                </Link>
                <Link to="/admin/product/add">
                    Add Product
                </Link>

                <Link to="/cart">
                    Cart
                </Link>
            </div>
        </nav>

    );
}