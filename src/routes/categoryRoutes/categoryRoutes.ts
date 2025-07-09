import { Router } from "express";
import { category } from "../../controller/category";


class CategoryRoutes {

    public route: Router = Router();
    constructor() {
        this.config()
    }
    config() {
        this.route.get('/allcategory', category.getAllcategory)
    }
}

const categoryRoutes = new CategoryRoutes();
export default categoryRoutes.route;