import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";


const classes = [
  {
    title: "Demo classroom",
    teacher: "This is for trail purpose",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "This classroom is to get familar with enivormnet",
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

const user = {
  name: "User",
  email: "",
  role: "student",
}


const hoverStyle = {

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Adjust hover color
    transform: "translateX(5px)", // Optional: add a slight shift
    transition: "all 0.3s ease-in-out", // Smooth transition
  },
}

const StyledCard = styled(Card)(({ color }) => ({
  background: color,
  color: "white",
  height: "180px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 30px rgba(0, 0, 0, 0.3)",
  },
}));

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const Classroom = () => {
  return (
    <Box display="flex">
      {/* Sidebar */}
      <Dashboard user={user} />
      {/* Main Content */}
      <Box flexGrow={1} p={3} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        {/* Header */}
        <AppBar position="static" color="primary" sx={{ borderRadius: "10px", mb: 3 }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Code-Lab-Connect
            </Typography>
          </Toolbar>
        </AppBar>


        {/* Add Class Button if user is teacher then only show this button*/}
        {user.role === "teacher" && (<Box display="flex" justifyContent="flex-end" mb={3}>
          <Button component={StyledLink} to={"/add-class"}
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "20px",
              px: 4,
              py: 1,
            }}
          >
            + Add Class
          </Button>
        </Box>)}
        {/* Class Cards */}
        <Grid container spacing={4}>
          {classes.map((classItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard color={classItem.color} component={StyledLink} to={`/classes/${classItem.title}`} state={classItem}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      mb: 1,
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {classItem.title}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                    {classItem.teacher}
                  </Typography>
                </CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px={2}
                  pb={2}
                >
                  <Avatar
                    sx={{
                      bgcolor: "#ffffff",
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    {classItem.teacher[0]}
                  </Avatar>
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    {classItem.description}
                  </Typography>
                </Box>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Classroom;
