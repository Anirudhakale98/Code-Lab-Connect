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
    getSubmittedStudents,
    getNotSubmittedStudents,
    addMarks,
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
    .get(verifyJWT, getSubmittedStudents);
router
    .route(
        "/classes/:classroomId/assignments/:assignmentId/notSubmittedStudents"
    )
    .get(verifyJWT, getNotSubmittedStudents);

router.
    route("/classes/:classroomId/assignments/:assignmentId/submissions/:submissionId/marks")
    .post(verifyJWT, addMarks);

export default router;
