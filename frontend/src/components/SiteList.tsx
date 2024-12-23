// SiteList.tsx
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
  flexShrink: 0,
  height: "100vh",
});

const ScrollableList = styled(List)({
  padding: 0,
  overflowY: "auto",
  height: "100%",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#bdbdbd",
    borderRadius: "3px",
  },
});

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: "#e3f2fd",
    borderLeft: "4px solid #1976d2",
    "&:hover": {
      backgroundColor: "#bbdefb",
    },
    "& .MuiListItemText-primary": {
      fontWeight: "bold",
      color: "#1976d2",
    },
    "& .MuiListItemText-secondary": {
      color: "#1976d2",
    },
  },
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  transition: "all 0.2s",
  padding: "12px 16px",
}));
const AddButton = styled(Fab)({
  position: "absolute",
  bottom: "20px",
  right: "20px",
  zIndex: 1300, // Ensure it's above the list
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
          width: "300px",
          height: "100%",
          "& .MuiDrawer-paper": {
            width: "300px",
            boxSizing: "border-box",
            position: "relative",
            height: "100%",
            backgroundColor: "#fafafa",
            overflow: "hidden", // Prevent drawer paper from scrolling
          },
        }}
      >
        <ScrollableList>
          {/* Adding more items to demonstrate scrolling */}
          {sites.map((site) => (
            <ListItem key={`${site.id}`} disablePadding>
              <StyledListItemButton
                selected={site.id === selectedSiteId}
                onClick={() => onSiteSelect(site.id)}
              >
                <ListItemText
                  primary={`${site.name}`}
                  secondary={site.location}
                  primaryTypographyProps={{
                    style: {
                      fontWeight:
                        site.id === selectedSiteId ? "bold" : "normal",
                    },
                  }}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </ScrollableList>
        <AddButton color="primary" onClick={handleAddClick} size="medium">
          <AddIcon />
        </AddButton>
      </Drawer>
    </DrawerContainer>
  );
};

export default SiteList;
