import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import "./css/style.css";
import { useNavigate } from "react-router-dom";

function Footer() {
 const navigate = useNavigate();
 return (
  <footer
   style={{
    background: "linear-gradient(to bottom,rgb(87, 91, 94),rgb(34, 38, 42))",
    // background: "linear-gradient(to bottom,rgb(34, 38, 42),rgb(75, 79, 82))",  //Inverse of Navbar
    color: "white",
    padding: "10px",
    marginTop: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
   }}
  >
   <div
    style={{ fontSize: "24px", color: "pink", fontWeight: "bold" }} // EXTRA: fontWeight: "bold"
   >
    <a
     className="nav-link"
     href="#"
     onClick={(e) => {
      e.preventDefault(); // Prevents default anchor behavior so it does not refresh the page
      navigate("/");
     }}
     style={{ color: "pink", textDecoration: "none" }}
    >
     DABBEWALA
    </a>
   </div>
   <div>
    <p style={{ margin: 0 }}>&copy; 2025 Dabbewala. All rights reserved.</p>
   </div>
   <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
     <MapPin size={20} /> <span>Pune, India</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
     <Phone size={20} /> <span>+91 98765 43210</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
     <Mail size={20} /> <span>dabbewala25@gmail.com</span>
    </div>
   </div>
  </footer>
 );
}

export default Footer;
