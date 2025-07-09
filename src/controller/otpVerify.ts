import { Request, Response, } from "express";
import { DBservice } from "../dbservice/dbservice";
import moment from "moment";
import { response } from "../helper/response";

class OTP {

    public async otp_verify(req: Request, res: Response) {
        try {

            let get_user = await DBservice.registerDbService.checkEmail(req.body.email);
            console.log("GetvUsv= = >", get_user[0]);

            let get_otp_from_body = req.body.otp;

            let current_dateTime = moment().format('YYYY-MM-DD HH:mm:ss');
            let otp_expire_time = moment(get_user[0]['otp_expire_time']).format('YYYY-MM-DD HH:mm:ss');

            if (get_user[0]["otp"] == get_otp_from_body) {

                if (current_dateTime >= otp_expire_time) {
                    return response.setResponse(400, { errorMessage: 'OTP has expired. please request a new code to proceed.' }, res, req);
                }
                await DBservice.registerDbService.is_verify(req.body.email);
                return response.setResponse(200, { SuccessMessage: "OTP verified successfully." }, res, req);
            }
            else {
                return response.setResponse(400, { errorMessage: 'OTP verification failed. please check the code and try again.' }, res, req);
            }
        } catch (error) {
            console.log("OTP verify Error = = = = =>", error);
            response.setResponse(500, { errorMessage: 'Internal server error' }, res, req);
        }
    }
}
export const otp = new OTP();