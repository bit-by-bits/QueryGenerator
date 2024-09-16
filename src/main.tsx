import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginImg from "./assets/login.jpeg";
import { URLs } from "./routes";
import { AuthProvider } from "./context/AuthContext/AuthContextProvider";
import AppLayout from "./layouts/app";
import AuthLayout from "./layouts/auth";
import Filters from "./pages/filters";
import ErrorPage from "./pages/error";
import UnavailablePage from "./pages/unavailabe";
import Login from "./pages/login";
import { FiltersProvider } from "./context/FilterContext/FiltersContextProvider";
import Queries from "./pages/queries";

const router = createBrowserRouter([
  {
    path: URLs.auth,
    element: <AuthLayout coverImage={LoginImg} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: URLs.login,
        element: <Login />
      },
      {
        path: URLs.forgotPassword,
        element: <UnavailablePage />
      },
      {
        path: URLs.google,
        element: <UnavailablePage />
      },
      {
        path: URLs.signUp,
        element: <UnavailablePage />
      }
    ]
  },
  {
    path: URLs.app,
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: URLs.filters,
        element: <Filters />
      },
      {
        path: URLs.queries,
        element: <Queries />
      },
      {
        path: URLs.inspect,
        element: <UnavailablePage />
      }
    ]
  }
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <FiltersProvider>
          <RouterProvider router={router} />
        </FiltersProvider>
      </AuthProvider>
    </StrictMode>
  );
}
