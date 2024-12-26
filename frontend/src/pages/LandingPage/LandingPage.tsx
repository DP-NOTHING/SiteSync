import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  useTheme,
  Theme,
} from "@mui/material";
import {
  Rocket,
  Speed,
  Timeline,
  GitHub,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";
import { SxProps } from "@mui/system";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
}

interface HeroProps {
  companyName?: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const HeroSection: React.FC<HeroProps> = ({}) => {
  // Updated darker background gradient
  const backgroundStyles: SxProps<Theme> = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #2d1b3d 100%)",
    position: "relative",
    overflow: "hidden",
  };

  const features: Feature[] = [
    {
      icon: <Rocket sx={{ fontSize: 40 }} />,
      title: "Instant Deploy",
      description:
        "Push to deploy in seconds. Automatic builds and zero downtime deployments.",
    },
    {
      icon: <Speed sx={{ fontSize: 40 }} />,
      title: "Global CDN",
      description:
        "Lightning-fast content delivery through our worldwide edge network.",
    },
    {
      icon: <Timeline sx={{ fontSize: 40 }} />,
      title: "Advanced Monitoring",
      description: "Real-time metrics and insights coming soon.",
      comingSoon: true,
    },
  ];

  return (
    <Box sx={backgroundStyles}>
      {/* Updated blob colors for darker theme */}
      <Box
        sx={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(103, 0, 255, 0.07) 0%, rgba(103, 0, 255, 0.03) 100%)",
          filter: "blur(60px)",
          top: "-200px",
          right: "-200px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(138, 43, 226, 0.07) 0%, rgba(138, 43, 226, 0.03) 100%)",
          filter: "blur(40px)",
          bottom: "-100px",
          left: "-100px",
        }}
      />

      {/* Navigation area - darker for seamless transition */}

      {/* Main Content */}
      <Container sx={{ mt: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: { xs: "3rem", md: "4.5rem" },
                  mb: 2,
                  background: "linear-gradient(to right, #fff, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Deploy React
                <br />
                with Confidence
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 4,
                  maxWidth: "600px",
                }}
              >
                Experience seamless deployment with our cutting-edge platform.
                Zero configuration, maximum performance.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #5a5ff9, #7c4dff)",
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                >
                  Documentation
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Feature Cards - Updated for darker theme */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(10px)",
                      position: "relative",
                      overflow: "visible",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    {feature.comingSoon && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: -10,
                          right: -10,
                          background:
                            "linear-gradient(45deg, #6366f1, #8b5cf6)",
                          color: "white",
                          padding: "4px 12px",
                          borderRadius: "16px",
                          fontSize: "0.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        Coming Soon
                      </Box>
                    )}
                    <CardContent sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ color: "#8b5cf6" }}>{feature.icon}</Box>
                      <Box>
                        <Typography variant="h6" sx={{ color: "white", mb: 1 }}>
                          {feature.title}
                        </Typography>
                        <Typography sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
