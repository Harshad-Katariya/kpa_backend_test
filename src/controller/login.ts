import { Request, Response, } from "express";
import { DBservice } from "../dbservice/dbservice";
import bcrypt from 'bcryptjs';
import { response } from "../helper/response";
import { generateToken } from "../comman/authToken/genrateAuthtoken"
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import moment from "moment";

class LoginUser {

    public async loginuser(req: Request, res: Response): Promise<any> {
        try {

            let user_email_check = await DBservice.registerDbService.checkEmail(req.body.email)
            console.log("User E = = = = >", user_email_check);

            const User_Login = {
                email: req.body.email,
                password: req.body.password
            }

            if (user_email_check) {
                let password_match = await bcrypt.compare(User_Login.password, user_email_check[0].password);
                if (password_match) {
                    let payload: any = {
                        user_id: user_email_check[0].user_id,
                        exp: moment().add(24, 'hours').valueOf()
                    };
                    const authToken = jwt.sign(payload, process.env.JWT_KEY);
                    await DBservice.registerDbService.authToken(user_email_check[0].user_id, authToken);
                    response.setResponse(200, { SuccessMessage: 'Login successfully', data: { auth_token: authToken } }, res, req)
                }
                else {
                    response.setResponse(400, { errorMessage: 'Invalid password' }, res, req)
                }
            }
            else {
                response.setResponse(404, { errorMessage: 'Email not found' }, res, req)
            }
        } catch (error) {
            console.log("login error = = = = = = >", error);
            response.setResponse(500, { errorMessage: 'Internal server error' }, res, req)
        }
    }
}

export const login_user = new LoginUser();
