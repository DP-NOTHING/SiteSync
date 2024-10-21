import "./App.css";
import MiniDrawer from "./components/MiniDrawer.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import NavBar from "./components/Navbar.tsx";
import Stats from "./components/Stats.tsx";
import { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

function App() {
  const router = createBrowserRouter([
    {
      element: <SignInPage />,
      path: "/sign-in",
    },
    {
      element:<SignUpPage/>,
      path:"/sign-up",
    },
  ]);
    const [selectedPage, setSelectedPage] = useState("Home");
  const [selectedSetting, setSelectedSetting] = useState("");

  const renderContent = () => {
    switch (selectedPage) {
      case "Home":
        return <Typography>Home Content</Typography>;
      case "Monitor":
        return (
          <MiniDrawer>
            <Stats></Stats>
          </MiniDrawer>
        );
      case "Deployments":
        return <Typography>Deployments Content</Typography>;
      default:
        return <Typography>Select a page</Typography>;
    }
  };

  return (
    <>
      <NavBar
        setSelectedPage={setSelectedPage}
        setSelectedSetting={setSelectedSetting}
      />
      <Box sx={{ p: 3 }}>{renderContent()}</Box>
    </>
  );
}

export default App;
