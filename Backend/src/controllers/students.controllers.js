import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/users.models.js";
import {Classroom} from "../models/classroom.models.js";
import {Assignments} from "../models/assignments.models.js";
import mongoose from "mongoose";

/// Get all classes of a student
const getClasses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, "User not found.");

    // Ensure classes are valid ObjectIds
    const classIds = user.classes?.map(id => new mongoose.Types.ObjectId(id)) || [];

    // Fetch classes
    const classes = await Classroom.find({ _id: { $in: classIds } });

    // console.log("Fetched Classes:", classes);

    res.status(200).json(new ApiResponse(200, classes, "Classes retrieved successfully."));
});

// Join a class
const joinClass = asyncHandler(async (req, res) => {
    const { classroomId } = req.body;
    // console.log("classroomId", classroomId);
    const user = await User.findById(req.user._id);
    const classroom = await Classroom.findOne({ classroomId: classroomId });
    if (!classroom) throw new ApiError(404, "Classroom not found.");
    if (user.classes.includes(classroom._id)) throw new ApiError(400, "You are already in this class.");
    user.classes.push(classroom._id);
    await user.save();
    res.status(201).json(new ApiResponse(201, classroom));
});


// Get a class
const getClassroom = asyncHandler(async (req, res) => {
    const { classroomId } = req.params;
    // console.log("classroomId: "+ classroomId);
    const classroom = await Classroom.findOne({ classroomId });
    if (!classroom) {
        throw new ApiError(404, "Classroom not found");
    }
    res.status(200).json(new ApiResponse(200, { classroom: classroom }));
});

// Get all assignments of a class
const getAssignments = asyncHandler(async (req, res) => {
    const { classroomId } = req.params;
    const classroom = await Classroom.findOne({ classroomId });
    if (!classroom) {
        throw new ApiError(404, "Classroom not found");
    }
    const assignments = await Assignments.find({
        _id: { $in: classroom.assignments },
    });
    res.status(200).json(new ApiResponse(200, { assignments }));
});

export {getClasses, joinClass, getClassroom, getAssignments};