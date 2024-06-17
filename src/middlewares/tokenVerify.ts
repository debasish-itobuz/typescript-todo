import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

//big object so make it as interface
export interface CustomRequest extends Request {
    userId: string;
}

async function verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
        // const token = req.header('Authorization')?.replace('Bearer ', '');
        console.log(req.headers)
        const authHeader = req.headers.authorization || req.headers.Authorization;

        if (authHeader && (authHeader as string).startsWith("Bearer")) {
            const token = (authHeader as string).split(" ")[1];

            if (!token) {
                throw new Error("Token is missing");
            }
            // const decoded = jwt.verify(token, "qwerty1234");

            jwt.verify(token, "qwerty1234", (err, decoded) => {
                if (err) {
                    throw new Error("Wrong Token");
                }

                (req as CustomRequest).userId = (decoded as any).user.userId;
                // console.log(decoded)
                next();
            });
        }
        else{
            res.status(401).send("Token is missing");
        }
    } catch (err) {
        res.status(401).send("Please authenticate");
    }
}

export default verifyToken;