import {
	loginUser,
	logoutUser,
	refreshUserSession,
	registerUser,
	resetPassword,
	sendResetEmail,
} from "../services/auth.js";
import { THIRTY_DAYS } from "./../constants/index.js";

export const registerUserController = async (req, res) => {
	const user = await registerUser(req.body);

	res.status(201).json({
		status: 201,
		message: "Successfully registered a user!",
		data: user,
	});
};

export const loginUserController = async (req, res) => {
	const session = await loginUser(req.body);

	res.cookie("sessionId", session._id, {
		httpOnly: true,
		expires: new Date(Date.now() + THIRTY_DAYS),
	});

	res.cookie("refreshToken", session.refreshToken, {
		httpOnly: true,
		expires: new Date(Date.now() + THIRTY_DAYS),
	});

	res.status(200).json({
		status: 200,
		message: "Successfully logged in an user!",
		data: { accessToken: session.accessToken },
	});
};

export const refreshUserController = async (req, res) => {
	const session = await refreshUserSession({
		sessionId: req.cookies.sessionId,
		refreshToken: req.cookies.refreshToken,
	});

	res.cookie("sessionId", session._id, {
		httpOnly: true,
		expires: new Date(Date.now() + THIRTY_DAYS),
	});

	res.cookie("refreshToken", session.refreshToken, {
		httpOnly: true,
		expires: new Date(Date.now() + THIRTY_DAYS),
	});

	res.status(200).json({
		status: 200,
		message: "Successfully refreshed a session!",
		data: { accessToken: session.accessToken },
	});
};

export const logoutUserController = async (req, res) => {
	if (req.cookies.sessionId) {
		await logoutUser(req.cookies.sessionId);
	}

	res.clearCookie("sessionId");
	res.clearCookie("refreshToken");

	res.status(204).send();
};

export const sendResetEmailController = async (req, res) => {
	await sendResetEmail(req.body.email);

	res.json({
		status: 200,
		message: "Reset password email has been successfully sent.",
		data: {},
	});
};

export const resetPasswordController = async (req, res) => {
	await resetPassword(req.body);

	res.json({
		status: 200,
		message: "Password has been successfully reset.",
		data: {},
	});
};
