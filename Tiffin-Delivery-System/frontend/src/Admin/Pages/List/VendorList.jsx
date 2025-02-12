import React, { useEffect, useState } from "react";
import "./VendorList.css";
import {
 fetchVendors,
 updateVerificationStatus,
} from "../../../services/admin_api";

// import { markActive, markInactive } from "../../../services/admin_api";

const VendorList = () => {
 const [vendorList, setVendors] = useState([]);
 const [sortBy, setSortBy] = useState("firstName");
 //  const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {
  const getVendors = async () => {
   try {
    const data = await fetchVendors();
    setVendors(data);
   } catch (error) {
    console.error("Error fetching vendors:", error);
   }
  };
  getVendors();
 }, []);

 //Sorting
 const sortedVendors = [...vendorList].sort((a, b) => {
  if (sortBy === "isVerified") {
   return a.isVerified === b.isVerified ? 0 : a.isVerified ? -1 : 1;
  }
  return a[sortBy].toString().localeCompare(b[sortBy].toString());
 });

 //  const handleVerificationToggle = async (userId, currentStatus) => {
 //   try {
 //    const updatedStatus = !currentStatus;

 //    // ✅ Call the backend API to update the verification status
 //    const response = await updateVerificationStatus(userId, updatedStatus);
 //    console.log("Verification Updated:", response);

 //    // ✅ Update the state to reflect the change
 //    setVendors((prevList) =>
 //     prevList.map((vendor) =>
 //      vendor.id === userId ? { ...vendor, isVerified: updatedStatus } : vendor
 //     )
 //    );
 //   } catch (error) {
 //    console.error("Error updating verification status:", error);
 //   }
 //  };

 const handleVerificationToggle = async (userId, currentStatus) => {
  try {
   console.log(`Toggling verification for User ID: ${userId}`); // Debugging

   const updatedStatus = !currentStatus;
   const response = await updateVerificationStatus(userId, updatedStatus);

   console.log("API Response:", response); // Debugging

   // Update UI
   setVendors((prevList) =>
    prevList.map((vendor) =>
     vendor.id === userId ? { ...vendor, isVerified: updatedStatus } : vendor
    )
   );
  } catch (error) {
   console.error("Verification toggle failed:", error.response || error);
  }
 };

 //  const onToggle = async (id, status) => {
 //     let result
 //     if (status == 1) {
 //       result = await markActive(id)
 //     } else {
 //       result = await markInactive(id)
 //     }

 //     if (result['status'] == 'success') {
 //       toast.success('Successfully updated status')
 //       onLoadUsers()
 //     } else {
 //       toast.error(result['error'])
 //     }
 //   }

 //  Filtering
 //  const filteredVendors = vendorList.filter((vendor) =>
 //   `${vendor.firstName} ${vendor.lastName} ${vendor.businessName}`
 //    .toLowerCase()
 //    .includes(searchTerm.toLowerCase())
 //  );

 return (
  <div className="list add flex-col" style={{ width: "100%" }}>
   <h4>
    <b>All Vendors List</b>
   </h4>
   {/* Filter Input */}
   {/* <input
    type="text"
    placeholder="Search by name or business..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="filter-input"
   /> */}
   {/* Sort Dropdown */}
   <select
    onChange={(e) => setSortBy(e.target.value)}
    className="sort-dropdown"
   >
    <option value="firstName">Sort by First Name</option>
    <option value="lastName">Sort by Last Name</option>
    {/* <option value="email">Sort by Email</option> */}
    <option value="businessName">Sort by Business Name</option>
    <option value="isVerified">Sort by Verification Status</option>
   </select>
   <br />
   <br />
   <div className="list-table">
    <div className="list-table-format title">
     <b>Sr. No.</b>
     <b>First Name</b>
     <b>Last Name</b>
     {/* <b>Email</b> */}
     <b>Business Name</b>
     <b>Contact No.</b>
     <b>isVerified</b>
     <b>Change Status</b>
    </div>
    {/* {vendorList.map((vendor, index) => { */}
    {sortedVendors.map((vendor, index) => {
     return (
      <div key={vendor.email || index} className="list-table-format">
       <p>{index + 1}</p>
       <p>{vendor.firstName}</p>
       <p>{vendor.lastName}</p>
       {/* <p>{vendor.email}</p> */}
       <p>{vendor.businessName}</p>
       <p>{vendor.contactNo}</p>
       <p>{vendor.isVerified ? "Yes" : "No"}</p>
       <button
        onClick={() => handleVerificationToggle(vendor.id, vendor.isVerified)}
        style={{ backgroundColor: vendor.isVerified ? "red" : "lightgreen" }}
       >
        {vendor.isVerified ? "Revoke" : "Verify"}
       </button>
      </div>
     );
    })}
   </div>
  </div>
 );
};

export default VendorList;
