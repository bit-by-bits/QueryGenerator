import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import ErrorPage from "./pages/error";
import UnavailablePage from "./pages/unavailabe";
import "./index.css";
import { AuthProvider } from "./context/AuthContextProvider";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <UnavailablePage />,
  },
  {
    path: "/google-login",
    element: <UnavailablePage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <UnavailablePage />,
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>,
  );
}
