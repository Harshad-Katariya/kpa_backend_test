import { Request, Response } from "express";
import { response } from "../helper/response";
import { DBservice } from "../dbservice/dbservice";
class Category {

    public async getAllcategory(req: Request, res: Response): Promise<any> {
        try {

            const get_all_category = await DBservice.categoryDBservice.getAllcategory();

            if (get_all_category.length > 0) {
                let i = 0;
                while (i < get_all_category.length) {
                    let category_data = get_all_category[i];

                    get_all_category[i] = {
                        category_id: category_data['category_id'] != null ? category_data['category_id'] : "",
                        category_name: category_data['category_name'] != null ? category_data['category_name'] : "",
                    }
                    i++;
                }
                return response.setResponse(200, { SuccessMessage: "success", data: get_all_category }, res, req)
            } else {
                return response.setResponse(404, { errorMessage: "data not found" }, res, req)
            }
        } catch (error) {
            console.log("getAllcategory error = = = = =>", error);
            response.setResponse(500, { errorMessage: "Internal server error" }, res, req)
        }

    }
}

export const category = new Category();
