import React, { useEffect, useState } from "react";
import "./DeliveryboyList.css";
import {
 fetchDeliveryboys,
 updateVerificationStatus,
} from "../../../services/admin_api";

const DeliveryboyList = () => {
 const [deliveryboyList, setDeliveryboys] = useState([]);
 const [sortBy, setSortBy] = useState("firstName");

 useEffect(() => {
  const getDeliveryboys = async () => {
   try {
    const data = await fetchDeliveryboys();
    setDeliveryboys(data);
   } catch (error) {
    console.error("Error fetching vendors:", error);
   }
  };
  getDeliveryboys();
 }, []);

 const handleVerificationToggle = async (userId, currentStatus) => {
  try {
   const updatedStatus = !currentStatus;
   await updateVerificationStatus(userId, updatedStatus);
   setDeliveryboys((prevList) =>
    prevList.map((deliveryboy) =>
     deliveryboy.id === userId
      ? { ...deliveryboy, isVerified: updatedStatus }
      : deliveryboy
    )
   );
  } catch (error) {
   console.error("Error updating verification status:", error);
  }
 };

 const sortedDeliveryBoyList = [...deliveryboyList].sort((a, b) => {
  if (sortBy === "isVerified") {
   return a.isVerified === b.isVerified ? 0 : a.isVerified ? -1 : 1;
  }
  return a[sortBy].toString().localeCompare(b[sortBy].toString());
 });

 return (
  <div className="list add flex-col">
   <h4>
    <b>All Delivery Boys List</b>
   </h4>
   <select
    onChange={(e) => setSortBy(e.target.value)}
    className="sort-dropdown"
   >
    <option value="firstName">Sort by First Name</option>
    <option value="lastName">Sort by Last Name</option>
    <option value="email">Sort by Email</option>
    <option value="isVerified">Sort by Verification Status</option>
   </select>
   <br />
   <br />
   <div className="list-table">
    <div className="list-table-format title">
     <b>Sr. No.</b>
     <b>First Name</b>
     <b>Last Name</b>
     <b>Email</b>
     <b>Contact No.</b>
     <b>isVerified</b>
     <b>Change Status</b>
    </div>
    {/* {deliveryboyList.map((deliveryboy, index) => { */}
    {sortedDeliveryBoyList.map((deliveryboy, index) => {
     return (
      <div key={deliveryboy.email || index} className="list-table-format">
       <p>{index + 1}</p>
       <p>{deliveryboy.firstName}</p>
       <p>{deliveryboy.lastName}</p>
       <p>{deliveryboy.email}</p>
       <p>{deliveryboy.contactNo}</p>
       <p>{deliveryboy.isVerified ? "Yes" : "No"}</p>
       <button
        onClick={() =>
         handleVerificationToggle(deliveryboy.id, deliveryboy.isVerified)
        }
        style={{
         backgroundColor: deliveryboy.isVerified ? "red" : "lightgreen",
        }}
       >
        {deliveryboy.isVerified ? "Revoke" : "Verify"}
       </button>
      </div>
     );
    })}
   </div>
  </div>
 );
};

export default DeliveryboyList;
