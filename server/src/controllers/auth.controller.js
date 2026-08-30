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

export async function register(req, res) {
	const existingUser = await prisma.users.findUnique({
		where: { username: req.body.username },
	});

	if (existingUser) {
		return res.status(409).json({ error: "That username is already in use" });
	}

	const roleId = Number(process.env.DEFAULT_REGISTER_ROLE_ID || 1);
	const role = await prisma.user_roles.findUnique({ where: { id: roleId } });

	if (!role) {
		return res.status(500).json({ error: "The default registration role is not configured" });
	}

	const passwordHash = await bcrypt.hash(req.body.password, 12);
	let user;

	try {
		user = await prisma.$transaction(async (transaction) => {
			const highestUser = await transaction.users.aggregate({ _max: { id: true } });
			return transaction.users.create({
				data: {
					id: (highestUser._max.id ?? 0) + 1,
					username: req.body.username,
					name: req.body.name,
					email: req.body.email || null,
					hashedpassword: passwordHash,
					role_id: roleId,
				},
				include: { user_roles: true },
			});
		});
	} catch (error) {
		if (error?.code === "P2002") {
			return res.status(409).json({ error: "That username is already in use" });
		}

		throw error;
	}

	setSessionCookie(res, user);
	return res.status(201).json({ user: toUserResponse(user) });
}

export function logout(req, res) {
	res.clearCookie(authCookieName, { httpOnly: true, sameSite: "lax" });
	return res.status(204).send();
}

export async function currentUser(req, res) {
	const userId = Number(req.user?.sub);

	if (!Number.isInteger(userId) || userId <= 0) {
		return res.status(401).json({ error: "Invalid session" });
	}

	const user = await prisma.users.findUnique({
		where: { id: userId },
		include: { user_roles: true },
	});

	if (!user) {
		return res.status(401).json({ error: "Session is no longer valid" });
	}

	return res.json({ user: toUserResponse(user) });
}

