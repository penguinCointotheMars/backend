import "regenerator-runtime";
// import msqyl from ('mysql');
import "./db";
import app from './app';
import dotenv from('dotenv');
dotenv.config();


import "./models/Photo";
import "./models/User";

const PORT = process.env.PORT || 8080;

const handelListening = () =>
  console.log(`✅ Listening on : http://localhost:${PORT}`);

app.listen(PORT, handelListening);
