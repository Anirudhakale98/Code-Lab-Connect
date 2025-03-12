import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const themeStyle = {
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px",
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirecting after login

  const handleLogin = async () => {
    setError(null); // Clear previous errors

    try {
      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        // if role is student, redirect to /students
        // else redirect to /teachers
        // console.log(response.data.data.user.role);
        if(response.data?.data?.user?.role === "student") navigate(`/students`);
        else navigate(`/teachers`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
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
          Log In
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type={passwordVisible ? "text" : "password"}
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          sx={{ mt: 2, mb: 1 }}
          onClick={handleLogin}
        >
          Log In
        </Button>

        <Box display="flex" justifyContent="space-between">
          <Button component={Link} to="/tour" color="secondary">
            Take a Tour
          </Button>
          <Button component={Link} to="/register" color="secondary">
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
