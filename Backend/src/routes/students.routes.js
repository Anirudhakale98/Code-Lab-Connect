import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getClasses, joinClass, getClassroom, getAssignments } from "../controllers/students.controllers.js";
import { getAssignment } from "../controllers/teachers.controllers.js";


const router = Router();

router.route("/classes").get(verifyJWT, getClasses);
router.route("/join").post(verifyJWT, joinClass);
router.route("/classes/:classroomId").get(verifyJWT, getClassroom);
router.route("/classes/:classroomId/assignments").get(verifyJWT, getAssignments);


export default router;