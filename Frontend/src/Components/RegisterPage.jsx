import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";

const themeStyle = {
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "student",
    prn: "",
    rollNumber: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    setLoading(true);

    const { firstName, lastName, email, role, prn, rollNumber, password } = formData;

    const userData = {
      firstName,
      lastName,
      email,
      role,
      password,
      prn: role === "student" ? prn : null,
      rollNo: role === "student" ? rollNumber : null,
    };

    try {
      const response = await axiosInstance.post("/api/v1/users/register", userData);
      if (response.status === 201) {
        setSnackbar({ open: true, message: "Registration successful! Redirecting...", severity: "success" });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || "Registration failed. Try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  return (
    <Box style={themeStyle}>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          Register
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              margin="normal"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              margin="normal"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </TextField>

        {formData.role === "student" && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="PRN Number"
                margin="normal"
                name="prn"
                value={formData.prn}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Roll Number"
                margin="normal"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        )}

        <TextField
          fullWidth
          label="Password"
          type={passwordVisible ? "text" : "password"}
          margin="normal"
          name="password"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Register"}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RegisterPage;
