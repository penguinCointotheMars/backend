import mysql from 'mysql';
import dotenv from "dotenv";
import { RDS_DB, RDS_HOSTNAME, RDS_PASSWORD, RDS_USERNAME } from '../credentials';
dotenv.config();


const db = mysql.createPool({
    connectionLimit: 10,
    host: RDS_HOSTNAME,
    user: RDS_USERNAME,
    acquireTimeout: 600000,
    password: RDS_PASSWORD,
    database: RDS_DB,
    multipleStatements: true,
  });




const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

 export default db;