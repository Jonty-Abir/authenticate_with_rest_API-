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
import { AuthorizeUser, ProtectRoute } from "./middlewares/Auth";
/* */
/***_______     ________**/

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/password",
      element: (
        <ProtectRoute>
          <Password />
        </ProtectRoute>
      ),
    },
    {
      path: "/profile",
      element: (
        <AuthorizeUser>
          {" "}
          <Profile />
        </AuthorizeUser>
      ),
    },
    { path: "/reset", element: <Reset /> },
    { path: "/recovery", element: <Recovery /> },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <main className="main flex flex-col h-full w-screen justify-center items-center">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
