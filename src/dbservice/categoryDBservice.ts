import { writeConnection } from "../config/writeDbConnection";
import { readConnection } from "../config/readDbConnection";

export class CategoryDbService {

    public async getAllcategory(): Promise<any> {

        let qurey = "select category_id,category_name from category_mst where is_active = ? and is_deleted = ?";

        let result = await readConnection.select(qurey, [1, 0]);

        return result
    }

    public async addcategory(data: any): Promise<any> {

        let qurey = 'insert into tbl_studio_category (studio_id,category_id) value ?';

        let result = await writeConnection.insert(qurey, [data]);

        return result
    }
}
