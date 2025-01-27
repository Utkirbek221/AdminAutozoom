import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout";
import ErrorPage from "./Components/ErrorPage";
import Login from "./Components/Login";
import Home from "./Pages/Home";
import Cars from "./Components/Cars";
import Cities from "./Components/Cities";
import Locations from "./Components/Locations";
import Models from "./Components/Models";
import Brands from "./Components/Brands";
import Settings from "./Components/Settings";
import Dashboard from "./Components/Dashboard";

function App() {
  const token = localStorage.getItem("token");
  const router = createBrowserRouter([
    {
      path: "/",
      element: token ? <Navigate to="/home" /> : <Login />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/home",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/home",
          element: <Home />
          // element: token ? <Home /> : <Navigate to="/" /> ,
        },
        {
          path: "/home/dashboard",
          element: <Dashboard />
        },
        {
          path: "/home/brands",
          element: <Brands />
        },
        {
          path: "/home/models",
          element: <Models />
        },
        {
          path: "/home/locations",
          element: <Locations />
        },
        {
          path: "/home/cities",
          element: <Cities />
        },
        {
          path: "/home/cars",
          element: <Cars />
        },
        {
          path: "/home/settings",
          element: <Settings />
        },

      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
