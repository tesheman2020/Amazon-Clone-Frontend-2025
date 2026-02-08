
import React, { createContext, useReducer } from "react";
import reducer, { initialState } from "../Utility/Reducer";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider
      value={{
        basket: state.basket,
        user: state.user,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

// import React, { createContext, useReducer } from "react";
// import reducer, { initialState } from "../Utility/Reducer";

// export const DataContext = createContext();

// const init = () => ({

//     basket: JSON.parse(localStorage.getItem("basket")) || [],
//     user: JSON.parse(localStorage.getItem("user")) || null,
//   });

// const DataProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState, init);

//   return (
//     <DataContext.Provider
//       value={{
//         basket: state.basket,
//         user: state.user,
//         dispatch,
//       }}
//     >
//       {children}
//     </DataContext.Provider>
//   );
// };

// export default DataProvider;
