import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    email: null, // Start with null vendor
    items: {}, // Structure: { vendorEmail: { menuId: { quantity, ... } } }
  },
  reducers: {
    addItem: (state, action) => {
      const { vendorEmail, menuId, menuName, menuPrice, menuImage, quantity } = action.payload;

      // If no vendor is set OR a different vendor's item is added, clear the cart
      if (state.email === null || state.email !== vendorEmail) {
        state.email = vendorEmail;
        state.items = {}; // Clear previous vendor's items
      }

      // Initialize the vendor if not present
      if (!state.items[vendorEmail]) {
        state.items[vendorEmail] = {};
      }

      // Initialize the menu item if not present
      if (!state.items[vendorEmail][menuId]) {
        state.items[vendorEmail][menuId] = {
          menuName,
          menuPrice,
          menuImage,
          quantity,
        };
      } else {
        state.items[vendorEmail][menuId].quantity += quantity;
      }
    },

    removeItem: (state, action) => {
      const { vendorEmail, menuId } = action.payload;
      if (state.items[vendorEmail]) {
        delete state.items[vendorEmail][menuId];

        // Remove vendor if no items remain
        if (Object.keys(state.items[vendorEmail]).length === 0) {
          delete state.items[vendorEmail];
          state.email = null;
        }
      }
    },

    // updateItemQuantity: (state, action) => {
    //   const { vendorEmail, menuId, quantity } = action.payload;
    //   if (state.items[vendorEmail] && state.items[vendorEmail][menuId]) {
    //     state.items[vendorEmail][menuId].quantity = quantity;
    //   }
    // },

    updateItemQuantity: (state, action) => {
      const { vendorEmail, menuId, quantity } = action.payload;
      if (state.items[vendorEmail] && state.items[vendorEmail][menuId]) {
        if (quantity > 0) {
          state.items[vendorEmail][menuId].quantity = quantity;
        } else {
          delete state.items[vendorEmail][menuId]; //  Remove item when quantity is 0
    
          //  Remove vendor if no items remain
          if (Object.keys(state.items[vendorEmail]).length === 0) {
            delete state.items[vendorEmail];
            state.email = null;
          }
        }
      }
    },
    

    clearCart: (state) => {
      state.items = {};
      state.email = null;
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;




// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: {}, // Structure: { vendorEmail: { menuId: { quantity, ... } } }
//   },
//   reducers: {
//     addItem: (state, action) => {
//       const { vendorEmail, menuId, menuName, menuPrice, menuImage, quantity } = action.payload;
      
//       if (!state.items[vendorEmail]) {
//         state.items[vendorEmail] = {};
//       }
//       if (!state.items[vendorEmail][menuId]) {
//         state.items[vendorEmail][menuId] = {
//           menuName,
//           menuPrice,
//           menuImage,
//           quantity,
//         };
//       } else {
//         state.items[vendorEmail][menuId].quantity += quantity;
//       }
//     },
//     removeItem: (state, action) => {
//       const { vendorEmail, menuId } = action.payload;
//       if (state.items[vendorEmail]) {
//         delete state.items[vendorEmail][menuId];
//         // Remove the vendor entry if there are no items left for the vendor
//         if (Object.keys(state.items[vendorEmail]).length === 0) {
//           delete state.items[vendorEmail];
//         }
//       }
//     },
//     updateItemQuantity: (state, action) => {
//       const { vendorEmail, menuId, quantity } = action.payload;
//       if (state.items[vendorEmail] && state.items[vendorEmail][menuId]) {
//         state.items[vendorEmail][menuId].quantity = quantity;
//       }
//     },
//     clearCart: (state) => {
//       state.items = {};
//     },
//   },
// });

// export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;
