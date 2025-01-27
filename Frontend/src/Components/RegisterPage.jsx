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

const RegisterPage = () => {
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
          Register
        </Typography>
        <TextField
          fullWidth
          label="First Name Middle Name Last Name"
          margin="normal"
        />
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
        {role === "student" && (
          <>
            <TextField
              fullWidth
              label="PRN Number"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Roll Number"
              margin="normal"
            />
          </>
        )}
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
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;