import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../Store/atom/user.js";
import { userEmailState } from "../Store/selectors/userEmail";

function Appbar() {
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuOptionClick = (route) => {
    navigate(route);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#121212",
        width: "100%",
        left: 0,
        right: 0,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          flexWrap: "nowrap",
          minWidth: 0,
          paddingX: { xs: 1, sm: 2, md: 3 },
        }}
      >
        {/* Left Section: Menu Button + Logo */}
        <div style={{
          display: "flex", alignItems: "center", gap: "10px", flexWrap: "nowrap", minWidth: 0,


          gap: { xs: "6px", sm: "12px", md: "16px" }, // Adjusted for screens
          flexShrink: 0, // Prevents elements from shrinking too much

        }}>
          <IconButton size="large" edge="start" color="inherit" onClick={handleMenuClick}>
            <MenuIcon sx={{ color: "#A3E635" }} />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#9FCE03",
              cursor: "pointer",
              fontSize: { xs: "16px", sm: "20px" },
              flexGrow: 1,  // Allows the text to take available space
              minWidth: "auto", // Prevents text from being squished too much
              textAlign: "center",
            }}
            onClick={() => navigate("/")}
          >
            RepMax
          </Typography>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#222",
                color: "#fff",
                borderRadius: "8px",
                minWidth: "150px",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.4)",
                padding: "5px 0",
              },
            }}
          >
            {["Profile","Dailylog","Calender"].map((text) => (
              <MenuItem
                key={text}
                onClick={() => handleMenuOptionClick(`/${text}`)}
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  fontWeight: "500",
                  padding: { xs: "8px 16px", sm: "10px 20px" },
                  transition: "background 0.3s ease",
                  "&:hover": { backgroundColor: "#A3E635", color: "#121212" },
                }}
              >
                {text}
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* Right Section: Buttons & Avatar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "nowrap",
            minWidth: 0,
            gap: { xs: "6px", sm: "12px", md: "16px" }, // Dynamic spacing
            flexGrow: 1, // Helps distribute space dynamically
            justifyContent: "flex-end", // Ensures alignment

          }}
        >
          {!userEmail ? (
            <>
              <Button
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  color: "#9FCE03",
                  whiteSpace: "nowrap",
                  fontSize: { xs: "12px", sm: "14px" },
                  padding: "4px 8px",
                }}
                onClick={() => navigate("/Signup")}
              >
                Signup
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  color: "#9FCE03",
                  whiteSpace: "nowrap",
                  fontSize: { xs: "12px", sm: "14px" },
                  padding: "4px 8px",
                }}
                onClick={() => navigate("/Signin")}
              >
                Signin
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  color: "#9FCE03",
                  whiteSpace: "nowrap",
                  fontSize: { xs: "12px", sm: "14px" },
                  padding: "4px 8px",
                }}
                onClick={() => navigate("/")}
              >
                Home
              </Button>
              <Button
                color="inherit"
                sx={{
                  fontWeight: "bold",
                  color: "#9FCE03",
                  whiteSpace: "nowrap",
                  fontSize: { xs: "12px", sm: "14px" },
                  padding: "4px 8px",
                }}
                onClick={() => {
                  localStorage.setItem("token", null);
                  setUser({ isLoading: false, userEmail: null });
                }}
              >
                Signout
              </Button>
              <Avatar
                sx={{
                  bgcolor: deepOrange[500],
                  width: { xs: 24, sm: 28 },
                  height: { xs: 24, sm: 28 },
                  fontSize: { xs: 12, sm: 14 },
                }}
              >
                {userEmail[0]}
              </Avatar>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
