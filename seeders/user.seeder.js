import  { Seeder } from 'mongoose-data-seed';
import User from '../src/models/user';
import {encryptPassword} from "../src/helpers/index"
  
const data = [
  {
    fullName:"admin",
    email: 'admin@gmail.com',
    contact:"9999999999",
    roleId:1,
    password: encryptPassword("admin")
  }
];
 
class usersSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then(count => count === 0);
  }
 
  async run() {
    return User.create(data);
  }
}
 
export default usersSeeder;