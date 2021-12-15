import express from "express";
import config from "./config.js";
import isAuth from "./middleware/isAuth.js";
import router from "./routes/index.js";

const app = express();

app.get("/", (_, res) => {
  res.send("Hello World!");
});

// Middleware that allows express to read incoming json requests
app.use(express.json());

// Custom middleware for authenticating and decoding
app.use(isAuth);

// Middleware that starts the router
app.use("/api", router);

// Listen for Port
app.listen(config.port, () => {
  console.log(`Server running: ${config.baseUrl}:${config.port}`);
});
