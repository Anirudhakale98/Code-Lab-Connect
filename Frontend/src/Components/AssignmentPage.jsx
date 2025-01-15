import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import MonacoEditor from "@monaco-editor/react";
import { useTheme } from "@mui/material/styles";

const AssignmentPage = () => {
  const initialCode = {
    'java':'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}',
    'python':'print("Hello, World!")',
    'cpp':'#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello, World!";\n\treturn 0;\n}', 
  }

  const [language, setLanguage] = useState("java");
  const [theme, setTheme] = useState("dark");
  const [code, setCode] = useState(initialCode[language]);
  const [output, setOutput] = useState("");
  const themeMode = useTheme();

  

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode(initialCode[event.target.value]);
  };

  const handleRunCode = () => {
    setOutput(`Running ${language} code...\nOutput: ${code}`);
  };

  const handleSubmit = () => {
    alert("Assignment Submitted!");
  };

  return (
    <Grid container spacing={3} sx={{ minHeight: "100vh", backgroundColor: theme === "light" ? "#f5f5f5" : "#2c2c2c", p: 3 }}>
      {/* Left Part: Question, Input, and Output */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: "10px", backgroundColor: themeMode.palette.background.paper }}>
          <Typography variant="h5" gutterBottom>
            Assignment Question
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 2, whiteSpace:"pre-wrap" }} >
            Solve the following problem using your preferred programming language.<br />
            Write a program which takes a number as input and prints its square.
          </Typography>
          <TextField
            label="Input"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="Input data here"
          />
          <TextField
            label="Output"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="Output will appear here"
            value={output}
            InputProps={{ readOnly: true }}
          />
        </Paper>
      </Grid>

      {/* Right Part: Code Editor */}
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: "10px", backgroundColor: themeMode.palette.background.paper }}>
          <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
            <FormControl variant="outlined" sx={{ minWidth: 150 }}>
              <InputLabel>Language</InputLabel>
              <Select value={language} onChange={handleLanguageChange} label="Language">
                <MenuItem value="cpp">C++</MenuItem>
                <MenuItem value="python">Python</MenuItem>
                <MenuItem value="java">Java</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handleThemeChange} color="primary">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </Box>

          {/* Monaco Code Editor */}
          <MonacoEditor
            height="400px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme={theme === "light" ? "light" : "vs-dark"}
            options={{
              minimap: { enabled: false },
              lineNumbers: "on",
              fontSize: 14,
              autoIndent: "full",
            }}
          />

          {/* Action Buttons */}
          <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button variant="contained" color="success" onClick={handleRunCode}>
              Run Code
            </Button>
            <Button variant="contained" color="error" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AssignmentPage;
