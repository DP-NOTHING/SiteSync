import "./App.css";
import NavBar from "./components/Navbar.tsx";
import { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Deployments from "./pages/Deployments.tsx";
import Monitor from "./pages/Monitor.tsx";

function App() {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [selectedSetting, setSelectedSetting] = useState("");

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

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <NavBar
          setSelectedPage={setSelectedPage}
          setSelectedSetting={setSelectedSetting}
        />
        <Box sx={{ flexGrow: 1, display: "flex", mt: 8 }}>
          {renderContent()}
        </Box>
      </Box>
    </>
  );
}

export default App;
