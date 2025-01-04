import express from "express";
import cors from "cors";
import router from "./routes/api";
import { applyMiddlewares } from "./middleware/cookieMiddleware";

const server = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

server.use(cors(corsOptions));
server.use(express.json());
applyMiddlewares(server);
server.use(router);

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
