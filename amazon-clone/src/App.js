// import React from "react";
// import Routing from "./Router.jsx";

// function App() {
//   return <Routing />;
// }

// export default App;


import React, { useEffect, useContext, useState } from "react";
import Routing from "./Router.jsx";
import { auth } from "./Components/Utility/firebase";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from "./Components/Utility/action.Type";

function App() {
  const { dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState(true); // 🔹 Track if auth is ready

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
      setLoading(false); // 🔹 Auth check done
    });

    return () => unsubscribe();
  }, [dispatch]);

  // 🔹 Wait until auth is initialized
  if (loading) return null; // or a spinner <div>Loading...</div>

  return <Routing />;
}

export default App;


// import React, { useEffect, useContext } from "react";
// import Routing from "./Router.jsx";
// import { auth } from "./Components/Utility/firebase";
// import { DataContext } from "./Components/DataProvider/DataProvider";
// import { Type } from "./Components/Utility/action.Type";

// function App() {
//   const { dispatch } = useContext(DataContext);

//   useEffect(() => {
//     // This observer restores the user session from local storage automatically
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         dispatch({
//           type: Type.SET_USER,
//           user: authUser,
//         });
//       } else {
//         dispatch({
//           type: Type.SET_USER,
//           user: null,
//         });
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, [dispatch]);

//   return <Routing />;
// }

// export default App;

// import React, { useEffect, useContext } from "react";
// import Routing from "./Router.jsx";
// import { auth } from "./Components/Utility/firebase";
// import { DataContext } from "./Components/DataProvider/DataProvider";
// import { Type } from "./Components/Utility/action.Type";

// function App() {
//   const { dispatch } = useContext(DataContext);

//   useEffect(() => {
//     // This observer restores the user session from local storage automatically
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         dispatch({
//           type: Type.SET_USER,
//           user: authUser,
//         });
//       } else {
//         dispatch({
//           type: Type.SET_USER,
//           user: null,
//         });
//       }
//     });

//     // Cleanup subscription on unmount
//     return () => unsubscribe();
//   }, [dispatch]);

//   return <Routing />;
// }

// export default App;

