import { CommanDBService } from "./commandbservice";
import { RegisterDbService } from "./registerDbService";
import { CategoryDbService } from "./categoryDBservice";
import { StudioDBservice } from "./studioDBservice";
import { MyProfile } from "./myProfileDBservice"
class DBService {

    constructor(
        public commanDBService: CommanDBService,
        public registerDbService: RegisterDbService,
        public categoryDBservice: CategoryDbService,
        public studioDBservice: StudioDBservice,
        public myProfileDBservice: MyProfile
    ) { }
}

export const DBservice = new DBService(new CommanDBService(), new RegisterDbService(), new CategoryDbService(), new StudioDBservice(), new MyProfile())