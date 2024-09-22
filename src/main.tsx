// External imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Styles
import "./index.css";

// Assets
import LoginImg from "./assets/login.jpeg";

// Routes
import { URLs } from "./routes";

// Context Providers
import { AuthProvider } from "./context/AuthContext/AuthContextProvider";
import { FiltersProvider } from "./context/FilterContext/FiltersContextProvider";

// Layouts
import AppLayout from "./layouts/app";
import AuthLayout from "./layouts/auth";

// Pages
import Filters from "./pages/filters";
import ErrorPage from "./pages/error";
import UnavailablePage from "./pages/unavailabe";
import Login from "./pages/login";
import Queries from "./pages/queries";
import Illustrations from "./pages/illustrations";
import Settings from "./pages/settings";

// Helper function to create routes
const createRoutes = () => [
  {
    path: URLs.auth.base,
    element: <AuthLayout coverImage={LoginImg} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: URLs.auth.login,
        element: <Login />
      },
      {
        path: URLs.auth.forgotPassword,
        element: <UnavailablePage />
      },
      {
        path: URLs.auth.google,
        element: <UnavailablePage />
      },
      {
        path: URLs.auth.signUp,
        element: <UnavailablePage />
      }
    ]
  },
  {
    path: URLs.app.base,
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: URLs.app.filters,
        element: <Filters />
      },
      {
        path: URLs.app.queries,
        element: <Queries />
      },
      {
        path: URLs.app.illustrations,
        element: <Illustrations />
      },
      {
        path: URLs.app.settings,
        element: <Settings />
      }
    ]
  },
  {
    path: URLs.api.base,
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: URLs.api.inspect,
        element: <UnavailablePage />
      }
    ]
  }
];

// Router configuration
const router = createBrowserRouter(createRoutes());

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
