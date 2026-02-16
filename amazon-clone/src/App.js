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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: { uid: authUser.uid, email: authUser.email },
        });
      } else {
        dispatch({ type: Type.SET_USER, user: null });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return null; // wait for Firebase before rendering

  return <Routing />;
}

export default App;
