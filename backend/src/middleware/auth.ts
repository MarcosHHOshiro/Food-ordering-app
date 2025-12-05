import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
    namespace Express {
        interface Request {
            userId: string;
            auth0Id: string;
        }
    }
}

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
});

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        console.log("JWT PARSE: sem Authorization");
        return res.sendStatus(401);
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        console.log("JWT PARSE decoded:", decoded);

        const auth0Id = decoded.sub;
        console.log("JWT PARSE auth0Id:", auth0Id);

        const user = await User.findOne({ auth0Id });
        console.log("JWT PARSE user encontrado:", user);

        if (!user) {
            console.log("JWT PARSE: user não encontrado");
            return res.sendStatus(401);
        }
        
        if (!user._id) {
            return res.sendStatus(401);
        }

        req.auth0Id = auth0Id as string;
        req.userId = user._id.toString();
        next();
    } catch (error) {
        console.error("JWT PARSE ERRO:", error);
        return res.sendStatus(401);
    }
};
