import React, { useState } from "react";
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
  TextField,
  Modal,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";

const initialClasses = [
  {
    title: "Demo Classroom",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "This classroom is to get familiar with the environment",
  },
  {
    title: "DBMS",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "Database Management System",
  },
  {
    title: "DSA",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "Data Structures and Algorithms",
  },
];

const user = {
  name: "Teacher",
  email: "teacher@example.com",
  role: "teacher",
};

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

const ClassroomT = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [openModal, setOpenModal] = useState(false);
  const [newClass, setNewClass] = useState({
    title: "",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "",
  });
  const [error, setError] = useState("");

  const handleModal = (bool) =>{
    setOpenModal(bool);
    setError("");
  }
  const handleAddClass = () => {
    if (!newClass.title.trim() || !newClass.description.trim()) {
      setError("Classroom Title and Description cannot be empty.");
      return;
    }
    setClasses([...classes, newClass]);
    setNewClass({ title: "", color: "linear-gradient(135deg, #607d8b, #455a64)", description: "" });
    setError("");
    setOpenModal(false);
  };

  return (
    <Box display="flex">
      {/* Dashboard */}
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

        {/* Add Class Button */}
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button
            onClick={() => setOpenModal(true)}
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
        </Box>

        {/* Class Cards */}
        <Grid container spacing={4}>
          {classes.map((classItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard color={classItem.color} component={StyledLink} to={`/teachers/classes/${classItem.title}`} state={classItem}>
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
                    {classItem.title[0]}
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

        {/* Add Class Modal */}
        <Modal open={openModal} onClose={() => handleModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              p: 4,
              borderRadius: "10px",
              boxShadow: 24,
              width: "400px",
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Add New Classroom</Typography>
              <IconButton onClick={() => handleModal(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <TextField
              fullWidth
              label="Classroom Title"
              variant="outlined"
              sx={{ mb: 2 }}
              value={newClass.title}
              error={!!error && !newClass.title.trim()}
              helperText={!newClass.title.trim() ? error : ""}
              onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              multiline
              rows={3}
              sx={{ mb: 2 }}
              value={newClass.description}
              error={!!error && !newClass.description.trim()}
              helperText={!newClass.description.trim() ? error : ""}
              onChange={(e) => setNewClass({ ...newClass, description: e.target.value })}
            />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                onClick={handleAddClass}
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Add Classroom
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default ClassroomT;
