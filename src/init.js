import "regenerator-runtime";
import "./db_module/db";
import app from './app';
import dotenv from 'dotenv';
dotenv.config();



const PORT = process.env.PORT || 3000;

const handelListening = () =>
  console.log(`✅ Listening on : http://localhost:${PORT}`);

app.listen(PORT, handelListening);