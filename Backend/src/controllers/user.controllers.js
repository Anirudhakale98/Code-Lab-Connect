import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponce.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.models.js";

const generateAccessAndRefreshToken = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // to avoid validation error

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Token generation failed");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists; email prn
    // create a new user - create entry in db
    // remove password and refresh token from the response
    // check for user creation
    // return response

    const { firstName, lastName, email, password, prn } = req.body;
    // console.log(firstName, lastName, email,prn);
    // if (!firstName || !lastName || !email || !password || !prn) {
    //     return apiError(400, "All fields are required", res);
    // }
    if (
        [firstName, lastName, email, password, prn].some(
            (field) => field === undefined || field === null || field === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }
    const existedUser = await User.findOne({
        $or: [{ email }, { prn }],
    });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    const user = await User.create({
        email,
        prn,
        firstName,
        lastName,
        password,
    });

    // select is used for removing fields from the response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "User not created");
    }

    res.status(201).json(
        new ApiResponse(
            201,
            {
                user: createdUser,
            },
            "User created successfully"
        )
    );
});

const loginUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user exists; email prn
    // check if password is correct
    // generate access token
    // generate refresh token
    // save refresh token in db
    // send refresh token to cookie
    // remove password from the response
    // return response

    const { email, password } = req.body;

    if (!email && !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect user credentials");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user);

    const loginUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loginUser,
                    accessToken,
                    refreshToken,
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    // remove refresh token from db
    // remove refresh token from cookie
    // return response
    await User.findByIdAndUpdate(
        req.user._id,
        { refreshToken: "" },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,       
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});


export { registerUser, loginUser, logoutUser };
