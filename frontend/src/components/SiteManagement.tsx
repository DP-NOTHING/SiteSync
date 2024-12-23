// SiteManagement.tsx
import React, { useState } from "react";
import { Box, styled } from "@mui/material";
import SiteList from "./SiteList";
import SiteDetails from "./SiteDetails";
import { Site } from "../types";

const MainContainer = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100%",
});

const SiteManagement: React.FC = () => {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);

  const sampleSites: Site[] = [
    { id: "1", name: "Site Alpha" },
    { id: "2", name: "Site Beta" },
    { id: "3", name: "Site Gamma" },
    { id: "4", name: "Site Beta" },
    { id: "5", name: "Site Gamma" },
    { id: "6", name: "Site Beta" },
    { id: "7", name: "Site Gamma" },
    { id: "8", name: "Site Beta" },
    { id: "9", name: "Site Gamma" },
    { id: "10", name: "Site Beta" },
    { id: "11", name: "Site Gamma" },
    { id: "12", name: "Site Beta" },
    { id: "13", name: "Site Gamma" },
    { id: "14", name: "Site Beta" },
    { id: "15", name: "Site Gamma" },
  ];

  const selectedSite =
    sampleSites.find((site) => site.id === selectedSiteId) || null;

  return (
    <MainContainer>
      <SiteList
        sites={sampleSites}
        selectedSiteId={selectedSiteId}
        onSiteSelect={setSelectedSiteId}
      />
      <SiteDetails selectedSite={selectedSite} />
    </MainContainer>
  );
};

export default SiteManagement;
