import "../login/loginModal.css";
import "./navbar.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "../login/loginModal";
import RegisterModal from "../register/registerModal";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/userSlice";
import { toast } from "react-toastify";

import { LogIn, LogOut, UserPlus, User, ShoppingCart } from "lucide-react";

function NavBar() {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const cart = useSelector((state) => state.cart || { items: [] });
 const loginStatus = useSelector((state) => state.user.loginStatus);

 const [loginModal, setLoginModal] = useState(false);
 const [registerModal, setRegisterModal] = useState(false);

 const role = sessionStorage.getItem("role");

 const communicateModal = () => {
  setLoginModal(!loginModal);
  setRegisterModal(!registerModal);
 };

 const toggleLoginModal = () => {
  setLoginModal(!loginModal);
  setRegisterModal(false);
  window.onpopstate = null; // Enable back button for login
 };

 const toggleRegisterModal = () => {
  setRegisterModal(!registerModal);
  setLoginModal(false);
 };

 const handleLogout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("id");
  sessionStorage.removeItem("name");
  sessionStorage.setItem("loginStatus", false);
  dispatch(logoutAction());

  //Extra
  // sessionStorage.clear();
  //   localStorage.clear();

  // Replace the current history state with the login page
  navigate("/", { replace: true });

  // Remove the ability to go back to the previous protected page
  // window.history.pushState(null, "", window.location.href);

  window.onpopstate = () => {
   navigate("/");
  };
 };

 //  const handleCartClick = () => {
 //   if (role !== "ROLE_CUSTOMER") {
 //   } else {
 //    navigate("/cart");
 //   }
 //  };

 const handleCartClick = () => {
  navigate("/cart");
 };

 const handleProfileClick = () => {
  if (!loginStatus) {
   toast.error("Please Sign to View Profile!");
  } else {
   if (role === "ROLE_ADMIN") {
    navigate("/adminhome");
   } else if (role === "ROLE_VENDOR") {
    navigate("/vendorhomepage");
   } else if (role === "ROLE_DELIVERY_BOY") {
    navigate("/deliveryhome");
   } else {
    navigate("/ProfilePage");
   }
  }
 };

 const handleCustomerHomeClick = () => {
  navigate("/customerHome");
 };

 const handleAboutUsClick = () => {
  navigate("/about-us");
 };

 return (
  <div>
   <div
    className="navbar navbar-expand-md fixed-top navbar-dark bg-dark bg-gradient"
    // style={{ backgroundColor: "orange" }}
   >
    <div className="container-fluid">
     <button
      className="navbar-brand btn btn-link"
      onClick={() => navigate("/")}
      style={{
       color: "pink",
       textDecoration: "none",
       fontSize: "1.25rem",
       fontWeight: "bold",
      }} //1rem = 16px DEFAULT
     >
      DABBEWALA
     </button>
     {/* <button
      className="navbar-toggler rounded-5"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
     >
      <span className="navbar-toggler-icon"></span>
     </button> */}
     <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarDropdown"
      aria-controls="navbarDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
     >
      <span className="navbar-toggler-icon"></span>
     </button>
     {/* <div className="collapse navbar-collapse" id="navbarCollapse"> */}
     <div className="collapse navbar-collapse" id="navbarDropdown">
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
       <li className="nav-item active">
        {role === "ROLE_CUSTOMER" ? (
         <a
          className="nav-link"
          href="#"
          onClick={(e) => {
           e.preventDefault();
           navigate("/customerHome");
          }}
          style={{ color: "white", textDecoration: "none" }}
         >
          Vendors List
         </a>
        ) : (
         <a
          className="nav-link"
          href="#"
          onClick={(e) => {
           e.preventDefault(); // Prevents default anchor behavior so it does not refresh the page
           navigate("/");
          }}
          style={{ color: "white", textDecoration: "none" }}
         >
          Home
         </a>
        )}
       </li>
       <li className="nav-item dropdown">
        <a
         className="nav-link dropdown-toggle"
         href="#"
         id="navbarDropdownMenu"
         role="button"
         data-bs-toggle="dropdown"
         aria-haspopup="true"
         aria-expanded="false"
         style={{ color: "white", textDecoration: "none" }}
        >
         Learn More
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenu">
         <a className="dropdown-item" href="#">
          About Us
         </a>
         <a className="dropdown-item" href="#">
          Contact Us
         </a>
         <a className="dropdown-item" href="#">
          Our Team
         </a>
        </div>
       </li>
      </ul>

      {/*RHS Buttons  */}
      <div style={{ display: "flex", gap: "20px" }}>
       {role === "ROLE_CUSTOMER" && (
        <a
         //  href="#"
         onClick={(e) => {
          e.preventDefault();
          handleCartClick();
         }}
         style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
         //  Use cursor: "pointer" to show the cursor as a pointer when hovering over the text && not using "href"
        >
         {/* <button                 // Creates a button styled clicker here
        type="button"
        onClick={handleCartClick}
        className="btn btn-secondary"
       > */}
         <ShoppingCart size={20} /> Cart
        </a>
       )}

       <a
        href="#"
        onClick={(e) => {
         e.preventDefault();
         handleProfileClick();
        }}
        style={{ color: "white", textDecoration: "none" }}
       >
        <User size={20} /> Profile
       </a>

       {!loginStatus && (
        <a
         href="#"
         onClick={(e) => {
          e.preventDefault();
          toggleRegisterModal();
         }}
         style={{ color: "white", textDecoration: "none" }}
        >
         <UserPlus size={20} /> Register
        </a>
       )}

       {!loginStatus ? (
        <a
         href="#"
         onClick={(e) => {
          e.preventDefault();
          toggleLoginModal();
         }}
         style={{ color: "white", textDecoration: "none" }}
        >
         <LogIn size={20} /> Login
        </a>
       ) : (
        <a
         href="#"
         onClick={(e) => {
          e.preventDefault();
          handleLogout();
         }}
         style={{ color: "white", textDecoration: "none" }}
        >
         <LogOut size={20} /> Logout
        </a>
       )}
      </div>
     </div>
    </div>
   </div>
   <div>
    {loginModal && (
     <LoginModal
      onClose={toggleLoginModal}
      onToggleRegister={communicateModal}
     />
    )}
   </div>
   <div>
    {registerModal && (
     <RegisterModal
      onClose={toggleRegisterModal}
      onToggleLogin={communicateModal}
     />
    )}
   </div>
  </div>
 );
}

export default NavBar;
