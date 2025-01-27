import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Typography, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const drawerWidth = 260;

const classes = [
  {
    title: "Demo classroom",
    teacher: "This is for trail purpose",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "This classroom is to get familar with environment",
  },
  {
    title: "DBMS",
    teacher: "MPK Mam",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "Database Management System",
  },
  {
    title: "DSA",
    teacher: "PVG Sir",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "Data Structures and Algorithms",
  },
  {
    title: "OOPS",
    teacher: "",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "Object-Oriented Programming System",
  },
];

// Styled Drawer
const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#2c2c2c",
    color: "#fff",
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

// Dashboard Component
const Dashboard = ({ user = { name: "User" } }) => {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar sx={{ display: "flex", alignItems: "center", px: 2 }}>
        <Avatar sx={{ bgcolor: "secondary.main", marginRight: 1 }}>
          {user.name[0].toUpperCase()}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: "bold", flexGrow: 1 }}>
          {user.name}
        </Typography>
      </Toolbar>
      <List>
        <ListItem button sx={hoverStyle} component={StyledLink} to={`/${user.role}s/`}>
          <ListItemText
            primary="Home"
            primaryTypographyProps={{ variant: "h6", fontWeight: "medium" }}
          />
        </ListItem>
        {classes.map((classItem, index) => (
          <ListItem
            sx={hoverStyle}
            button
            key={index}
            component={StyledLink}
            to={`/${user.role}s/classes/${classItem.title}`}
          >
            <ListItemText
              primary={classItem.title}
              primaryTypographyProps={{ variant: "h6", fontWeight: "medium" }}
            />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Dashboard;
