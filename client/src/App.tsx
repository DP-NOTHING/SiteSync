import "./App.css";
import MiniDrawer from "./components/MiniDrawer.tsx";
import NavBar from "./components/Navbar.tsx";
import Stats from "./components/Stats.tsx";
import { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { SignedOut,SignedIn} from "@clerk/clerk-react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";

function App() {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [selectedSetting, setSelectedSetting] = useState("");

  const renderContent = () => {
    switch (selectedPage) {
      case "Home":
        return <Typography>Home Content</Typography>;
      case "Monitor":
        return (
          // <SignedIn>
            <MiniDrawer>
              <Stats></Stats>
            </MiniDrawer>
          // </SignedIn>
        );
      case "Deployments":
        return (
          
        <Typography>Deployments Content</Typography>
        
        );
      default:
        return <Typography>Select a page</Typography>;
    }
  };

  const router = createBrowserRouter([
    {
      element: <SignInPage />,
      path : "/sign-in"
    },
    {
      element: <SignUpPage />,
      path : "/sign-up"
    },
    {
      element :<><NavBar
      setSelectedPage={setSelectedPage}
      setSelectedSetting={setSelectedSetting}
    />
    <Box sx={{ p: 3 }}>{renderContent()}</Box></> ,
      path : "/"
    }
  ]);

 

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
