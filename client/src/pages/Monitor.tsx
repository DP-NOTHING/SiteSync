import VerticalTabs from "../components/VerticalTabs";
import { Typography } from "@mui/material";
import Stats from "../components/Stats";

function Monitor() {
  const lables = ["Tab One", "Tab Two", "Tab Three", "Tab Four"];
  return (
    <VerticalTabs labels={lables}>
      <Stats></Stats>
      <Typography>Content for Tab Two</Typography>
      <Typography>Content for Tab FIve</Typography>
      <Typography>Content for Tab Four</Typography>
    </VerticalTabs>
  );
}

export default Monitor;
