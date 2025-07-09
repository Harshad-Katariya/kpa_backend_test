import { writeConnection } from "../config/writeDbConnection";
import { readConnection } from "../config/readDbConnection";

export class StudioDBservice {

    public async addStudio(data: any): Promise<any> {

        let qurey = "insert into tbl_studio set ?";

        let result = await writeConnection.insert(qurey, [data]);

        return result
    }

    public async insert_batch(table: string, data: any): Promise<any> {
        if (!Array.isArray(data)) {
            data = [data]
        }

        let tableKey = data.length > 0 ? `(${Object.keys(data[0]).join(",")})` : "";
        let tableValue = data.map(d => `(${Object.keys(data[0]).map(key => `'${d[key]}'`).join(",")})`).join(",");

        let query = "INSERT INTO " + table + " " + tableKey + " VALUES " + tableValue;

        let result = await writeConnection.insert(query, []);

        let insertedIds = [];
        for (let i = 0; i < result.affectedRows; i++) {
            insertedIds.push(result.insertId + i);
        }
        return insertedIds;
    }
}