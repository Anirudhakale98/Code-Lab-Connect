import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard";

const user = {
  name: "User",
  email: "",
  role: "teacher",
};

const currClass = {
  title: "Demo Classroom",
  teacher: "This is for trial purposes",
  description: "This classroom is to get familiar with the environment.",
};

const currAssignment = { 
  id: 1, 
  title: "Assignment 1", 
  description: "This is a demo assignment to get familiar with the platform." 
};

const submittedStudents = [
  { id: 1, name: "Student A", prn: "1234567890", rollNo: "1" },
  { id: 2, name: "Student B", prn: "1234567891", rollNo: "2" },
];

const notSubmittedStudents = [
  { id: 3, name: "Student C", prn: "1234567892", rollNo: "3" },
  { id: 4, name: "Student D", prn: "1234567893", rollNo: "4" },
];

const AssignmentPageT = () => {
  return (
    <Box display="flex">
      {/* Sidebar */}
      <Dashboard user={user} />

      {/* Main Content */}
      <Box flexGrow={1} p={3} sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
          Assignment Details
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Assignment Title: {currAssignment.title}
        </Typography>

        <Grid container spacing={4}>
          {/* Submitted Students Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: "10px", boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Submitted Assignments
                </Typography>

                <List>
                  {submittedStudents.map((student) => (
                    <React.Fragment key={student.id}>
                      <ListItem button component={Link} to={`/teachers/classes/${currClass.title}/assignments/${currAssignment.id}/${student.name}`}>
                        <ListItemText
                          primary={
                            <Typography
                              style={{ fontWeight: "bold", color: "#d32f2f" }}
                            >
                              {student.name}
                            </Typography>
                          }
                          secondary={`PRN: ${student.prn} | Roll No: ${student.rollNo}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Not Submitted Students Section */}
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: "10px", boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  Not Submitted Assignments
                </Typography>
                <List>
                  {notSubmittedStudents.map((student) => (
                    <React.Fragment key={student.id}>
                      <ListItem>
                        <ListItemText
                          primary={
                            <Typography
                              style={{ fontWeight: "bold", color: "#d32f2f" }}
                            >
                              {student.name}
                            </Typography>
                          }
                          secondary={`PRN: ${student.prn} | Roll No: ${student.rollNo}`}
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AssignmentPageT;
