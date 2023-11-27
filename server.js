import dotenv from "dotenv";
dotenv.config();
import yaml from "yamljs";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import mainRouter from "./src/routers/index.js";
const app = express();
const swaggerDocument = yaml.load("./document.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/",mainRouter)
app.use(bodyParser.json())
app.use(cors());
mongoose.connect(process.env.DB_CONNECTION_LIVE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
  
});

