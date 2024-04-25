import  { Seeder } from 'mongoose-data-seed';
import Permission  from '../src/models/permission';
  
const data = [
  {
    name:"create user",
    code: 'CREATE_USER',
    statusId:1,
  },
  {
    name:"read user",
    code: 'READ_USER',
    statusId:1,
  },
  {
    name:"update user",
    code: 'UPDATE_USER',
    statusId:1,
  },
  {
    name:"delete user",
    code: 'DELETE_USER',
    statusId:1,
  },
  {
    name:"create user",
    code: 'CREATE_USER',
    statusId:1,
  },
];
 
class permissionSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then(count => count === 0);
  }
 
  async run() {
    return Permission.create(data);
  }
}
 
export default permissionSeeder;