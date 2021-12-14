import { Router } from "express";
import studentsController from "../controllers/students.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});

router.post("/", async (req, res) => {
  // if request is properly authorized...
  if (req.isAuth) {
    const students = await studentsController.index();
    res.json(students);
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
  // else...401 - unauthorized
});

export default router;
