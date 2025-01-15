import React from "react";
import {
    AppBar,
    Toolbar,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    Box,
    Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useParams, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";




// Dummy data for assignments
const assignments = [
    { id: 1, title: "Assignment 1", description: "This demo assignment to get familar with platform" },
    { id: 2, title: "Assignment 2", description: "Two sum" },
    { id: 3, title: "Assignment 3", description: "Longest Substring Without Repeating Characters" },
];

const user = {
    name: "User",
    email: "",
    role: "teacher",
}

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

const StyledLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
  });



// const currClassName = useParams();
// const currClass = classes.find((c) => c.title === currClassName);

const currClass ={
    title: "Demo classroom",
    teacher: "This is for trail purpose",
    color: "linear-gradient(135deg, #607d8b, #455a64)",
    description: "This classroom is to get familar with enivormnet",
}




// Main Classroom Page
const ClassroomPage = () => {
    return (

        <Box display="flex">

            {/* Sidebar */}
            <Dashboard user={user}/>

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
                    <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                        Assignments
                    </Typography>
                    <Grid container spacing={3}>
                        {assignments.map((assignment) => (
                            <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                                <Card
                                    sx={{
                                        background: "#0288d1",
                                        color: "#fff",
                                        borderRadius: "10px",
                                        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            {assignment.title}
                                        </Typography>
                                        <Typography variant="body2">{assignment.description}</Typography>
                                        <Box mt={2} display="flex" justifyContent="space-between">
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                component={Link}
                                                to={`/classes/${currClass.title}/assignments/${assignment.id}/solve`}
                                            >
                                                Solve
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                component={Link}
                                                to={`/classes/${currClass.title}/assignments/${assignment.id}/view`}
                                            >
                                                View
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default ClassroomPage;
