import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import OutlinedCard from "../components/OutlinedCards";

export default function Deployments() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {[...Array(6)].map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <OutlinedCard />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
