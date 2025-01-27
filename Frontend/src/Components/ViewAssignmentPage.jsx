import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

// Mock data (Replace with actual data from your backend or state)

const userInfo = {
  name: "John Doe",
  prn: "123456789",
  rollNumber: "42",
  division: "A",
  subject: "Computer Science",
};
const assignmentData = {
  title: "Write a Program to Calculate Factorial",
  description: "Create a program that calculates the factorial of a given number.",
  code: `function factorial(n) {\n  if (n === 0) return 1;\n  return n * factorial(n - 1);\n}`,
  input: "5",
  output: "120",
};

const ViewAssignmentPage = () => {

  

  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Horizontal centering
        alignItems: 'center',     // Vertical centering
        minHeight: '100vh',       // Ensure full viewport height (important for vertical centering)
        width: '100%',
      }}
    >
    <Grid container spacing={3} sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5", p: 3, width: "50%"}}>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: "10px", backgroundColor: "#ffffff" }}>
          <Typography variant="h4" gutterBottom align="center">
            Assignment Report
          </Typography>
          <Divider sx={{ my: 2 }} />

          {/* User Information */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              User Information
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  {Object.entries(userInfo).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ fontWeight: "bold", width: "30%" }}>
                        {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Assignment Details */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Assignment Details
            </Typography>
            <Typography variant="h6" gutterBottom>
              Title: {assignmentData.title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {assignmentData.description}
            </Typography>
          </Box>

          {/* Code Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Code
            </Typography>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                backgroundColor: "#f9f9f9",
                fontFamily: "monospace",
                whiteSpace: "pre-wrap",
                overflowX: "auto",
              }}
            >
              {assignmentData.code}
            </Paper>
          </Box>

          {/* Input and Output */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Input
            </Typography>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
              {assignmentData.input}
            </Paper>
            <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
              Output
            </Typography>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: "#f9f9f9" }}>
              {assignmentData.output}
            </Paper>
          </Box>

        </Paper>
      </Grid>
    </Grid>
    </Box>
  );
};

export default ViewAssignmentPage;
