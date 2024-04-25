import mongoose from 'mongoose';
import usersSeeder from "./seeders/user.seeder";
import permissionSeeder from "./seeders/permission.seeder"

const mongoURL = process.env.MONGO_URL;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  usersSeeder,
  permissionSeeder
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
