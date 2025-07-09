import { Request, Response } from "express";
import { DBservice } from "../dbservice/dbservice";
import { response } from "../helper/response";
class Studio {

    public async addStudio(req: Request, res: Response): Promise<any> {

        const studioPayload = {
            studio_name: req.body.studio_name ? req.body.studio_name : null,
            instagram_url: req.body.instagram_url ? req.body.instagram_url : null,
            whatsapp_url: req.body.whatsapp_url ? req.body.whatsapp_url : null,
            mobile: req.body.mobile ? req.body.mobile : null,
            user_id: req.body.user_id
        }

        let category_id = req.body.category_id;

        if (category_id.length == 0) {
            response.setResponse(400, { errorMessage: "Minimum 1 category is require." }, res, req)
        } else {
            const result = await DBservice.studioDBservice.addStudio(studioPayload);

            const categoryId = category_id.map((category_id: any) => ({
                studio_id: result.insertId,
                category_id: category_id,
            }));
            await DBservice.studioDBservice.insert_batch('tbl_studio_category', categoryId);
            return response.setResponse(200, { SuccessMessage: "Studio add successfully" }, res, req)
        }
    }
}

export const studio = new Studio();