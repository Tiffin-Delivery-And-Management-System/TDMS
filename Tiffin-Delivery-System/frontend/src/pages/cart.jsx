import React, { useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/navbar";
import CartItem from "../components/cart/cartItem";
import AddCustomerAddressModal from "../components/register/AddCustomerAddressModal";
import { placeOrder } from "../services/OrderService";
import { generateRandomTransactionId } from "../Utils/utility";
import { setAddresses } from "../redux/AddressSlice";
import { clearCart, removeItem } from "../redux/cartSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const addresses = useSelector((state) => state.address.addresses);
  const vendorId = useSelector((state) => state.vendor.id);

  const [subTotal, setSubTotal] = React.useState(0);
  const [gst, setGst] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [showAddAddress, setShowAddAddress] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const [showAddresses, setShowAddresses] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("GOOGLE_PAY");
  const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(null);

  const calculateBill = useCallback(() => {
    // const handleBackToMenu = () => {
    //   if (vendorEmails.length > 0) {
    //     navigate("/vendor/menu", { state: { vendorEmail: vendorEmails[0] } });
    //   } else {
    //     toast.error("No vendor found in cart.");
    //   }
    // };

    let subTotal = 0;
    Object.values(cart).forEach((vendorItems) => {
      Object.values(vendorItems).forEach((item) => {
        subTotal += item.menuPrice * item.quantity;
      });
    });

    const calculatedGst = 0.18 * subTotal;
    const calculatedTotal = subTotal + calculatedGst + 25;

    setSubTotal(subTotal);
    setGst(calculatedGst);
    setTotal(calculatedTotal);
  }, [cart]);

  useEffect(() => {
    calculateBill();
  }, [calculateBill, cart]);

  const updateBill = (vendorEmail, menuId, newQuantity) => {
    if (newQuantity <= 0) {
      dispatch(removeItem({ vendorEmail, menuId }));
    }
  };

  const handleChooseAddress = () => {
    if (addresses.length === 0) {
      setShowAddAddress(true);
    } else {
      setShowAddresses(true);
    }
  };

  const handleSelectAddress = (address, index) => {
    setSelectedAddress(address);
    setSelectedAddressIndex(index);
  };

  const handleAddNewAddress = () => {
    setShowAddAddress(true);
  };

  const handleAddAddress = (newAddress) => {
    dispatch(setAddresses([...addresses, newAddress]));
    setShowAddAddress(false);
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }

    const orderRequest = {
      menuItems: Object.entries(cart).flatMap(([vendorEmail, vendorItems]) =>
        Object.entries(vendorItems).map(([menuId, item]) => ({
          id: parseInt(menuId),
          quantity: item.quantity,
        }))
      ),
      address: selectedAddress,
      payment: {
        paymentMethod: paymentMethod,
        amount: total,
        transactionId: generateRandomTransactionId(),
      },
    };

    const customerId = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");

    if (!customerId || !token) {
      toast.error("User information is missing. Please log in again.");
      return;
    }

    try {
      await placeOrder(customerId, vendorId, token, orderRequest);
      toast.success("Order placed successfully!");
      dispatch(clearCart());
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <NavBar />
      <div
        className="content-container p-4 d-flex flex-column align-items-center"
        style={{ backgroundColor: "#D3D3D3" }}
      >
        <div
          className="row container-fluid"
          style={{ backgroundColor: "#D3D3D3", maxWidth: "80%" }}
        >
          <div className="col-md-12 p-5">
            <div className="row">
              <div className="col-md-7">
                <div
                  className="cart-items-container mb-4 p-3 border rounded"
                  style={{ backgroundColor: "#f8f9fa", maxWidth: "100%" }}
                >
                  
                  {Object.keys(cart).length > 0 ? (
                    Object.entries(cart).map(([vendorEmail, vendorItems]) =>
                      Object.entries(vendorItems).map(([menuId, item]) => (
                        <div
                          key={menuId}
                          className="cart-item-wrapper mb-2 mt p-3 border rounded d-flex flex-column align-items-center"
                          style={{ width: "100%" }}
                        >
                          <CartItem
                            menuId={menuId}
                            cartItem={item}
                            vendorEmail={vendorEmail}
                            updateBill={updateBill}
                          />
                        </div>
                      ))
                    )
                  ) : (
                    <h4 className="page-title">
                      There are no menu items added to the cart
                    </h4>
                  )}
                </div>
                <div
                  className="order-summary-container p-3 border rounded"
                  style={{ backgroundColor: "#e9ecef", maxWidth: "100%" }}
                >
                  <h4 className="text-center">Order Summary</h4>
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <span>Sub Total:</span>
                      <span>{subTotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>GST (18%):</span>
                      <span>{gst.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Delivery Charges:</span>
                      <span>25.00</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>Total:</span>
                      <span>{total.toFixed(2)}</span>
                    </div>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div
                  className="address-section p-3 border rounded d-flex flex-column align-items-center"
                  style={{ backgroundColor: "#f0f0f0", maxWidth: "100%" }} // Adjust the maxWidth here
                >
                  <div className="mb-3 w-100 text-center">
                    <button
                      className="btn btn-primary"
                      onClick={handleChooseAddress}
                    >
                      Choose Delivery Address
                    </button>
                  </div>

                  {showAddresses && (
                    <div className="mb-3 w-100 text-center">
                      <button
                        className="btn btn-primary"
                        onClick={handleAddNewAddress}
                      >
                        <i className="mdi mdi-plus me-2"></i> Add New Address
                      </button>
                    </div>
                  )}

                  {showAddresses && addresses.length > 0 && (
                    <div className="row w-100 d-flex justify-content-center">
                      {addresses.map((address, index) =>
                        address ? (
                          <div className="col-md-8 mb-3" key={index}>
                            <div
                              className={`card text-center ${
                                selectedAddressIndex === index
                                  ? "bg-success text-white"
                                  : ""
                              }`}
                            >
                              <div className="card-body">
                                <h5 className="card-title">
                                  {selectedAddressIndex === index
                                    ? "Address Selected"
                                    : `Address ${index + 1}`}
                                </h5>
                                <p className="card-text">
                                  {address.adrLine1 ? address.adrLine1 : ""},{" "}
                                  {address.adrLine2
                                    ? address.adrLine2 + ", "
                                    : ""}
                                  {address.city ? address.city : ""},{" "}
                                  {address.state ? address.state : ""},{" "}
                                  {address.country ? address.country : ""}
                                </p>
                                <p className="card-text">
                                  ZipCode:{" "}
                                  {address.zipcode ? address.zipcode : ""}
                                </p>
                                <p className="card-text">
                                  Phone:{" "}
                                  {address.phoneNo ? address.phoneNo : ""}
                                </p>
                                <button
                                  className={`btn ${
                                    selectedAddressIndex === index
                                      ? "btn-light"
                                      : "btn-primary"
                                  }`}
                                  onClick={() =>
                                    handleSelectAddress(address, index)
                                  }
                                >
                                  {selectedAddressIndex === index
                                    ? "Address Selected"
                                    : "Select Address"}
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  )}

                  {showAddAddress && (
                    <AddCustomerAddressModal addedAddress={handleAddAddress} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;







// import React, { useEffect, useState, useCallback } from "react";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import NavBar from "../components/navbar/navbar";
// import CartItem from "../components/cart/cartItem";
// import Footer from "../components/footer/footer";
// import AddCustomerAddressModal from "../components/register/AddCustomerAddressModal";
// import { placeOrder } from "../services/OrderService"; // Import the OrderService
// import { generateRandomTransactionId } from "../Utils/utility";
// import { setAddresses } from "../redux/AddressSlice"; // Import the action
// import { clearCart } from "../redux/cartSlice";

// function Cart() {
//  const navigate = useNavigate();
//  const dispatch = useDispatch();
//  const initialCart = useSelector((state) => state.cart.items);
//  const addresses = useSelector((state) => state.address.addresses);
//  const vendorId = useSelector((state) => state.vendor.id); // Get vendorId from Redux store
//  const [cart, setCart] = useState(initialCart);
//  const [total, setTotal] = useState(0);
//  const [subTotal, setSubTotal] = useState(0);
//  const [gst, setGst] = useState(0);
//  const [showAddAddress, setShowAddAddress] = useState(false);
//  const [selectedAddress, setSelectedAddress] = useState(null);
//  const [showAddresses, setShowAddresses] = useState(false);
//  const [paymentMethod, setPaymentMethod] = useState("GOOGLE_PAY"); // Default payment method
//  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null); // Track selected address index

//  const [updateQuantity, setUpdateQuantity] = useState(0);
//  const calculateBill = useCallback(() => {
//   let subTotal = 0;
//   Object.values(cart).forEach((vendorItems) => {
//    Object.values(vendorItems).forEach((item) => {
//     subTotal += item.menuPrice * updateQuantity;
//     console.log(subTotal);
//    });
//   });

//   const calculatedGst = 0.18 * subTotal;

//   const calculatedTotal = subTotal + calculatedGst + 25;

//   setSubTotal(subTotal);
//   setGst(calculatedGst);
//   setTotal(calculatedTotal);
//  }, [cart]);

//  useEffect(() => {
//   calculateBill();
//  }, [calculateBill, cart]);

//  const updateBill = useCallback((vendorEmail, menuId, newQuantity) => {
//   setUpdateQuantity(newQuantity);
//   console.log("hell0 " + newQuantity);

//   setCart((prevCart) => {
//    const updatedCart = { ...prevCart };
//    if (updatedCart[vendorEmail] && updatedCart[vendorEmail][menuId]) {
//     if (newQuantity <= 0) {
//      // Remove item from cart if quantity is zero or less
//      const { [menuId]: _, ...remainingItems } = updatedCart[vendorEmail];
//      updatedCart[vendorEmail] = remainingItems;
//      console.log("qerqw: " + newQuantity);
//      // Remove vendor from cart if it has no items left
//      if (Object.keys(updatedCart[vendorEmail]).length === 0) {
//       const { [vendorEmail]: _, ...remainingVendors } = updatedCart;
//       return remainingVendors;
//      }
//     } else {
//      updatedCart[vendorEmail][menuId].quantity = newQuantity;
//      console.log("asfasdfasdfasdfasd:- " + newQuantity);
//     }
//    }

//    return updatedCart;
//   });
//  }, []);

//  const handleChooseAddress = () => {
//   if (addresses.length === 0) {
//    setShowAddAddress(true); // Show AddCustomerAddressModal if no addresses are found
//   } else {
//    setShowAddresses(true); // Show address cards if addresses are found
//   }
//  };

//  const handleCloseAddAddress = () => {
//   setShowAddAddress(false); // Close AddCustomerAddressModal
//  };

//  const handleSelectAddress = (address, index) => {
//   setSelectedAddress(address);
//   setSelectedAddressIndex(index); // Set the selected address index
//  };

//  const handleAddNewAddress = () => {
//   setShowAddAddress(true); // Show AddCustomerAddressModal when the button is clicked
//  };

//  const handleAddAddress = (newAddress) => {
//   // Update local addresses state
//   console.log("new address" + newAddress);
//   dispatch(setAddresses([...addresses, newAddress])); // Add the new address to the Redux store

//   console.log("Addresses from Redux store:", addresses); // Add this to debug

//   setShowAddAddress(false); // Close the modal
//  };

//  const handlePlaceOrder = async () => {
//   if (!selectedAddress) {
//    toast.error("Please select a delivery address.");
//    return;
//   }

//   // Prepare the orderRequest object by correctly mapping the cart items
//   const orderRequest = {
//    menuItems: Object.entries(cart).flatMap(([vendorEmail, vendorItems]) =>
//     Object.entries(vendorItems).map(([menuId, item]) => ({
//      id: parseInt(menuId),
//      quantity: item.quantity,
//     }))
//    ),
//    address: selectedAddress,
//    payment: {
//     paymentMethod: paymentMethod,
//     amount: total,
//     transactionId: generateRandomTransactionId(),
//    },
//   };

//   // Retrieve customerId and token from session storage
//   const customerId = sessionStorage.getItem("id");
//   const token = sessionStorage.getItem("token");

//   if (!customerId || !token) {
//    toast.error("User information is missing. Please log in again.");
//    return;
//   }

//   try {
//    console.log("Order Request Data:", orderRequest);
//    const response = await placeOrder(customerId, vendorId, token, orderRequest);
//    console.log("Order Placed:", response);

//    toast.success("Order placed successfully!");
//    dispatch(clearCart()); // Clear the cart after placing the order
//    navigate("/"); // Navigate to order confirmation page
//   } catch (error) {
//    toast.error(error.message);
//    console.error("Error placing order:", error);
//   }
//  };

//  return (
//   <div>
//    <NavBar />
//    <br />
//    <br />
//    <br />

//    <div className="content-container">
//     <div className="row container-fluid">
//      <div className="col-xl-1"></div>
//      <div className="col-xl-8">
//       <div className="row my-4">
//        <div className="col-12 mb-3 d-flex justify-content-between">
//         <button className="btn btn-primary" onClick={handleChooseAddress}>
//          Choose Delivery Address
//         </button>
//         {showAddresses && (
//          <button className="btn btn-primary" onClick={handleAddNewAddress}>
//           <i className="mdi mdi-plus"></i> Add New Address
//          </button>
//         )}
//        </div>
//        {showAddresses && addresses.length > 0 && (
//         <div className="row">
//          {addresses.map((address, index) =>
//           // Defensive check to ensure address is defined
//           address ? (
//            <div className="col-md-6 mb-3" key={index}>
//             <div
//              className={`card ${
//               selectedAddressIndex === index ? "bg-success text-white" : ""
//              }`}
//             >
//              <div className="card-body">
//               <h5 className="card-title">
//                {selectedAddressIndex === index
//                 ? "Address Selected"
//                 : `Address ${index + 1}`}
//               </h5>
//               <p className="card-text">
//                {address.adrLine1 ? address.adrLine1 : ""},{" "}
//                {address.adrLine2 ? address.adrLine2 + ", " : ""}
//                {address.city ? address.city : ""},{" "}
//                {address.state ? address.state : ""},{" "}
//                {address.country ? address.country : ""}
//               </p>
//               <p className="card-text">
//                ZipCode: {address.zipcode ? address.zipcode : ""}
//               </p>
//               <p className="card-text">
//                Phone: {address.phoneNo ? address.phoneNo : ""}
//               </p>
//               <button
//                className={`btn ${
//                 selectedAddressIndex === index ? "btn-light" : "btn-primary"
//                }`}
//                onClick={() => handleSelectAddress(address, index)}
//               >
//                {selectedAddressIndex === index
//                 ? "Address Selected"
//                 : "Select Address"}
//               </button>
//              </div>
//             </div>
//            </div>
//           ) : null
//          )}
//         </div>
//        )}
//        {showAddAddress && (
//         <AddCustomerAddressModal addedAddress={handleAddAddress} />
//        )}
//        <div>
//         {Object.keys(cart).length > 0 ? (
//          Object.entries(cart).map(([vendorEmail, vendorItems]) =>
//           Object.entries(vendorItems).map(([menuId, item]) => (
//            <CartItem
//             key={menuId}
//             menuId={menuId}
//             cartItem={item}
//             vendorEmail={vendorEmail}
//             updateBill={updateBill}
//            />
//           ))
//          )
//         ) : (
//          <h4 className="page-title">
//           There are no menu items added to the cart
//          </h4>
//         )}
//        </div>
//       </div>
//      </div>

//      <div className="col-xl-3">
//       <div className="mt-5 mt-lg-0">
//        <div className="card rounded-5">
//         <div className="card-header border-bottom py-3 px-4 rounded-5">
//          <img
//           src="https://img.freepik.com/free-vector/isometric-bento-box-illustration_52683-56499.jpg?t=st=1719145384~exp=1719148984~hmac=cc6282626b8e649114356810a7e83fbb3fc5f6e8312f82313e0e6e00ae1c7158"
//           className="img-fluid"
//           alt="order-img"
//          />
//          <h4 className="text-center">Order Summary</h4>
//         </div>
//         <div className="card-body">
//          <div className="d-flex justify-content-between">
//           <span>Sub Total:</span>
//           <span>{subTotal.toFixed(2)}</span>
//          </div>
//          <div className="d-flex justify-content-between">
//           <span>GST (18%):</span>
//           <span>{gst.toFixed(2)}</span>
//          </div>
//          <div className="d-flex justify-content-between">
//           <span>Delivery Charges:</span>
//           <span>25.00</span>
//          </div>
//          <div className="d-flex justify-content-between">
//           <span>Total:</span>
//           <span>{total.toFixed(2)}</span>
//          </div>
//          <div className="d-flex flex-column">
//           <label>Payment Method</label>
//           <select
//            value={paymentMethod}
//            onChange={(e) => setPaymentMethod(e.target.value)}
//           >
//            <option value="GOOGLE_PAY">UPI</option>
//            {/* <option value="PAYPAL">PayPal</option> */}
//            <option value="CREDIT_CARD">Credit Card</option>
//           </select>
//           <button className="btn btn-primary mt-3" onClick={handlePlaceOrder}>
//            Place Order
//           </button>
//          </div>
//         </div>
//        </div>
//       </div>
//      </div>
//     </div>
//    </div>
//    {/* <Footer /> */}
//   </div>
//  );
// }

// export default Cart;
