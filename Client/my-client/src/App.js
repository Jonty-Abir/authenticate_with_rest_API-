import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
/* import all components */
import Login from "./Components/Login";
import NotFound from "./Components/NotFound";
import Password from "./Components/Password";
import Profile from "./Components/Profile";
import Recovery from "./Components/Recovery";
import Register from "./Components/Register";
import Reset from "./Components/Reset";

/* */

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/password", element: <Password /> },
    { path: "/profile", element: <Profile /> },
    { path: "/reset", element: <Reset /> },
    { path: "/recovery", element: <Recovery /> },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <main className=" flex flex-col h-full w-screen justify-center items-center">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
