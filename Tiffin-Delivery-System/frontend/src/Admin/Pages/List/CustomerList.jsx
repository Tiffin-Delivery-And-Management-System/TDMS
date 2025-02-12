import React, { useEffect, useState } from "react";
import "./CustomerList.css";
import { fetchCustomers } from "../../../services/admin_api";

const DeliveryboyList = () => {
 const [customerList, setCustomer] = useState([]);
 const [sortBy, setSortBy] = useState("firstName");

 useEffect(() => {
  const getVendors = async () => {
   try {
    const data = await fetchCustomers();
    setCustomer(data);
   } catch (error) {
    console.error("Error fetching vendors:", error);
   }
  };
  getVendors();
 }, []);

 const sortedCustomerList = [...customerList].sort((a, b) => {
  // if (sortBy === "isVerified") {
  //  return a.isVerified === b.isVerified ? 0 : a.isVerified ? -1 : 1;
  // }
  return a[sortBy].toString().localeCompare(b[sortBy].toString());
 });

 return (
  <div className="list add flex-col">
   <h4>
    <b>All Customers List</b>
   </h4>
   <select
    onChange={(e) => setSortBy(e.target.value)}
    className="sort-dropdown"
   >
    <option value="firstName">Sort by First Name</option>
    <option value="lastName">Sort by Last Name</option>
    <option value="email">Sort by Email</option>
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
    </div>
    {/* {customerList.map((customer, index) => { */}
    {sortedCustomerList.map((customer, index) => {
     console.log(customer);
     return (
      <div key={customer.email || index} className="list-table-format">
       <p>{index + 1}</p>
       <p>{customer.firstName}</p>
       <p>{customer.lastName}</p>
       <p>{customer.email}</p>
       <p>{customer.contactNo}</p>
      </div>
     );
    })}
   </div>
  </div>
 );
};

export default DeliveryboyList;
