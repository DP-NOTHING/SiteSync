import VerticalTabs from "../components/VerticalTabs";
import { Typography } from "@mui/material";
import Stats from "../components/Stats";

function DeploymentDetails() {
  const lables = [
    "Deployment One",
    "Deployment Two",
    "Deployment Three",
    "Deployment Four",
  ];
  return (
    <VerticalTabs labels={lables}>
      <Stats></Stats>
      <Typography>Content for Deployment Two</Typography>
      <Typography>Content for Deployment FIve</Typography>
      <Typography>Content for Deployment Four</Typography>
    </VerticalTabs>
  );
}

export default DeploymentDetails;
