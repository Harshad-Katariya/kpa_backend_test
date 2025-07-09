import { Router } from "express";
import { register_user } from "../../controller/register";
import { login_user } from "../../controller/login";
import { AuthTokenverify } from "../../middleware/authTokenverify"
class UserRoutes {
    public route: Router = Router();
    constructor() {
        this.config();
    }
    config() {
        /* Signup route */
        this.route.post('/signup', register_user.registeruser);

        /* Login route */
        this.route.post('/login', login_user.loginuser);

        this.route.get('/home', AuthTokenverify)
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.route;