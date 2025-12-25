import React, { createContext, useReducer } from "react";
import reducer, { initialState } from "../Utility/Reducer";
// import { auth } from "../Utility/firebase";
// import { Type } from "../Utility/action.Type";

export const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;


// import React, { createContext, useReducer, useEffect } from "react";
// import { auth } from "../Utility/firebase";
// import { onAuthStateChanged } from "firebase/auth";
// import reducer, { initialState } from "../Utility/Reducer";
// import { Type } from "../Utility/action.Type";

// export const DataContext = createContext();

// export const DataProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   // 🔥 IMPORTANT: keep user logged in
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       dispatch({
//         type: Type.SET_USER,
//         user: user,
//       });
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <DataContext.Provider value={{ state, dispatch }}>
//       {children}
//     </DataContext.Provider>
//   );
// };

