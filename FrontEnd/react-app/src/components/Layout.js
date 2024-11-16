import React from "react";
import NavBar from "./NavBar";

const Layout = ({ title, children }) => (
  <>
    <title>{title}</title>
    <NavBar />
    <br />
    {children}
    <br />
    <br />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script type="text/javascript" src="/js/main.js"></script>
  </>
);

export default Layout;
