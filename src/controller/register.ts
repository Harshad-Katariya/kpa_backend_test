import { Request, Response, } from "express";
import bcrypt from 'bcryptjs'
import { DBservice } from "../dbservice/dbservice";
import { response } from "../helper/response";
import { validationResult } from "express-validator";
import { generateOTP } from "../comman/otp/otpfunction";
import { MailServiceOTP } from "../comman/mailService/mailsend";
import moment from "moment";
class RegisterUser {

    public async registeruser(req: Request, res: Response): Promise<any> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        try {
            let bodyData = req.body
            let data: any = {
                name: bodyData.name,
                email: bodyData.email,
                password: bodyData.password, // Will be hashed before insert
                mobile: bodyData.mobile || null,
                address: bodyData.address || null,
                dob: bodyData.dob,
                gender: bodyData.gender,
            };
            let encode = await bcrypt.hash(data.password, 10);
            data.password = encode;

            let check_mail = await DBservice.registerDbService.checkEmail(req.body.email);
            if (check_mail.length > 0) {
                return response.setResponse(409, { errorMessage: 'Email already register' }, res, req)
            }
            else {
                data.otp = generateOTP(6);
                data.otp_expire_time = moment().add('10', 'minute').format('YYYY-MM-DD HH:mm:ss');

                let signup = await DBservice.registerDbService.registerUser(data)
                if (signup) {
                    MailServiceOTP(data['email'], data['otp']);
                    response.setResponse(200, { SuccessMessage: 'Register successFully...', data: data }, res, req)
                }
            }
        } catch (error) {
            console.log("Register Error = = = = = = = = = = = >", error);
            response.setResponse(500, { errorMessage: 'Internal Server Error...' }, res, req)
        }
    }
}

export const register_user = new RegisterUser