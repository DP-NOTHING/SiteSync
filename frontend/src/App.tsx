import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { neobrutalism } from "@clerk/themes";
import SignUpPage from "./pages/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

import CheckAuth from "./components/CheckAuth.tsx";
import DeploymentForm from "./pages/DeploymentForm/DeploymenyForm.tsx";
import SiteManagement from "./components/SiteManagement.tsx";
import DashBoardLayout from "./layout/DashBoardLayout.tsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const Root = () => (
  <div>
    <Outlet />
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <h1>Landing Page</h1>,
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
          {
            path: ":projectId",
            element: <>deployment detail</>,
          },
        ],
      },
      {
        path: "new",
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
]);

function App() {
  console.log("rendered");
  return (
    <>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        afterSignOutUrl="/"
        appearance={{
          baseTheme: neobrutalism,
        }}
      >
        <RouterProvider router={router} />
      </ClerkProvider>
    </>
  );
}

export default App;
