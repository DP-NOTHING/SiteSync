import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { GitHub, LinkedIn, Rocket } from "@mui/icons-material";

const pages = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Deployments",
    url: "/dashboard",
  },
  {
    title: "Contact us",
    url: "/contact",
  },
];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        backgroundImage:
          "linear-gradient(to bottom, rgba(15, 15, 26, 0.95), rgba(15, 15, 26, 0.8))",
        backdropFilter: "blur(10px)",
        boxShadow: "none",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                color: "rgba(255, 255, 255, 0.7)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  backgroundColor: "rgba(15, 15, 26, 0.95)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px",
                  marginTop: "8px",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography
                    component="a"
                    href={page.url}
                    sx={{ textAlign: "center" }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Box
            sx={{
              display: "flex",
              // justifyContent: "space-between",
              alignItems: "center",
              py: 2,
              backgroundColor: "transparent",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "& svg": {
                  color: "#8b5cf6",
                },
                marginRight: 2,
              }}
            >
              <Rocket /> SiteSync
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                href={page.url}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Tooltip title="GitHub">
              <IconButton
                key="github"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  marginRight: 2,
                }}
                href="https://github.com/DP-NOTHING/WebWatch.git"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton
                key="linkedin"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  marginRight: 3,
                }}
                href="https://www.linkedin.com/in/patel-deep-r/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedIn />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <SignedOut>
              <Button
                onClick={() => navigate("/sign-in")}
                sx={{
                  color: "white",
                  background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
                  px: 3,
                  py: 1,
                  borderRadius: "24px",
                  "&:hover": {
                    background: "linear-gradient(45deg, #5a5ff9, #7c4dff)",
                  },
                }}
              >
                Sign in
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
// import { useNavigate } from "react-router-dom";
// import { GitHub, LinkedIn, Rocket } from "@mui/icons-material";

// interface Page {
//   title: string;
//   url: string;
// }

// const pages: Page[] = [
//   {
//     title: "Home",
//     url: "/",
//   },
//   {
//     title: "Deployments",
//     url: "/dashboard",
//   },
//   {
//     title: "Contact us",
//     url: "/contact",
//   },
// ];

// const NavBar: React.FC = () => {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
//     null
//   );
//   const navigate = useNavigate();

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         background: "transparent",
//         backgroundImage:
//           "linear-gradient(to bottom, rgba(15, 15, 26, 0.95), rgba(15, 15, 26, 0.8))",
//         backdropFilter: "blur(10px)",
//         boxShadow: "none",
//         borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar disableGutters sx={{ minHeight: "70px" }}>
//           {/* Mobile Menu */}
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               onClick={handleOpenNavMenu}
//               sx={{
//                 color: "rgba(255, 255, 255, 0.7)",
//                 "&:hover": {
//                   backgroundColor: "rgba(255, 255, 255, 0.05)",
//                 },
//               }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//                 "& .MuiPaper-root": {
//                   backgroundColor: "rgba(15, 15, 26, 0.95)",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(255, 255, 255, 0.05)",
//                   borderRadius: "12px",
//                   marginTop: "8px",
//                 },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem
//                   key={page.title}
//                   onClick={handleCloseNavMenu}
//                   sx={{
//                     "&:hover": {
//                       backgroundColor: "rgba(255, 255, 255, 0.05)",
//                     },
//                   }}
//                 >
//                   <Typography
//                     component="a"
//                     href={page.url}
//                     sx={{
//                       textAlign: "center",
//                       color: "rgba(255, 255, 255, 0.7)",
//                       textDecoration: "none",
//                       "&:hover": {
//                         color: "white",
//                       },
//                     }}
//                   >
//                     {page.title}
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           {/* Logo */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               py: 2,
//               backgroundColor: "transparent",
//             }}
//           >
//             <Typography
//               variant="h5"
//               sx={{
//                 color: "white",
//                 fontWeight: "bold",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//                 "& svg": {
//                   color: "#8b5cf6",
//                 },
//               }}
//             >
//               <Rocket /> SiteSync
//             </Typography>
//           </Box>

//           {/* Desktop Navigation */}
//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "none", md: "flex" },
//               marginLeft: 4,
//             }}
//           >
//             {pages.map((page) => (
//               <Button
//                 key={page.title}
//                 href={page.url}
//                 onClick={handleCloseNavMenu}
//                 sx={{
//                   mx: 1,
//                   px: 2,
//                   color: "rgba(255, 255, 255, 0.7)",
//                   position: "relative",
//                   "&:hover": {
//                     color: "white",
//                     backgroundColor: "transparent",
//                     "&::after": {
//                       width: "100%",
//                     },
//                   },
//                   "&::after": {
//                     content: '""',
//                     position: "absolute",
//                     bottom: "10px",
//                     left: "0",
//                     width: "0%",
//                     height: "2px",
//                     backgroundColor: "#8b5cf6",
//                     transition: "width 0.2s ease-in-out",
//                   },
//                 }}
//               >
//                 {page.title}
//               </Button>
//             ))}
//           </Box>

//           {/* Social Icons */}
//           <Box sx={{ display: "flex", gap: 1 }}>
//             <IconButton
//               sx={{
//                 color: "rgba(255, 255, 255, 0.7)",
//                 "&:hover": {
//                   color: "white",
//                   backgroundColor: "rgba(255, 255, 255, 0.05)",
//                 },
//               }}
//               href="https://github.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <GitHub />
//             </IconButton>
//             <IconButton
//               sx={{
//                 color: "rgba(255, 255, 255, 0.7)",
//                 marginRight: 2,
//                 "&:hover": {
//                   color: "white",
//                   backgroundColor: "rgba(255, 255, 255, 0.05)",
//                 },
//               }}
//               href="https://linkedin.com"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <LinkedIn />
//             </IconButton>
//           </Box>

//           {/* Auth Section */}
//           <Box sx={{ flexGrow: 0 }}>
//             <SignedOut>
//               <Button
//                 onClick={() => navigate("/sign-in")}
//                 sx={{
//                   color: "white",
//                   background: "linear-gradient(45deg, #6366f1, #8b5cf6)",
//                   px: 3,
//                   py: 1,
//                   borderRadius: "24px",
//                   "&:hover": {
//                     background: "linear-gradient(45deg, #5a5ff9, #7c4dff)",
//                   },
//                 }}
//               >
//                 Sign in
//               </Button>
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default NavBar;
