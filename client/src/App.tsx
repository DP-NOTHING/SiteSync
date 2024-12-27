import "./App.css";
import NavBar from "./components/Navbar.tsx";
import { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Deployments from "./pages/Deployments.tsx";
import Monitor from "./pages/Monitor.tsx";
import { SignedOut, SignedIn } from "@clerk/clerk-react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import { useUser } from "@clerk/clerk-react";
// import AnalyticsForm from "./components/analyticsform/analyticsForm.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

function App() {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [selectedSetting, setSelectedSetting] = useState("");
  const { user } = useUser();
  console.log(user);
  const renderContent = () => {
    switch (selectedPage) {
      case "Home":
        return <Typography>Home Content</Typography>;
      case "Monitor":
        return <Monitor></Monitor>;
      case "Deployments":
        return <Deployments></Deployments>;
      default:
        return <Typography>Select a page</Typography>;
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar
            setSelectedPage={setSelectedPage}
            setSelectedSetting={setSelectedSetting}
            selectedPage={selectedPage}
          />
          <Box sx={{ p: 3 }}>
            {renderContent()}
            <Outlet />
          </Box>
        </>
      ),
      errorElement: <ErrorPage />, // Add errorElement for root
    },
    {
      path: "sign-in",
      element: <SignInPage />,
      errorElement: <ErrorPage />, // Add errorElement for sign-in
    },
    {
      path: "sign-up",
      element: <SignUpPage />,
      errorElement: <ErrorPage />, // Add errorElement for sign-up
    },
  ]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <NavBar
          setSelectedPage={setSelectedPage}
          setSelectedSetting={setSelectedSetting}
          selectedPage={selectedPage}
        />
        <Box sx={{ flexGrow: 1, display: "flex", mt: 8 }}>
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}

export default App;
