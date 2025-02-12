import React, { useEffect, useState } from "react";
import "./DbHomePage.css";
import { toast } from "react-toastify";
import {
  changeStatus,
  fetchPlacedOrdersHistory,
  updateOrderStatus,
} from "../../services/deliverboy_api"; // Adjust path as needed
import { currency } from "../assets/assets";
import "./DbHomePage.css";


const PlacedOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const [isBusy, setIsBusy] = useState(false); // State to track if the delivery boy is busy
  const deliveryboyId = sessionStorage.getItem("id"); // Retrieve the correct item from sessionStorage

  const loadPlacedOrders = async () => {
    try {
      const data = await fetchPlacedOrdersHistory(deliveryboyId);
      setOrders(data);
      setButtonVisible(data.length > 0);
    } catch (error) {
      toast.error("No placed orders found!");
    }
  };

  useEffect(() => {
    loadPlacedOrders();
  }, [deliveryboyId]);

  const handleMarkAsDelivered = async () => {
    try {
      const updatePromises = orders.map(async (order) => {
        await updateOrderStatus(order.orderId, "DELIVERED");
      });
      await Promise.all(updatePromises);
      toast.success("Orders updated to DELIVERED!");
      setButtonVisible(false);
      localStorage.setItem("buttonVisible", "false");
      loadPlacedOrders(); // Refresh the order list
    } catch (error) {
      toast.error("Error updating order status!");
    }
  };

  // Toggle the busy status
  const toggleBusyStatus = async () => {
    // Toggle the local state
    const updatedStatus = !isBusy; // Compute the new status
    setIsBusy(updatedStatus); // Update the state
    
    // Show a toast message
    toast.success(`You are now ${updatedStatus ? "busy" : "not busy"}`);
    
    // Send the updated status to the backend
    const status_data = updatedStatus ? "busy" : "not busy";
    try {
      const response = await changeStatus(deliveryboyId, status_data);
      console.log("Status updated successfully:", response);
    } catch (error) {
      toast.error("Failed to update status. Please try again.");
      console.error("Error updating status:", error);
    }
  };
  

  return (
    <div className="db-homepage-container">
      {/* Busy Status Button at the Top */}
      <div className="busy-status-container">
        {/* <button
          className={`status-btn ${isBusy ? "busy" : "not-busy"}`}
          onClick={toggleBusyStatus}
        >
          {isBusy ? "I'm Busy" : "I'm Not Busy"}
        </button> */}

        {buttonVisible && (
        <button className="change_status" onClick={toggleBusyStatus}>
          {isBusy ? "I'm Busy" : "I'm Not Busy"}
        </button>
      )}
      </div>

      <h2>Delivery Home Page</h2>
      <hr />
      <div className="db-homepage-content">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="db-homepage-card">
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Customer Name:</strong> {order.customer?.firstName}{" "}
                {order.customer?.lastName}
              </p>
              <p>
                <strong>Vendor Name:</strong> {order.vendor?.businessName}
              </p>
              <p>
                <strong>Earned:</strong> {currency}
                {order.earnedAmount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="status-placed">PLACED</span>
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <div className="delivery-address">
                <p>
                  <strong>Delivery Address:</strong>
                </p>
                <p>
                  {order.deliveryAddress?.adrLine1},{" "}
                  {order.deliveryAddress?.adrLine2}
                </p>
                <p>
                  {order.deliveryAddress?.city}, {order.deliveryAddress?.state}
                </p>
                <p>
                  {order.deliveryAddress?.country},{" "}
                  {order.deliveryAddress?.zipcode}
                </p>
                <p>Phone: {order.deliveryAddress?.phoneNo}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders">No placed orders found.</p>
        )}
      </div>

      {buttonVisible && (
        <button className="mark-delivered-btn" onClick={handleMarkAsDelivered}>
          Mark All as Delivered
        </button>
      )}
    </div>
  );
};

export default PlacedOrderHistory;
