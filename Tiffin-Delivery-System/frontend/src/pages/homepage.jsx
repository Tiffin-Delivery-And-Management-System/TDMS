import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import VendorsList from "../components/vendorsList"; //
// import { fetchVendors } from "../services/VendorService"; //

const HomePage = () => {
 //  const [dropdownOpen, setDropdownOpen] = useState(false);
 //  const [vendors, setVendors] = useState([]);
 //  const [error, setError] = useState(null);

 //  useEffect(() => {
 //   const getVendors = async () => {
 //    const result = await fetchVendors();

 //    if (result.status === "error") {
 //     setError(result.error);
 //    } else {
 //     setVendors(result);
 //    }
 //   };

 //   getVendors();
 //  }, []);

 return (
  <div>
   <NavBar />
   <div
    style={{
     backgroundImage: "url(/images/default.jpg)",
     backgroundSize: "cover",
     backgroundPosition: "center",
     minHeight: "100vh",
     display: "flex",
     flexDirection: "column",
    }}
   >
    {/* <nav
    style={{
     background: "#fff",
     padding: "15px",
     boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
     display: "flex",
     justifyContent: "space-between",
     alignItems: "center",
    }}
   >
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
     <div style={{ fontSize: "24px", fontWeight: "bold", color: "red" }}>
      DABBEWALA
     </div>

    
     <div style={{ position: "relative" }}> 
      <button
       onClick={() => setDropdownOpen(!dropdownOpen)}
       style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "16px",
        color: "gray",
        display: "flex",
        alignItems: "center",
        gap: "5px",
       }}
      >
       Learn More <ChevronDown size={16} />
      </button>

      {dropdownOpen && (
       <div
        style={{
         position: "absolute",
         top: "100%",
         left: 0,
         background: "#fff",
         boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
         borderRadius: "5px",
         width: "150px",
         zIndex: 10,
        }}
       >
        <a
         href="#"
         style={{
          display: "block",
          padding: "10px",
          textDecoration: "none",
          color: "black",
          fontSize: "14px",
         }}
        >
         About Us
        </a>
        <a
         href="#"
         style={{
          display: "block",
          padding: "10px",
          textDecoration: "none",
          color: "black",
          fontSize: "14px",
         }}
        >
         Contact Us
        </a>
       </div>
      )}
     </div>
    </div>

    <div style={{ display: "flex", gap: "20px" }}>
     <a href="#" style={{ color: "gray", textDecoration: "none" }}>
      <LogIn size={20} /> Login
     </a>
     <a href="#" style={{ color: "gray", textDecoration: "none" }}>
      <UserPlus size={20} /> Register
     </a>
     <a href="#" style={{ color: "gray", textDecoration: "none" }}>
      <User size={20} /> Profile
     </a>
    </div>
   </nav> */}

    {/* Hero Section */}
    <div
     style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "60vh",
      textAlign: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
      color: "white",
      padding: "20px",
     }}
    >
     <motion.h1
      style={{ fontSize: "40px", fontWeight: "bold" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
     >
      Welcome to Dabbewala
     </motion.h1>
     <motion.p
      style={{ fontSize: "18px", marginTop: "10px", maxWidth: "600px" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
     >
      Your one-stop solution for home-cooked meals delivered to your doorstep.
      We ensure fresh, hygienic, and delicious food daily!
     </motion.p>
    </div>

    {/* <div>
     <div className="motov4_feature_data mt-5 highlight">
      <h3>Order from your favourite vendors</h3>
     </div>
     <VendorsList vendors={vendors} />
    </div> */}

    {/* Services Section */}
    <div style={{ textAlign: "center", padding: "10px" }}>
     <h2
      style={{
       fontSize: "28px",
       fontWeight: "bold",
       color: "white",
       //   borderBottom: "2px solid white",
       display: "inline-block",
       paddingBottom: "5px",
      }}
     >
      Our Services
     </h2>
    </div>

    <div
     style={{
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      padding: "20px",
      flexWrap: "wrap",
     }}
    >
     <motion.div
      style={{
       background: "#fff",
       boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
       padding: "20px",
       borderRadius: "8px",
       textAlign: "center",
       width: "250px",
      }}
      whileHover={{ scale: 1.08 }}
     >
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>Healthy Meals</h2>
      <p style={{ color: "gray" }}>
       Nutritious and freshly prepared meals every day.
      </p>
     </motion.div>
     <motion.div
      style={{
       background: "#fff",
       boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
       padding: "20px",
       borderRadius: "8px",
       textAlign: "center",
       width: "250px",
      }}
      whileHover={{ scale: 1.08 }}
     >
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>On-Time Delivery</h2>
      <p style={{ color: "gray" }}>
       We ensure your meal reaches you hot and on time.
      </p>
     </motion.div>
     <motion.div
      style={{
       background: "#fff",
       boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
       padding: "20px",
       borderRadius: "8px",
       textAlign: "center",
       width: "250px",
      }}
      whileHover={{ scale: 1.08 }}
     >
      <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
       Affordable Pricing
      </h2>
      <p style={{ color: "gray" }}>Quality meals at pocket-friendly prices.</p>
     </motion.div>
    </div>

    <Footer />
    {/* Footer */}
    {/* <footer
     style={{
      background: "#333",
      color: "white",
      padding: "10px",
      marginTop: "auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
     }}
    >
     <div style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>
      DABBEWALA
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
       <Mail size={20} /> <span>contact@dabbewala.com</span>
      </div>
     </div>
    </footer> */}
   </div>
  </div>
 );
};

export default HomePage;
