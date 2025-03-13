import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getClasses, joinClass, getClassroom, getAssignments, getAssignment, runCode, submitAssignment, getSubmission} from "../controllers/students.controllers.js";



const router = Router();

router.route("/classes").get(verifyJWT, getClasses);
router.route("/join").post(verifyJWT, joinClass);
router.route("/classes/:classroomId").get(verifyJWT, getClassroom);
router.route("/classes/:classroomId/assignments").get(verifyJWT, getAssignments);
router.route("/classes/:classroomId/assignments/:assignmentId").get(verifyJWT, getAssignment);
router.route("/classes/:classroomId/assignments/:assignmentId/run-code").post(verifyJWT, runCode);
router.route("/classes/:classroomId/assignments/:assignmentId/submit").post(verifyJWT, submitAssignment);
router.route("/classes/:classroomId/assignments/:assignmentId/submissions/:studentId").get(verifyJWT, getSubmission);


export default router;