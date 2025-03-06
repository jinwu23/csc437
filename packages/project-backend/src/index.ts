import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient } from "mongodb";

import { registerUserRoutes } from "./routes/users";
import { registerEventRoutes } from "./routes/events";

dotenv.config();
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";

const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

async function setUpServer() {
  const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
  const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

  console.log("Attempting Mongo connection at " + connectionStringRedacted);

  const mongoClient = await MongoClient.connect(connectionString);
  const collectionInfos = await mongoClient.db().listCollections().toArray();
  console.log(collectionInfos.map((collectionInfo) => collectionInfo.name)); // For debug only

  const app = express();
  app.use(express.static(staticDir));
  app.use(express.json());

  // User Routes
  registerUserRoutes(app, mongoClient);

  // Event Routes
  registerEventRoutes(app, mongoClient);

  // Base route
  app.get("*", (req: Request, res: Response, next) => {
    res.sendFile(path.resolve(staticDir, "index.html"));
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

setUpServer();
