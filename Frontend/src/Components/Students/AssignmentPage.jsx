import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AssignmentPage = () => {
  const initialCode = {
    java: 'public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}',
    python: 'print("Hello, World!")',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello, World!";\n\treturn 0;\n}'
  };

  const { id: classroomId, assignmentId } = useParams();
  const [language, setLanguage] = useState("java");
  const [theme, setTheme] = useState("dark");
  const [code, setCode] = useState(initialCode[language]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [currAssignment, setCurrAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const themeMode = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = (await axios.get(`/api/v1/students/classes/${classroomId}/assignments/${assignmentId}`)).data;
        setCurrAssignment(response.data.assignment);
      } catch (error) {
        console.log("Error fetching assignment: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [classroomId, assignmentId]);

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    setCode(initialCode[newLanguage]);
  };

  const handleRunCode = async () => {
    try {
      setOutput("Running code...");
      const response = (await axios.post(`/api/v1/students/classes/${classroomId}/assignments/${assignmentId}/run-code`, { language, code, input })).data;
      // console.log("Run code response:", response);
      setOutput(response.data.output);
    } catch (error) {
      setOutput(`Error running code: ${error.message}`);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/v1/students/classes/${classroomId}/assignments/${assignmentId}/submit`, { code, language });
      alert("Assignment Submitted Successfully!");
      navigate(`/students/classes/${classroomId}`);
    } catch (error) {
      alert("Error submitting assignment: " + error.message);
    }
  };

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ minHeight: "100vh", backgroundColor: theme === "light" ? "#f5f5f5" : "#2c2c2c", p: 3 }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: "10px", backgroundColor: themeMode.palette.background.paper }}>
          <Typography variant="h4" gutterBottom>{currAssignment?.title}</Typography>
          <Typography variant="body1" gutterBottom sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
            Assignment Description: {currAssignment?.description}
          </Typography>
          {currAssignment?.example && (
            <Typography variant="body1" gutterBottom sx={{ mb: 2, whiteSpace: "pre-wrap" }}>
              Example:
              Input: {currAssignment.example.input}
              Output: {currAssignment.example.output}
            </Typography>
          )}
          <TextField
            label="Input"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="Input data here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
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

          <MonacoEditor
            height="400px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme={theme === "light" ? "light" : "vs-dark"}
            options={{ minimap: { enabled: false }, lineNumbers: "on", fontSize: 14, autoIndent: "full" }}
          />

          <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
            <Button variant="contained" color="success" onClick={handleRunCode}>Run Code</Button>
            <Button variant="contained" color="error" onClick={handleSubmit}>Submit</Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AssignmentPage;
