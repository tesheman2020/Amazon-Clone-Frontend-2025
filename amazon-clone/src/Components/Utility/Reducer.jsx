import { Type } from "./action.Type";

export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case Type.SET_USER:
      localStorage.setItem("user", JSON.stringify(action.user));
      return { ...state, user: action.user };

    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id,
      );

      let newBasket;
      if (existingItem) {
        newBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item,
        );
      } else {
        newBasket = [...state.basket, { ...action.item, amount: 1 }];
      }

      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };
    }

    case Type.REMOVE_FROM_BASKET: {
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];

      if (index >= 0) {
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      }

      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };
    }

    case Type.EMPTY_BASKET:
      localStorage.setItem("basket", JSON.stringify([]));
      return { ...state, basket: [] };

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
//     case Type.SET_USER:
//       localStorage.setItem("user", JSON.stringify(action.user));
//       return { ...state, user: action.user };

//     case Type.ADD_TO_BASKET: {
//       const existingItem = state.basket.find(
//         (item) => item.id === action.item.id
//       );

//       let newBasket;
//       if (existingItem) {
//         newBasket = state.basket.map((item) =>
//           item.id === action.item.id
//             ? { ...item, amount: item.amount + 1 }
//             : item
//         );
//       } else {
//         newBasket = [...state.basket, { ...action.item, amount: 1 }];
//       }

//       localStorage.setItem("basket", JSON.stringify(newBasket));
//       return { ...state, basket: newBasket };
//     }

//     case Type.REMOVE_FROM_BASKET: {
//       const index = state.basket.findIndex((item) => item.id === action.id);
//       let newBasket = [...state.basket];

//       if (index >= 0) {
//         if (newBasket[index].amount > 1) {
//           newBasket[index] = {
//             ...newBasket[index],
//             amount: newBasket[index].amount - 1,
//           };
//         } else {
//           newBasket.splice(index, 1);
//         }
//       }

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
