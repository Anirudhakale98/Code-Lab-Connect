import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(cookieParser());

//routes import
import userRouter from "./routes/users.routes.js";
import teacherRouter from "./routes/teachers.routes.js";
import studentRouter from "./routes/students.routes.js";

// routes declaration

app.use("/api/v1/users", userRouter); //http://localhost:8080/api/v1/users/register
app.use("/api/v1/teachers", teacherRouter); //http://localhost:8080/api/v1/teachers/classes
app.use("/api/v1/students", studentRouter); //http://localhost:8080/api/v1/students/classes


export { app };