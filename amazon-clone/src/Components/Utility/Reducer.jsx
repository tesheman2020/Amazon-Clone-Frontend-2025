import { Type } from "./action.Type";

export const initialState = {
  basket: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const item = action.item;

      // Check if item already exists
      const existingItem = state.basket.find((i) => i.id === item.id);

      if (!existingItem) {
        // increment quantity
        return {
          ...state,
          basket: state.basket.map((i) =>
            i.id === item.id ? { ...i, amount: i.amount + 1 } : i
          ),
        };
      }
      

      // Add new item
      return {
        ...state,
        basket: [...state.basket, { ...item, amount: 1 }],
      };
    }

    case Type.REMOVE_FROM_BASKET: {
      const item = state.basket.find((i) => i.id === action.id);
      if (!item) return state;

      if (item.amount === 1) {
        return {
          ...state,
          basket: state.basket.filter((i) => i.id !== action.id),
        };
      }

      return {
        ...state,
        basket: state.basket.map((i) =>
          i.id === action.id ? { ...i, amount: i.amount - 1 } : i
        ),
      };
    }

    default:
      return state;
  }
};

export default reducer;





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
