import React, { useState } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard";

// Dummy data for assignments
const initialAssignments = [
    { id: 1, title: "Assignment 1", description: "This is a demo assignment to get familiar with the platform." },
    { id: 2, title: "Assignment 2", description: "Two sum problem." },
    { id: 3, title: "Assignment 3", description: "Longest Substring Without Repeating Characters." },
];

const user = {
    name: "Teacher",
    email: "",
    role: "teacher",
};

const currClass = {
    title: "Demo Classroom",
    teacher: "This is for trial purposes",
    description: "This classroom is to get familiar with the environment.",
};

// Styled Classroom Card
const StyledCard = styled(Card)({
    background: "linear-gradient(135deg, #607d8b, #455a64)",
    color: "white",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
});

const ClassroomPageT = () => {
    const [assignments, setAssignments] = useState(initialAssignments);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newAssignment, setNewAssignment] = useState({ title: "", description: "" });
    const navigate = useNavigate();

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewAssignment({ title: "", description: "" });
    };

    const handleAddAssignment = () => {
        if (newAssignment.title && newAssignment.description) {
            setAssignments((prev) => [
                ...prev,
                { id: prev.length + 1, title: newAssignment.title, description: newAssignment.description },
            ]);
            handleCloseDialog();
        }
    };



    return (
        <Box display="flex">
            {/* Sidebar */}
            <Dashboard user={user} />

            {/* Main Content */}
            <Box flexGrow={1} p={3} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
                {/* Classroom Details */}
                <StyledCard>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {currClass.title}
                    </Typography>
                    <Typography variant="subtitle1">{currClass.description}</Typography>
                </StyledCard>

                {/* Assignments List */}
                <Box mt={4}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            Assignments
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                background: "linear-gradient(135deg, #0288d1, #0277bd)",
                                color: "#fff",
                                borderRadius: "20px",
                                padding: "8px 16px",
                                fontWeight: "bold",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                '&:hover': { background: "#02669c" },
                            }}
                            onClick={handleOpenDialog}
                        >
                            + Add Assignment
                        </Button>
                    </Box>
                    <Grid container spacing={3}>
                        {assignments.map((assignment) => (
                            <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                                <Card
                                    
                                    sx={{
                                        background: "#0288d1",
                                        color: "#fff",
                                        borderRadius: "10px",
                                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                                        cursor: "pointer",
                                        '&:hover': { boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)" },
                                    }}
                                    onClick = {() => navigate(`/teachers/classes/${currClass.title}/assignments/${assignment.id}`)}
                                > 
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            {assignment.title}
                                        </Typography>
                                        <Typography variant="body2">{assignment.description}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Add Assignment Dialog */}
                <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                    <DialogTitle>Add New Assignment</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Assignment Title"
                            fullWidth
                            value={newAssignment.title}
                            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Assignment Description"
                            fullWidth
                            multiline
                            rows={4}
                            value={newAssignment.description}
                            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="secondary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddAssignment} sx={{ backgroundColor: "#0288d1", color: "#fff" }}>
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
};

export default ClassroomPageT;
