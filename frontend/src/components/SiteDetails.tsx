// // SiteDetails.tsx
// import React, { useEffect, useState } from "react";
// import { Box, Paper, Typography, Divider, styled } from "@mui/material";
// import { SiteDetailsProps } from "../types";
// import axios from "axios";

// const ContentContainer = styled(Box)({
//   flexGrow: 1,
//   height: "100vh", // Full viewport height
//   overflow: "hidden", // Prevent container scroll
//   display: "flex",
//   flexDirection: "column",
// });

// const ScrollableContent = styled(Box)({
//   padding: "20px",
//   flexGrow: 1,
//   overflowY: "auto", // Enable vertical scrolling
//   "&::-webkit-scrollbar": {
//     width: "6px",
//   },
//   "&::-webkit-scrollbar-thumb": {
//     backgroundColor: "#bdbdbd",
//     borderRadius: "3px",
//   },
// });

// const SiteDetails: React.FC<SiteDetailsProps> = ({ selectedSite }) => {
//   const [site, setSite] = useState(selectedSite);

//   useEffect(() => {
//     const fetchSiteDetails = async () => {
//       if (selectedSite) {
//         axios
//           .get(`${import.meta.env.VITE_BACKEND_URL}/get-project`, {
//             params: { projectId: selectedSite.id },
//           })
//           .then((response) => {
//             setSite(response.data);
//             console.log(response.data);
//           })
//           .catch((error) => {
//             console.error("Error fetching site details:", error);
//           });
//       }
//     };

//     fetchSiteDetails();
//   }, [selectedSite]);

//   if (!selectedSite) {
//     return (
//       <ContentContainer>
//         <ScrollableContent>
//           <Box sx={{ padding: 3 }}>
//             <Typography variant="h6">Welcome to SiteSync</Typography>
//           </Box>
//         </ScrollableContent>
//       </ContentContainer>
//     );
//   }

//   return (
//     <ContentContainer>
//       <ScrollableContent>
//         <Paper elevation={0} sx={{ padding: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             Site Details
//           </Typography>
//           <Divider sx={{ my: 2 }} />
//           {site && (
//             <>
//               <Typography variant="h6" gutterBottom>
//                 {site.projectname}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Git URL: {site.giturl}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Deployment URL:{" "}
//                 <a href={site.url} target="_blank" rel="noopener noreferrer">
//                   {site.url}
//                 </a>
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 User ID: {site.userid}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Deployment Date: {format(new Date(site.deploymentdate), "PPPpp")}
//               </Typography>
//             </>
//           )}
//         </Paper>
//       </ScrollableContent>
//     </ContentContainer>
//   );
// };

// export default SiteDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Divider,
  styled,
  Grid,
  Card,
  CardContent,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";
import { SiteDetail } from "../types";
import { ArrowUpRight, Users, Globe, GitBranch, Calendar } from "lucide-react";
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
    backgroundColor: "#4a5568",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#2d3748",
  },
});

type SiteDetailsProps = {
  selectedSite: { id: string; name: string } | null;
};

const SiteDetails: React.FC<SiteDetailsProps> = ({ selectedSite }) => {
  const [site, setSite] = useState<SiteDetail>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteDetails = async () => {
      if (selectedSite) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/get-project`,
            {
              params: { projectId: selectedSite.id },
            }
          );
          setSite(response.data);
        } catch (error) {
          console.error("Error fetching site details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSiteDetails();
  }, [selectedSite]);

  if (!site) {
    return (
      <ContentContainer>
        <ScrollableContent>
          <Box
            sx={{
              p: 3,
              height: "100vh",
              color: "#fff",
              background:
                "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #2d1b3d 100%)",
            }}
          >
            <Typography variant="h6">Select a site to view details</Typography>
          </Box>
        </ScrollableContent>
      </ContentContainer>
    );
  } else if (loading) {
    return (
      <ContentContainer>
        <ScrollableContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        </ScrollableContent>
      </ContentContainer>
    );
  }
  return (
    <ContentContainer>
      <ScrollableContent>
        <Box
          sx={{
            p: 3,
            height: "100vh",
            color: "#fff",
            background: "#0a091a",
          }}
        >
          <Paper
            elevation={0}
            sx={{ p: 3, mb: 3, backgroundColor: "#2d2c33", color: "white" }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {site.projectname}
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Deployment Details
              </Typography>
              <Stack spacing={2}>
                <Box display="flex" alignItems="center">
                  <GitBranch size={20} style={{ marginRight: 8 }} />
                  <Typography variant="body1">
                    Git URL: {site.giturl}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Globe size={20} style={{ marginRight: 8 }} />
                  <Typography variant="body1">
                    Deployment URL:{" "}
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {site.url}
                    </a>
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Calendar size={20} style={{ marginRight: 8 }} />
                  <Typography variant="body1">
                    Last Deployed:{" "}
                    {new Date(site.deploymentdate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </ScrollableContent>
    </ContentContainer>
  );
};

export default SiteDetails;
