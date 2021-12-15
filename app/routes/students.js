import { Router } from "express";
import studentsController from "../controllers/students.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});

// Get list of students - use POST for authentication
router.post("/", async ({ isAuth }, res) => {
  // if request is properly authorized...
  if (isAuth?.role === "ADMIN") {
    try {
      const students = await studentsController.index();
      res.json(students);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

// Show a student by id
router.post("/:id", async ({ isAuth, params }, res) => {
  if (isAuth?.role === "ADMIN") {
    try {
      const student = await studentsController.show(params.id);
      res.json(student);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});

// Update a grade
router.put("/grade/:id", async ({ isAuth, body, params }, res) => {
  if (isAuth?.role === "ADMIN") {
    try {
      const update = await studentsController.update(params.id, body);
      res.status(200).json(update);
    } catch ({ message }) {
      res.status(500).json({ message });
    }
  }
});

export default router;
