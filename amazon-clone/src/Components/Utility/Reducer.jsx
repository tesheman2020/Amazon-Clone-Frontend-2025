// src/Components/Utility/Reducer.js
import { Type } from "./action.Type";

export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  user: undefined, // 🔹 undefined = loading, null = logged out
};

const reducer = (state, action) => {
  let newBasket;
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      const existingItem = state.basket.find((i) => i.id === action.item.id);
      if (existingItem) {
        newBasket = state.basket.map((i) =>
          i.id === action.item.id
            ? { ...i, amount: i.amount + (action.item.amount || 1) }
            : i,
        );
      } else {
        newBasket = [
          ...state.basket,
          { ...action.item, amount: action.item.amount || 1 },
        ];
      }
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };

    case Type.SET_AMOUNT:
      newBasket = state.basket.map((i) =>
        i.id === action.id ? { ...i, amount: action.amount } : i,
      );
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };

    case Type.REMOVE_FROM_BASKET:
      newBasket = state.basket
        .map((i) => (i.id === action.id ? { ...i, amount: i.amount - 1 } : i))
        .filter((i) => i.amount > 0);
      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };

    case Type.EMPTY_BASKET:
      localStorage.setItem("basket", JSON.stringify([]));
      return { ...state, basket: [] };

    case Type.SET_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};

export default reducer;

// import { Type } from "./action.Type";

// export const initialState = {
//   basket: JSON.parse(localStorage.getItem("basket")) || [],
//   user: JSON.parse(localStorage.getItem("user")) || null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case Type.ADD_TO_BASKET: {
//       const existingItem = state.basket.find(
//         (item) => item.id === action.item.id,
//       );

//       let newBasket;

//       if (existingItem) {
//         // Add the amount from action.item.amount
//         newBasket = state.basket.map((item) =>
//           item.id === action.item.id
//             ? { ...item, amount: item.amount + (action.item.amount || 1) }
//             : item,
//         );
//       } else {
//         // Add new item with the correct amount
//         newBasket = [
//           ...state.basket,
//           { ...action.item, amount: action.item.amount || 1 },
//         ];
//       }

//       localStorage.setItem("basket", JSON.stringify(newBasket));
//       return { ...state, basket: newBasket };
//     }

//     case Type.SET_AMOUNT: {
//       const newBasket = state.basket.map((item) =>
//         item.id === action.id ? { ...item, amount: action.amount } : item,
//       );

//       localStorage.setItem("basket", JSON.stringify(newBasket));
//       return { ...state, basket: newBasket };
//     }

//     case Type.REMOVE_FROM_BASKET: {
//       const newBasket = state.basket
//         .map((item) =>
//           item.id === action.id ? { ...item, amount: item.amount - 1 } : item,
//         )
//         .filter((item) => item.amount > 0);

//       localStorage.setItem("basket", JSON.stringify(newBasket));
//       return { ...state, basket: newBasket };
//     }

//     case Type.EMPTY_BASKET:
//       localStorage.setItem("basket", JSON.stringify([]));
//       return { ...state, basket: [] };

//     default:
//       return state;
//   }
// };

// export default reducer;

// import { Type } from "./action.Type";

// export const initialState = {
//   basket: JSON.parse(localStorage.getItem("basket")) || [],
//   user: JSON.parse(localStorage.getItem("user")) || null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case Type.ADD_TO_BASKET: {
//       const existingItem = state.basket.find(
//         (item) => item.id === action.item.id,
//       );

//       let newBasket;

//       if (existingItem) {
//         // Add the amount from action.item.amount
//         newBasket = state.basket.map((item) =>
//           item.id === action.item.id
//             ? { ...item, amount: item.amount + (action.item.amount || 1) }
//             : item,
//         );
//       } else {
//         // Add new item with the correct amount
//         newBasket = [
//           ...state.basket,
//           { ...action.item, amount: action.item.amount || 1 },
//         ];
//       }

//       localStorage.setItem("basket", JSON.stringify(newBasket));
//       return { ...state, basket: newBasket };
//     }

//     case Type.SET_AMOUNT: {
//       const newBasket = state.basket.map((item) =>
//         item.id === action.id ? { ...item, amount: action.amount } : item,
//       );

//       localStorage.setItem("basket", JSON.stringify(newBasket));
//       return { ...state, basket: newBasket };
//     }

//     case Type.REMOVE_FROM_BASKET: {
//       const newBasket = state.basket
//         .map((item) =>
//           item.id === action.id ? { ...item, amount: item.amount - 1 } : item,
//         )
//         .filter((item) => item.amount > 0);

//       localStorage.setItem("basket", JSON.stringify(newBasket));
//       return { ...state, basket: newBasket };
//     }

//     case Type.EMPTY_BASKET:
//       localStorage.setItem("basket", JSON.stringify([]));
//       return { ...state, basket: [] };

//     default:
//       return state;
//   }
// };

// export default reducer;
