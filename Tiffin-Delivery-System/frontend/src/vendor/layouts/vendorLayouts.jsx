// src/vendor/layouts/VendorLayout.js
import React from "react";
import Sidebar from "../components/VendorComponents/Sidebar";
import { Outlet } from "react-router-dom";
// import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";

const VendorLayout = () => {
 return (
  <div>
   <div className="container-fluid" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
    {/* <Navbar/> */}
    <div className="row">
     <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
       <Outlet />
      </div>
     </div>
    </div>
   </div>
   <Footer />
  </div>
 );
};

export default VendorLayout;
