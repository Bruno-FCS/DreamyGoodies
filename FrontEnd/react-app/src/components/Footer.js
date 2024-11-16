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
          src={require("../assets/e-Shop-s.png")}
          width={100}
          alt="logo"
          style={{ marginRight: "1rem" }}
        />
      </Link>
      <span style={{ marginLeft: 10 }}>
        © 2024 - Bruno Santos, Katherine Dorensky, Zeldrix Don
      </span>
    </footer>
  );
};

export default Footer;
