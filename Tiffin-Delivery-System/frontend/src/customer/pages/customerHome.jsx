import React, { useEffect, useState } from "react";

import "./customerHome.css";
// import VendorCard from "../components/vendorlist";
import VendorsList from "../../components/vendorsList";

import { fetchVendors } from "../../services/VendorService"; //
// import { fetchVendors } from "../services/VendorService"; //
// import Footer from "../../components/footer/footer";

const Vendorslist = () => {
 const [vendors, setVendors] = useState([]);
 const [error, setError] = useState(null);

 useEffect(() => {
  const getVendors = async () => {
   const result = await fetchVendors();

   if (result.status === "error") {
    setError(result.error);
   } else {
    setVendors(result);
   }
  };

  getVendors();
 }, []);

 // State to store vendors and the search input
 //  const [searchQuery, setSearchQuery] = useState("");

 // Sample tiffin providers list
 //  const vendors = [
 //   {
 //    name: "Healthy Tiffin Service",
 //    address: "123 Healthy St, Cityville",
 //    rating: 4.5,
 //   },
 //   {
 //    name: "Vegan Tiffin Service",
 //    address: "456 Green Rd, Townsville",
 //    rating: 4.2,
 //   },
 //   {
 //    name: "Affordable Tiffin Service",
 //    address: "789 Budget Ave, Metrocity",
 //    rating: 3.8,
 //   },
 //   {
 //    name: "Delicious Tiffin Service",
 //    address: "101 Taste Ave, Suburbia",
 //    rating: 4.7,
 //   },
 //   {
 //    name: "Quick Tiffin Service",
 //    address: "202 Speedy Rd, Citytown",
 //    rating: 4.0,
 //   },
 //   {
 //    name: "Healthy Tiffin Service",
 //    address: "123 Healthy St, Cityville",
 //    rating: 4.5,
 //   },
 //   {
 //    name: "Vegan Tiffin Service",
 //    address: "456 Green Rd, Townsville",
 //    rating: 4.2,
 //   },
 //   {
 //    name: "Affordable Tiffin Service",
 //    address: "789 Budget Ave, Metrocity",
 //    rating: 3.8,
 //   },
 //   // Add more tiffin providers as needed
 //  ];

 //  // Filter vendors based on the search query
 //  const filteredVendors = vendors.filter((vendor) =>
 //   vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
 //  );

 //  // Handle the change in search input
 //  const handleSearchChange = (e) => {
 //   setSearchQuery(e.target.value);
 //  };

 return (
  <div className="container">
   <br />
   <br />
   <br />
   <br />
   <br />
   <br />

   <div>
    <div className="motov4_feature_data mt-5 highlight">
     <h3>Order from your local vendors</h3>
    </div>
    <VendorsList vendors={vendors} />
   </div>

   {/* <div className="row">
    <div className="col-12 mb-4">
     <input
      type="text"
      className="form-control"
      placeholder="Search Tiffin Services"
      value={searchQuery}
      onChange={handleSearchChange}
     />
    </div>
   </div>

   <div className="row">
    {filteredVendors.length > 0 ? (
     filteredVendors.map((vendor, index) => (
      <div key={index} className="col-12 col-sm-6 col-md-3 mb-4">
       <VendorCard vendor={vendor} />
      </div>
     ))
    ) : (
     <div className="col-12">
      <p>No tiffin services found matching your search.</p>
     </div>
    )}
   </div> */}
   {/* <Footer /> */}
  </div>
 );
};

export default Vendorslist;
