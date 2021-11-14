import "regenerator-runtime";
import "./db_module/db";
import app from './app';
import dotenv from 'dotenv';
import { PORT } from "./credentials";
dotenv.config();



const SELECTED_PORT = PORT || 3000;

const handelListening = () =>
  console.log(`✅ Listening on : http://localhost:${SELECTED_PORT}`);

app.listen(SELECTED_PORT, handelListening);