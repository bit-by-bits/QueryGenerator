import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import "./index.css";

import LoginImg from "./assets/login.jpeg";

import { URLs } from "./routes";

import { ThemeProvider } from "./context/ThemeContext/ThemeContextProvider";
import { AuthProvider } from "./context/AuthContext/AuthContextProvider";
import { FiltersProvider } from "./context/FilterContext/FiltersContextProvider";

import AppLayout from "./layouts/app";
import AuthLayout from "./layouts/auth";

import Filters from "./pages/filters";
import ErrorPage from "./pages/error";
import UnavailablePage from "./pages/unavailabe";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Queries from "./pages/queries";
import Illustrations from "./pages/illustrations";
import Settings from "./pages/settings";
import Inspect from "./pages/inspect";

const createRoutes = () => [
  {
    path: "/",
    element: <Navigate to={URLs.auth.login} />
  },
  {
    path: URLs.auth.base,
    element: <AuthLayout coverImage={LoginImg} />,
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
        element: <Signup />
      },

      {
        path: "*",
        element: <UnavailablePage />
      }
    ]
  },
  {
    path: URLs.app.base,
    element: <AppLayout />,
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
      },

      {
        path: "*",
        element: <UnavailablePage />
      }
    ]
  },
  {
    path: URLs.api.base,
    element: <AppLayout />,
    children: [
      {
        path: URLs.api.inspect,
        element: <Inspect />
      },

      {
        path: "*",
        element: <UnavailablePage />
      }
    ]
  },
  {
    path: "*",
    element: <ErrorPage />
  }
];

const router = createBrowserRouter(createRoutes());

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <FiltersProvider>
            <RouterProvider router={router} />
          </FiltersProvider>
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
