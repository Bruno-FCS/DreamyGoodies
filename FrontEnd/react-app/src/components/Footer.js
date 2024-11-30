import { Link } from "react-router-dom";
import "../App.css";

const Footer = (props) => {
  return (
    <footer
      style={{
        position: props.pos,
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src={require("../assets/logo.png")}
          width={50}
          alt="logo"
          style={{ marginRight: "1rem" }}
        />
      </Link>
      <span style={{ marginLeft: 10 }}>
        © 2024 - Bruno Santos, Katherine Dorensky, Suellen Reis
      </span>
    </footer>
  );
};

export default Footer;
