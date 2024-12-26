// SiteManagement.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Box, styled } from "@mui/material";
import SiteList from "./SiteList";
import SiteDetails from "./SiteDetails";
import { Site } from "../types";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const MainContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100%",
});

const SiteManagement: React.FC = () => {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [sites, setSites] = useState<Site[]>([]);
  const user = useAuth();
  useEffect(() => {
    const fetchSites = async () => {
      try {
        await axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/get-projects`, {
            params: {
              userId: user.userId,
            },
          })
          .then((response) => {
            console.log(response);
            setSites(response.data);
          })
          .catch((error) => {
            console.error("Error fetching sites:", error);
          });
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    fetchSites();
  }, []);

  const selectedSite = useMemo(
    () => sites.find((site) => site.id === selectedSiteId) || null,
    [sites, selectedSiteId]
  );

  return (
    <MainContainer>
      <SiteList
        sites={sites}
        selectedSiteId={selectedSiteId}
        onSiteSelect={setSelectedSiteId}
      />
      <SiteDetails selectedSite={selectedSite} />
    </MainContainer>
  );
};

export default SiteManagement;
