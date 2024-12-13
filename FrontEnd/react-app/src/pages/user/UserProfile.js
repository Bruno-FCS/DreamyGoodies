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
                        style={{
                            backgroundColor: "white",
                            width: "50%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: "10px"
                        }}>
                        <span>Welcome to your profile, {userName}</span>

                        <p>
                            Within this page, you can view user details and various actions associated with your
                            Dreamy Goodies account.
                        </p>


                        {isAuthorized &&
                            <>
                                <Link to="/messages"
                                      style={{
                                          color: "black",
                                          textDecoration: "none",
                                          fontWeight: "bold",
                                          backgroundColor: "#fceba0",
                                          padding: "5px",
                                          margin: "5px",
                                          width: "max-content",
                                          borderRadius: "5px",
                                      }}
                                >
                                    Messages
                                </Link>
                                <div style={{marginBottom: "10px"}}>
                                    As an administrator, you may register new users, click here:
                                    <Link to="/register" id="admin-reg-btn"

                                    >
                                        Register
                                    </Link>
                                </div>

                            </>}

                        <div>
                            <h3>Loyalty Program</h3>
                            <p>
                                As a loyal customer of Dreamy Goodies, you receive a certain amount of points per order.
                                <br/>For example, let's say a cake costs $22.60, the equivalent amount of points would be 230
                                (22.60 rounded to 23, multiplied by 100).

                            </p>
                        </div>
                    </div>


                </div>


            </div>
            <Footer/>
        </div>
    );
};

export default UserProfile;
