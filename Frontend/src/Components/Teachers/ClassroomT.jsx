import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Grid, Card, CardContent, Avatar, Typography,
  Box, Button, TextField, Modal, IconButton
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";
import axios from "axios";
import { use } from "react";

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
  const [classes, setClasses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newClass, setNewClass] = useState({ title: "", color: "linear-gradient(135deg, #607d8b, #455a64)", description: "" });
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleDeleteClass = async (classroomId) => {
    try {
      // console.log("Attempting to delete:", classroomId); // Debugging log
      const res = await axios.post(`/api/v1/teachers/classes/${classroomId}/delete`);
      setClasses(classes.filter((classItem) => classItem.classroomId !== classroomId));
    } catch (err) {
      console.error("Error deleting class:", err.response?.data || err.message);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = (await axios.get("/api/v1/users/me")).data;
        // console.log(userResponse.data.data.user);
        setUser(userResponse.data?.user || null);

        const classesResponse = (await axios.get("/api/v1/teachers/classes")).data;
        // console.log(classesResponse.data.data.classes);
        setClasses(classesResponse.data?.classes || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleAddClass = async () => {
    if (!newClass.title.trim() || !newClass.description.trim()) {
      setError("Classroom Title and Description cannot be empty.");
      return;
    }
    try {
      const res = (await axios.post("/api/v1/teachers/classes", newClass)).data;
      setClasses([...classes, res.data.classroom]); // Ensure res.data contains the new class object
      setNewClass({ title: "", color: "linear-gradient(135deg, #607d8b, #455a64)", description: "" });
      setError("");
      setOpenModal(false);
      window.location.reload(); // ✅ Reload page to reflect changes (optional)
  
    } catch (err) {
      console.error("Error adding class:", err);
    }
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box display="flex">
      <Dashboard user={user} classes={classes} />
      <Box flexGrow={1} p={3} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <AppBar position="static" color="primary" sx={{ borderRadius: "10px", mb: 3 }}>
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Code-Lab-Connect
            </Typography>
          </Toolbar>
        </AppBar>
        <Box display="flex" justifyContent="flex-end" mb={3}>
          <Button onClick={() => setOpenModal(true)} variant="contained" color="secondary">
            + Add Class
          </Button>
        </Box>
        <Grid container spacing={4}>
          {classes.map((classItem, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard color={classItem.color} component={StyledLink} to={`/teachers/classes/${classItem.classroomId}`} state={classItem}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}>
                      {classItem.title}
                    </Typography>
                    {/* Delete Button */}
                    <IconButton onClick={(e) => { e.preventDefault(); handleDeleteClass(classItem.classroomId); }} sx={{ color: "white" }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pb={2}>
                  <Avatar sx={{ bgcolor: "#ffffff", color: "#000", fontWeight: "bold" }}>
                    {classItem.title[0]}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontStyle: "italic", color: "rgba(255, 255, 255, 0.9)" }}>
                    {classItem.description}
                  </Typography>
                </Box>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", bgcolor: "white", p: 4, borderRadius: "10px", boxShadow: 24, width: "400px" }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Add New Classroom</Typography>
              <IconButton onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <TextField fullWidth label="Classroom Title" variant="outlined" sx={{ mb: 2 }} value={newClass.title} onChange={(e) => setNewClass({ ...newClass, title: e.target.value })} />
            <TextField fullWidth label="Description" variant="outlined" multiline rows={3} sx={{ mb: 2 }} value={newClass.description} onChange={(e) => setNewClass({ ...newClass, description: e.target.value })} />
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={handleAddClass} variant="contained" color="primary">
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
