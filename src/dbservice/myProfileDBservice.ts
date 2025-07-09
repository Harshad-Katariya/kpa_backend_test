import { writeConnection } from "../config/writeDbConnection";
import { readConnection } from "../config/readDbConnection";

export class MyProfile {

    public async myProfile(user_id: number): Promise<any> {

        let qurey = `SELECT tu.name,
    tu.mobile,
    tu.email,
    tu.address,
	tu.dob,
    tu.gender,
    GROUP_CONCAT(DISTINCT CONCAT(ts.studio_id,"/#/",ts.studio_id) order by ts.studio_id DESC) as studio_id,
    GROUP_CONCAT(DISTINCT CONCAT(ts.studio_id,"/#/",ts.studio_name) order by ts.studio_id DESC) as studio_name,
	GROUP_CONCAT(DISTINCT CONCAT(ts.studio_id,"/#/",ts.instagram_url) order by ts.studio_id DESC) as instagram_url,
	GROUP_CONCAT(DISTINCT CONCAT(ts.studio_id,"/#/",ts.whatsapp_url) order by ts.studio_id DESC) as whatsapp_url,
	GROUP_CONCAT(DISTINCT CONCAT(ts.studio_id,"/#/",ts.mobile) order by ts.studio_id DESC) as studio_mobile,
    GROUP_CONCAT(DISTINCT CONCAT(cm.category_id,"/#/",cm.category_id) order by cm.category_id DESC) as category_id,
	GROUP_CONCAT(DISTINCT CONCAT(cm.category_id,"/#/",cm.category_name) order by cm.category_id DESC) as category_name

FROM
    tbl_user AS tu
LEFT JOIN tbl_studio AS ts
ON
    ts.user_id = tu.user_id AND ts.is_active = 1 AND ts.is_deleted = 0
LEFT JOIN tbl_studio_category AS tsc
ON
    tsc.studio_id = ts.studio_id AND tsc.is_active = 1 AND tsc.is_deleted = 0
left join category_mst as cm on cm.category_id = tsc.category_id and cm.is_active = 1 and cm.is_deleted = 0
where tu.user_id = ? and tu.is_active = 1 and tu.is_deleted  = 0
GROUP BY
    tu.user_id,ts.studio_id`;

        let result = await writeConnection.select(qurey, [user_id]);

        return result
    }

}