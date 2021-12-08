import { Router } from "express";
import adminRouter from "./admin.js";
import studentsRouter from "./students.js";

const router = new Router();

// Localhost "Hello World" : test
router.get("/", (_, res) => {
  res.send("Hello World!");
});

// Middleware for admin and student routes
router.use("/admin", adminRouter);
router.use("/students", studentsRouter);

export default router;
