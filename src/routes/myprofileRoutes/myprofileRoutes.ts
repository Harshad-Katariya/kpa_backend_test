import { Router } from "express";
import { myProfile } from "../../controller/myProfile";
import { AuthTokenverify } from "../../middleware/authTokenverify";

class MyProfileRoutes {

    public route: Router = Router();
    constructor() {
        this.config()
    }
    config() {
        this.route.get('/myProfile', AuthTokenverify, myProfile.getMyprofile);
    }
}

const myProfileRoutes = new MyProfileRoutes();
export default myProfileRoutes.route;