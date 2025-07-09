import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { response } from "../helper/response";
import moment from "moment";

export const AuthTokenverify = (req: Request, res: Response, next: NextFunction) => {
    try {
        const getAuthToken: any = req.headers.authtoken

        if (!getAuthToken) {
            response.setResponse(401, { errorMessage: 'Authentication token missing' }, res, req)
        }
        const verifyAuthtoken: any = jwt.verify(getAuthToken, process.env.JWT_KEY as string);

        if (verifyAuthtoken) {
            if (Date.now() > verifyAuthtoken.exp) {
                response.setResponse(401, { errorMessage: "Authorization expired. please relogin." }, res, req)
            } else {
                req.body.user_id = verifyAuthtoken.user_id;
                next();
            }
        } else {
            response.setResponse(401, { errorMessage: 'Authentication token not valid.' }, res, req)
        }
    } catch (error) {
        console.log("JWT verification failed = = = =>", error);
        response.setResponse(403, { errorMessage: "Invalid or expired token" }, res, req);
    }
}