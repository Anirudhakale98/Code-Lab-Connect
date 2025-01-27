import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link} from "react-router-dom";

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
  const [role, setRole] = useState("student");
  const [passwordVisible, setPasswordVisible] = useState(false);

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
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
        />
        <TextField
          select
          fullWidth
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          margin="normal"
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Password"
          type={passwordVisible ? "text" : "password"}
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
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