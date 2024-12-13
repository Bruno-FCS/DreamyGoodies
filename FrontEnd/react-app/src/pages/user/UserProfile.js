import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import "../../App.css";
import Footer from "../../components/Footer";
import {jwtDecode} from "jwt-decode";
import {Link} from "react-router-dom";


const UserProfile = () => {
    const [userName, setUserName] = useState("");
    const isLoggedIn = localStorage.getItem("token") !== null;
    const token = isLoggedIn ? localStorage.getItem("token") : null;
    const decodedToken = token ? jwtDecode(token) : null;
    const scope = decodedToken ? decodedToken.scope : "";
    const isAuthorized = isLoggedIn && scope === "ADMIN";

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenFromUrl = params.get("token");
        if (tokenFromUrl) {
            localStorage.setItem("token", tokenFromUrl);
        }
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode(token);
            setUserName(decoded.name);
        }
    }, []);

    return (
        <div>
            <Navbar/>
            <div style={{minHeight: "544px"}} className="user-container">
                <div className="user-content">
                    <h1>User Profile</h1>

                    <div
                        className="text-block"
                    >
                        <span>Welcome to your profile, {userName}</span>

                        <p>
                            Within this page, you can view user details and various actions associated with your
                            Dreamy Goodies account.
                        </p>


                        {isAuthorized &&
                            <>
                                <div style={{marginBottom: "10px"}}>
                                    As an administrator, you may register new users, click here:
                                    <Link to="/register" id="admin-btn"

                                    >
                                        Register
                                    </Link>
                                </div>
                                <div style={{marginBottom: "10px"}}>
                                    Access messages sent by customers here:
                                    <Link to="/messages" id="admin-btn">
                                        Messages
                                    </Link>
                                </div>

                            </>}
                    </div>


                </div>


            </div>
            <Footer/>
        </div>
    );
};

export default UserProfile;
