import { Router } from "express";
import assignmentsController from "../controllers/assignments.js";

const router = new Router();

router.post("/", async (req, res) => {
  if (req.isAuth) {
    try {
      const { insertedId: id } = await assignmentsController.create(req.body);
      res.status(201).json({ id });
    } catch ({ message }) {
      res.status(400).json({ message });
    }
  } else {
    res.status(401).json({ message: "Access Denied" });
  }
});
export default router;
