import React from "react";
import { Box, Typography, styled, keyframes } from "@mui/material";

const ContentContainer = styled(Box)({
  flexGrow: 1,
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #2d1b3d 100%)",
  color: "#fff",
});

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const borderAnimation = keyframes`
  0% {
    border-color: #8b5cf6;
  }
  50% {
    border-color: #7c3aed;
  }
  100% {
    border-color: #8b5cf6;
  }
`;

const ComingSoonText = styled(Typography)({
  fontSize: "4rem",
  fontWeight: "bold",
  color: "#8b5cf6",
  animation: `${fadeIn} 2s ease-in-out, ${borderAnimation} 3s infinite`,
  padding: "20px",
  border: "4px solid",
  borderRadius: "10px",
});

const MonitorManagement: React.FC = () => {
  return (
    <ContentContainer>
      <ComingSoonText>Coming Soon</ComingSoonText>
    </ContentContainer>
  );
};

export default MonitorManagement;
