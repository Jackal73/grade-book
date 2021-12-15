import { Router } from "express";
import assignmentsController from "../controllers/assignments.js";
import Assignment from "../models/Assignment.js";

const router = new Router();

router.post("/", async ({ isAuth, body }, res) => {
  try {
    if (isAuth?.role === "ADMIN") {
      const assignment = new Assignment(body);

      const errors = assignment.validate();

      if (errors.length) {
        throw new Error(errors.join("\n"));
      }

      const resp = await assignmentsController.create(body);

      res.status(201).json(resp);
    } else {
      throw new Error("You are not authorized to perform this action");
    }
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

export default router;
