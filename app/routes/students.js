import { Router } from "express";
import studentsController from "../controllers/students.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});

router.post("/", async ({ isAuth }, res) => {
  // if request is properly authorized...
  if (isAuth.role === "ADMIN") {
    const students = await studentsController.index();
    res.json(students);
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

export default router;
