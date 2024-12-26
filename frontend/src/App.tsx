import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { neobrutalism, shadesOfPurple } from "@clerk/themes";
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

import CheckAuth from "./components/CheckAuth.tsx";
import DeploymentForm from "./pages/DeploymentForm/DeploymenyForm.tsx";
import SiteManagement from "./components/SiteManagement.tsx";
import DashBoardLayout from "./layout/DashBoardLayout.tsx";
import path from "path";
import HeroSection from "./pages/LandingPage/LandingPage.tsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HeroSection />,
      },
      {
        path: "/dashboard",
        element: (
          <CheckAuth>
            <Outlet />
          </CheckAuth>
        ),
        children: [
          {
            index: true,
            element: <SiteManagement />,
          },
        ],
      },
      {
        path: "/new",
        element: (
          <CheckAuth>
            <Outlet />
          </CheckAuth>
        ),
        children: [
          {
            index: true,
            element: <DeploymentForm />,
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
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  console.log("rendered");
  return (
    <>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        redirectUrl="/dashboard"
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
        appearance={{
          baseTheme: shadesOfPurple,
        }}
      >
        <RouterProvider router={router} />
      </ClerkProvider>
    </>
  );
}

export default App;
