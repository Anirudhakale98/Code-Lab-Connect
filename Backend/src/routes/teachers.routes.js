import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    getClasses,
    addClass,
    getClassroom,
    deleteClass,
    getAssignments,
    addAssignment,
    deleteAssignment,
    getAssignment,
    getStudents,
    getNotSubmittedStudents,
} from "../controllers/teachers.controllers.js";
const router = Router();

// secured routes
router.route("/classes").get(verifyJWT, getClasses);
router.route("/classes").post(verifyJWT, addClass);
router.route("/classes/:classroomId/delete").post(verifyJWT, deleteClass);
router.route("/classes/:classroomId").get(verifyJWT, getClassroom);
router
    .route("/classes/:classroomId/assignments")
    .get(verifyJWT, getAssignments);
router
    .route("/classes/:classroomId/assignments")
    .post(verifyJWT, addAssignment);
router
    .route("/classes/:classroomId/assignments/:assignmentId/delete")
    .post(verifyJWT, deleteAssignment);
router
    .route("/classes/:classroomId/assignments/:assignmentId")
    .get(verifyJWT, getAssignment);
router
    .route("/classes/:classroomId/assignments/:assignmentId/students")
    .get(verifyJWT, getStudents);
router
    .route(
        "/classes/:classroomId/assignments/:assignmentId/notSubmittedStudents"
    )
    .get(verifyJWT, getNotSubmittedStudents);

export default router;
