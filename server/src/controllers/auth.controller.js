import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const authCookieName = "rnk_pos_session";

function getJwtSecret() {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error("JWT_SECRET is not configured");
	}

	return secret;
}

function toUserResponse(user) {
	return {
		id: user.id,
		username: user.username,
		name: user.name,
		email: user.email,
		role: user.user_roles?.role ?? null,
	};
}

function setSessionCookie(res, user) {
	const token = jwt.sign(
		{ sub: String(user.id), role: user.user_roles?.role ?? null },
		getJwtSecret(),
		{ expiresIn: "8h" },
	);

	res.cookie(authCookieName, token, {
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		maxAge: 8 * 60 * 60 * 1000,
	});
}

export async function login(req, res) {
	const user = await prisma.users.findUnique({
		where: { username: req.body.username },
		include: { user_roles: true },
	});

	if (!user?.hashedpassword || !(await bcrypt.compare(req.body.password, user.hashedpassword))) {
		return res.status(401).json({ error: "Invalid username or password" });
	}

	setSessionCookie(res, user);
	return res.json({ user: toUserResponse(user) });
}

export function logout(req, res) {
	res.clearCookie(authCookieName, { httpOnly: true, sameSite: "lax" });
	return res.status(204).send();
}

export async function currentUser(req, res) {
	const user = await prisma.users.findUnique({
		where: { id: Number(req.user.id) },
		include: { user_roles: true },
	});

	if (!user) {
		return res.status(401).json({ error: "Session is no longer valid" });
	}

	return res.json({ user: toUserResponse(user) });
}
