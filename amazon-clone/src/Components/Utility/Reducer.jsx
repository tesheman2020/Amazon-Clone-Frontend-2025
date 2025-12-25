import { Type } from "./action.Type";

export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    // 1. SET USER (Missing in your previous code - fixed)
    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    // 2. ADD TO BASKET (Logic was inverted - fixed)
    case Type.ADD_TO_BASKET: {
      // Check if the item already exists in the basket
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );

      if (existingItem) {
        // If it exists, map through and increment the amount
        return {
          ...state,
          basket: state.basket.map((item) =>
            item.id === action.item.id
              ? { ...item, amount: item.amount + 1 }
              : item
          ),
        };
      } else {
        // If it's new, add the item to the basket with amount 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }
    }

    // 3. REMOVE FROM BASKET
    case Type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          // If more than one, decrement amount
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          // If only one, remove from array
          newBasket.splice(index, 1);
        }
      }

      return {
        ...state,
        basket: newBasket,
      };
    }

    // 4. EMPTY BASKET (Useful for clearing after payment)
    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default reducer;

// import { Type } from "./action.Type";

// export const initialState = {
//   basket: [],
//   user: null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case Type.ADD_TO_BASKET: {
//       const item = action.item;

//       // Check if item already exists
//       const existingItem = state.basket.find((i) => i.id === item.id);

//       if (!existingItem) {
//         // increment quantity
//         return {
//           ...state,
//           basket: state.basket.map((i) =>
//             i.id === item.id ? { ...i, amount: i.amount + 1 } : i
//           ),
//         };
//       }

//       // Add new item
//       return {
//         ...state,
//         basket: [...state.basket, { ...item, amount: 1 }],
//       };
//     }

//     case Type.REMOVE_FROM_BASKET: {
//       const item = state.basket.find((i) => i.id === action.id);
//       if (!item) return state;

//       if (item.amount === 1) {
//         return {
//           ...state,
//           basket: state.basket.filter((i) => i.id !== action.id),
//         };
//       }

//       return {
//         ...state,
//         basket: state.basket.map((i) =>
//           i.id === action.id ? { ...i, amount: i.amount - 1 } : i
//         ),
//       };
//     }

//     default:
//       return state;
//   }
// };

// export default reducer;

// // reducer.js
// import { Type } from "./action.Type";

// export const initialState = {
//   basket: [],
//   user: null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case Type.ADD_TO_BASKET: {
//       const item = action.item;
//       const existing = state.basket.find((i) => i.id === item.id);

//       if (existing) {
//         return {
//           ...state,
//           basket: state.basket.map((i) =>
//             i.id === item.id ? { ...i, amount: i.amount + 1 } : i
//           ),
//         };
//       }

//       return {
//         ...state,
//         basket: [...state.basket, { ...item, amount: 1 }],
//       };
//     }

//     case Type.REMOVE_FROM_BASKET: {
//       const item = state.basket.find((i) => i.id === action.id);
//       if (!item) return state;

//       if (item.amount === 1) {
//         return {
//           ...state,
//           basket: state.basket.filter((i) => i.id !== action.id),
//         };
//       }

//       return {
//         ...state,
//         basket: state.basket.map((i) =>
//           i.id === action.id ? { ...i, amount: i.amount - 1 } : i
//         ),
//       };
//     }

//     default:
//       return state;
//   }
// };

// export default reducer;
