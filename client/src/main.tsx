import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import ErrorPage from "./pages/error-page.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./components/signup/SignUp.tsx";
import DeploymentDetails from "./pages/DeploymentDetails.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { neobrutalism } from "@clerk/themes";
import "./index.css";
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
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-in",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
