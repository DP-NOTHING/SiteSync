import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./components/signup/SignUp.tsx";
import DeploymentDetails from "./pages/DeploymentDetails.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { neobrutalism } from "@clerk/themes";
import "./index.css";
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import NavBar from "./components/Navbar.tsx";
import { Box } from "@mui/material";
import AnalyticsForm from "./components/analyticsform/AnalyticsForm.tsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
  throw new Error("Missing Publishable Key");
}

const Root = () => (
  <div>
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  // {
  //   element: <RootLayout />,
  //   errorElement: <ErrorPage />,
  //   children: [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <h1>Landing Page</h1>,
      },
      {
        path: "user/:userId",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <App />,
          },
          {
            path: ":projectId",
            element: <DeploymentDetails></DeploymentDetails>,
          },
        ],
      },
    ],
  },
  {
    path: "sign-in",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "sign-up",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "verify-email-address",
        element: <div>Verify Email Address</div>,
        errorElement: <ErrorPage />, // Add errorElement for verify-email-address
      },
    ],
  },
  {
    path: "test",
    element: <AnalyticsForm />,
    errorElement: <ErrorPage />,
  },
  //   ],
  // },
]);

createRoot(document.getElementById("root")!).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    afterSignOutUrl="/"
    appearance={{
      baseTheme: neobrutalism,
    }}
  >
    <RouterProvider router={router} />
  </ClerkProvider>
);
