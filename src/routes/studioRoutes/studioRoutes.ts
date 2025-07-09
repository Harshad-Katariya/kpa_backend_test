import { Router } from "express";
import { studio } from "../../controller/studio";
import { AuthTokenverify } from "../../middleware/authTokenverify";


class StudioRoutes {
    public route: Router = Router();
    constructor() {
        this.config();
    }
    config() {

        this.route.post('/addstudio', AuthTokenverify, studio.addStudio)
    }
}

const studioRoutes = new StudioRoutes();
export default studioRoutes.route;