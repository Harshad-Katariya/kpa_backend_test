import { writeConnection } from "../config/writeDbConnection";
import { readConnection } from "../config/readDbConnection";
export class RegisterDbService {

    public async checkEmail(email: string): Promise<any> {

        let query = "select * from tbl_user where email = ? and is_active = ? and is_deleted = ?";

        let result = await writeConnection.select(query, [email, 1, 0]);

        return result
    }

    public async registerUser(data: any): Promise<any> {

        let query = "insert into tbl_user set ?";

        let result = await writeConnection.select(query, [data]);

        return result
    }

    public async is_verify(email: string): Promise<any> {

        let get_user_verify_qurey = 'update tbl_user set is_verify = ? where email = ?';

        let result = await readConnection.select(get_user_verify_qurey, [1, email]);

        return result
    }

    public async authToken(user_Id: any, token: any): Promise<any> {
        let data = {
            user_id: user_Id,
            auth_token: token
        }
        let authtoken_qurey = "insert into tbl_user_auth_token set ?";

        let result = await writeConnection.insert(authtoken_qurey, [data]);

        return result
    }
}