import { Router } from "express";
import { otp } from "../../controller/otpVerify";


class OTPRoutes {

    public route: Router = Router();
    constructor() {
        this.config()
    }
    config() {
        this.route.post('/otpVerify', otp.otp_verify)
    }
}

const otpRoutes = new OTPRoutes();
export default otpRoutes.route;