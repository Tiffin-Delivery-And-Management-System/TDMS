
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { removeItem } from "../../redux/cartSlice";
// import "./counter.css";

// function Counter({ quantity, onQuantityChange, vendorEmail, menuId }) {
//   const dispatch = useDispatch();
//   const navigate= useNavigate();

//   const increaseQuant = () => {
//     onQuantityChange(quantity + 1);
//   };

//   const decreaseQuant = () => {
//     const newQuantity = quantity - 1;
    
//     // console.log("afdasf:- "+newQuantity);
//     if (newQuantity === 0) {
//       onQuantityChange(newQuantity);
//       // Remove item from cart when quantity reaches zero
//       dispatch(removeItem({ vendorEmail, menuId }));
//       console.log("menu id asdfa: "+menuId)
     
//     } else {
//       onQuantityChange(newQuantity);
//     }
//   };

//   return (
//     <div className="qty mt-2">
//       <span className="minus bg-dark" onClick={decreaseQuant} >
//         -
//       </span>
//       <input
//         type="number"
//         disabled
//         className="count"
//         name="qty"
//         value={quantity}
//       />
//       <span className="plus bg-dark" onClick={increaseQuant}>
//         +
//       </span>
//     </div>
//   );
// }

// export default Counter;



import React from "react";
import { useDispatch } from "react-redux";
import { updateItemQuantity, removeItem } from "../../redux/cartSlice";
import "./counter.css";

function Counter({ quantity, onQuantityChange, vendorEmail, menuId }) {
  const dispatch = useDispatch();

  const increaseQuant = () => {
    onQuantityChange(quantity + 1);
    dispatch(updateItemQuantity({ vendorEmail, menuId, quantity: quantity + 1 }));
  };

  const decreaseQuant = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      onQuantityChange(newQuantity);

      if (newQuantity === 0) {
        dispatch(removeItem({ vendorEmail, menuId })); // Remove item when quantity reaches 0
      } else {
        dispatch(updateItemQuantity({ vendorEmail, menuId, quantity: newQuantity }));
      }
    }
  };

  return (
    <div className="qty mt-2">
      <span className="minus bg-dark" onClick={decreaseQuant}>
        -
      </span>
      <input
        type="number"
        disabled
        className="count"
        name="qty"
        value={quantity}
      />
      <span className="plus bg-dark" onClick={increaseQuant}>
        +
      </span>
    </div>
  );
}

export default Counter;






// import React from "react";
// import { useDispatch } from "react-redux";
// import { removeItem } from "../../redux/cartSlice";
// import "./counter.css";

// function Counter({ quantity, onQuantityChange, vendorEmail, menuId }) {
//   const dispatch = useDispatch();

//   const increaseQuant = () => {
//     onQuantityChange(quantity + 1);
//   };

//   const decreaseQuant = () => {
//     const newQuantity = quantity - 1;
//     // console.log("afdasf:- "+newQuantity);
//     if (newQuantity === 0) {
//       onQuantityChange(newQuantity);
//       // Remove item from cart when quantity reaches zero
//       dispatch(removeItem({ vendorEmail, menuId }));
//       console.log("menu id asdfa: "+menuId)
     
//     } else {
//       onQuantityChange(newQuantity);
//     }
//   };

//   return (
//     <div className="qty mt-5">
//       <span className="minus bg-dark" onClick={decreaseQuant}>
//         -
//       </span>
//       <input
//         type="number"
//         disabled
//         className="count"
//         name="qty"
//         value={quantity}
//       />
//       <span className="plus bg-dark" onClick={increaseQuant}>
//         +
//       </span>
//     </div>
//   );
// }

// export default Counter;
