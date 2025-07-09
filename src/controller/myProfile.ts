import { Request, Response } from "express";
import { DBservice } from "../dbservice/dbservice";
import { response } from "../helper/response";
import moment from "moment";


class MyProfile {

    public async getMyprofile(req: Request, res: Response): Promise<any> {
        try {
            const user_id = req.body.user_id;
            console.log("user id ----->", user_id);

            const get_my_profile = await DBservice.myProfileDBservice.myProfile(user_id);
            console.log("get my profile  = = = >", get_my_profile);

            const myProfile_payload = {
                username: get_my_profile[0]['name'],
                mobile_number: get_my_profile[0]['mobile'],
                email: get_my_profile[0]['email'],
                address: get_my_profile[0]['address'],
                dob: moment(get_my_profile[0]['dob']).format('DD-MM-YYYY'),
                gender: get_my_profile[0]['gender'],
                studio: []
            }

            let key = 0;
            while (key < get_my_profile.length) {
                let value = get_my_profile[key];

                let studio_id = value['studio_id'] != null ? value["studio_id"].split(',') : [];
                let studio_name = value['studio_name'] != null ? value["studio_name"].split(',') : [];
                let instagram_url = value["instagram_url"] != null ? value["instagram_url"].split(',') : [];
                let whatsapp_url = value["whatsapp_url"] != null ? value["whatsapp_url"].split(',') : [];
                let studio_mobile = value["studio_mobile"] != null ? value["studio_mobile"].split(',') : [];
                let category_id = value["category_id"] != null ? value["category_id"].split(',') : [];
                let category_name = value["category_name"] != null ? value["category_name"].split(',') : [];

                let studio_object = {};
                let category_array = [];
                let i = 0;

                while (i < studio_id.length) {
                    let reviewValue = {
                        studio_id: studio_id[i] ? (studio_id[i]).split('/#/')[1] : "",
                        studio_name: studio_name[i] ? (studio_name[i]).split('/#/')[1] : "",
                        instagram_url: instagram_url[i] ? (instagram_url[i]).split('/#/')[1] : "",
                        whatsapp_url: whatsapp_url[i] ? (whatsapp_url[i]).split('/#/')[1] : "",
                        studio_mobile: studio_mobile[i] ? (studio_mobile[i]).split('/#/')[1] : "",
                    }
                    studio_object = reviewValue;
                    i++;
                }

                let j = 0;
                while (j < category_id.length) {
                    let reviewValue = {
                        category_id: category_id[j] ? (category_id[j]).split('/#/')[1] : "",
                        category_name: category_name[j] ? (category_name[j]).split('/#/')[1] : "",
                    }
                    category_array.push(reviewValue);
                    j++;
                }
                if (Object.keys(studio_object).length > 0) {
                    studio_object["category"] = category_array;
                    myProfile_payload.studio.push(studio_object);
                };
                key++;
            }
            return response.setResponse(200, { SuccessMessage: "Success", data: myProfile_payload }, res, req);
        } catch (error) {
            console.log("my profile error = = = = >", error);
            response.setResponse(500, { errorMessage: "Internal server error" }, res, req);
        }

    }
}

export const myProfile = new MyProfile();
