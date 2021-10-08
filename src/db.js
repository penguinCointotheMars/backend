import mysql from 'mysql';
import dotenv from "dotenv";
dotenv.config();


const db = mysql.connection;







const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) =>
  console.log(`❌ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);