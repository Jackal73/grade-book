import { Router } from "express";
import adminController from "../controllers/admin.js";
import Admin from "../models/Users/Admin.js";

const router = new Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});

// Admin route
router.post("/register", async (req, res) => {
  try {
    const admin = new Admin(req.body);

    console.log(admin);

    const errors = admin.validate();

    if (errors.length) {
      throw new Error(errors.join("\n"));
    }

    await adminController.create(admin);

    // Log in the user and wait for Json Web Token
    const token = await adminController.show(admin);

    res.status(201).send(token);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

export default router;
