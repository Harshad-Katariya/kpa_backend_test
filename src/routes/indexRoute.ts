import { Router } from "express";
import userRoute from "../routes/userRoutes/userRoutes"
import otpRoutes from '../routes/otpRoutes/otpRoutes';
import categoryRoutes from "../routes/categoryRoutes/categoryRoutes";
import StudioRoutes from "../routes/studioRoutes/studioRoutes";
import myProfileRoutes from "../routes/myprofileRoutes/myprofileRoutes";

class IndexRoute {
    public route: Router = Router();
    constructor() {
        this.config();
    }
    config() {
        this.route.use('/auth', userRoute);
        this.route.use('/otp', otpRoutes);
        this.route.use('/category', categoryRoutes);
        this.route.use('/studio', StudioRoutes);
        this.route.use('/myprofile', myProfileRoutes)
    }
}

const indexRoute = new IndexRoute();
export default indexRoute.route;