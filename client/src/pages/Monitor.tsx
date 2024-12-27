import VerticalTabs from "../components/VerticalTabs";
import { Box, Button, Fab, Typography } from "@mui/material";
import Stats from "../components/Stats";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
function Monitor() {
  const lables = ["Tab One", "Tab Two", "Tab Three", "Tab Four"];
  const [content, setContent] = useState(<Stats />);
  const handleButtonClick = () => {
    setContent(<Typography>New Content</Typography>);
  };
  return (
    <>
      <VerticalTabs labels={lables}>
        {content}
        <Stats></Stats>
        <Typography>Content for Tab Two</Typography>
        <Typography>Content for Tab FIve</Typography>
        <Typography>Content for Tab Four</Typography>
      </VerticalTabs>
      <Box sx={{ position: "fixed", bottom: 16, left: 16 }}>
        <Fab color="primary" aria-label="add" onClick={handleButtonClick}>
          <AddIcon />
        </Fab>
      </Box>
    </>
  );
}

export default Monitor;
