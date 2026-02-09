import { Type } from "./action.Type";

export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET: {
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id,
      );

      let newBasket;

      if (existingItem) {
        // Add the amount from action.item.amount
        newBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + (action.item.amount || 1) }
            : item,
        );
      } else {
        // Add new item with the correct amount
        newBasket = [
          ...state.basket,
          { ...action.item, amount: action.item.amount || 1 },
        ];
      }

      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };
    }

    case Type.SET_AMOUNT: {
      const newBasket = state.basket.map((item) =>
        item.id === action.id ? { ...item, amount: action.amount } : item,
      );

      localStorage.setItem("basket", JSON.stringify(newBasket));
      return { ...state, basket: newBasket };
    }

    case Type.REMOVE_FROM_BASKET: {
      const newBasket = state.basket
        .map((item) =>
          item.id === action.id ? { ...item, amount: item.amount - 1 } : item,
        )
        .filter((item) => item.amount > 0);

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
