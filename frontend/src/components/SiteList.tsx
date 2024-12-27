import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Drawer,
  styled,
  Fab,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { SiteListProps } from "../types";
import { useNavigate } from "react-router-dom";

const DrawerContainer = styled(Box)({
  width: "300px",
  height: "100vh",
  position: "relative",
});

const ScrollableList = styled(List)({
  padding: 0,
  overflowY: "auto",
  height: "calc(100% - 80px)",
  "&::-webkit-scrollbar": { width: "6px" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#4a5568",
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-track": { backgroundColor: "#2d3748" },
});

const StyledListItemButton = styled(ListItemButton)({
  "&.Mui-selected": {
    backgroundColor: "#2d3748",
    borderLeft: "4px solid #8b5cf6",
    boxShadow: "20px 20px 60px #200d3d, -20px -20px 60px #2c1153",
    "&:hover": { backgroundColor: "#374151" },
    "& .MuiListItemText-primary": {
      fontWeight: "bold",
      color: "#8b5cf6",
    },
    "& .MuiListItemText-secondary": {
      color: "#a0aec0",
    },
  },
  "&:hover": {
    backgroundColor: "#2d3748",
    boxShadow: "20px 20px 60px #200d3d, -20px -20px 60px #2c1153",
  },
  "& .MuiListItemText-primary": { color: "#e2e8f0" },
  "& .MuiListItemText-secondary": {
    color: "#7b63ff",
    fontWeight: "bold",
  },
  transition: "all 0.2s",
  padding: "12px 16px",
});

const AddButton = styled(Fab)({
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#8b5cf6",
  color: "white",
  "&:hover": { backgroundColor: "#7c3aed" },
  boxShadow: "0 10px 15px -3px rgba(139, 92, 246, 0.3)",
  zIndex: 9999,
});

const SiteList: React.FC<SiteListProps> = ({
  sites,
  selectedSiteId,
  onSiteSelect,
}) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/new");
  };

  return (
    <DrawerContainer>
      <Drawer
        variant="permanent"
        sx={{
          width: 300,
          "& .MuiDrawer-paper": {
            width: 300,
            boxSizing: "border-box",
            position: "relative",
            height: "100vh",
            background:
              "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #2d1b3d 100%)",
            overflow: "hidden",
          },
        }}
      >
        <ScrollableList>
          {sites.map((site) => (
            <ListItem key={site.id} disablePadding>
              <StyledListItemButton
                selected={site.id === selectedSiteId}
                onClick={() => onSiteSelect(site.id)}
              >
                <ListItemText
                  primary={site.name}
                  secondary={site.location}
                  sx={{
                    fontWeight: site.id === selectedSiteId ? "bold" : "normal",
                  }}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </ScrollableList>
        <AddButton onClick={handleAddClick} size="medium">
          <AddIcon />
        </AddButton>
      </Drawer>
    </DrawerContainer>
  );
};

export default SiteList;
