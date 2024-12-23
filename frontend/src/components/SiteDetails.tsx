// SiteDetails.tsx
import React from "react";
import { Box, Paper, Typography, Divider, styled } from "@mui/material";
import { SiteDetailsProps } from "../types";

const ContentContainer = styled(Box)({
  flexGrow: 1,
  height: "100vh", // Full viewport height
  overflow: "hidden", // Prevent container scroll
  display: "flex",
  flexDirection: "column",
});

const ScrollableContent = styled(Box)({
  padding: "20px",
  flexGrow: 1,
  overflowY: "auto", // Enable vertical scrolling
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#bdbdbd",
    borderRadius: "3px",
  },
});

const SiteDetails: React.FC<SiteDetailsProps> = ({ selectedSite }) => {
  if (!selectedSite) {
    return (
      <ContentContainer>
        <ScrollableContent>
          <Box sx={{ padding: 3 }}>
            <Typography variant="h6">Welcome to SiteSync</Typography>
          </Box>
        </ScrollableContent>
      </ContentContainer>
    );
  }

  return (
    <ContentContainer>
      <ScrollableContent>
        <Paper elevation={0} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
            Site Details
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            {selectedSite.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Location: {selectedSite.location}
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            Sample content section
          </Typography>
        </Paper>
      </ScrollableContent>
    </ContentContainer>
  );
};

export default SiteDetails;
