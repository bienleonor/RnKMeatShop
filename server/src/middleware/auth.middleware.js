import jwt from "jsonwebtoken";

const authCookieName = "rnk_pos_session";

function getToken(req) {
  const authorization = req.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice(7);
  }

  return req.cookies?.[authCookieName];
}

export function requireAuth(req, res, next) {
  const token = getToken(req);

  if (!token || !process.env.JWT_SECRET) {
    return res.status(401).json({ error: "Authentication required" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired session" });
  }
}

export function requireRole(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    return next();
  };
}