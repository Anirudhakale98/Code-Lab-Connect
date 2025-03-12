import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, Avatar, Button, Divider, Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 260;

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
});

const hoverStyle = {
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateX(5px)",
    transition: "all 0.3s ease-in-out",
  },
};

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const Dashboard = ({ user = { firstName: "F", lastName: "L", role: "teacher" }, classes = [] }) => {
  const navigate = useNavigate();

  const handleLogout = async() => {
    // localStorage.removeItem("user");
    // navigate("/login");
    try {
      const response = await axios.post("/api/v1/users/logout");
      if (response.status === 200) {
        localStorage.removeItem("user");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledDrawer variant="permanent" anchor="left">
      {/* User Info */}
      <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
        <Avatar sx={{ bgcolor: "secondary.main", marginRight: 1 }}>
          {user.firstName[0]?.toUpperCase()}
          {user.lastName[0]?.toUpperCase()}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
          {user.firstName}
        </Typography>
      </Toolbar>

      {/* Navigation Links (Aligned to Top) */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          <ListItem button sx={hoverStyle} component={StyledLink} to={`/${user.role}s/`}>
            <ListItemText primary="Home" primaryTypographyProps={{ variant: "h6", fontWeight: "medium" }} />
          </ListItem>
          {classes.length > 0 ? (
            classes.map((classItem, index) => (
              <ListItem key={index} sx={hoverStyle} button component={StyledLink} to={`/${user.role}s/classes/${classItem.classroomId}`}>
                <ListItemText primary={classItem.title} primaryTypographyProps={{ variant: "h6", fontWeight: "medium" }} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: "#aaa", textAlign: "center", mt: 2 }}>
              No classes available
            </Typography>
          )}
        </List>
      </Box>

      {/* Logout Button (Always at Bottom) */}
      <Box p={2}>
        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", mb: 2 }} />
        <Button variant="contained" color="secondary" fullWidth onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </StyledDrawer>
  );
};

export default Dashboard;
