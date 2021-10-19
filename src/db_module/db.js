import mysql from 'mysql';
import dotenv from "dotenv";
dotenv.config();


const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    acquireTimeout: 600000,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB,
    multipleStatements: true,
  });




const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);

 export default db;