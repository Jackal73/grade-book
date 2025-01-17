import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../client.js";
import config from "../config.js";

const admin = client.db(config.db.name).collection("admin");

export default {
  async create({ username, password, role }) {
    // Check for an existing user in the db

    const existingUser = await admin.findOne({ username });

    // Error if user already exists in DB
    if (existingUser) {
      throw new Error("User already exists");
    }

    // If new user, await adding 10 "salt" from bcrypt.hash
    const hashPass = await bcrypt.hash(password, config.encryption.saltRounds);

    // Then add to DB
    return admin.insertOne({ username, password: hashPass, role });
  },

  // Check to see if username exists in DB
  async show({ username, password }) {
    const existingUser = await admin.findOne({ username });

    if (!existingUser) {
      throw new Error("Access denied");
    }

    const comparison = await bcrypt.compare(password, existingUser.password);
    if (!comparison) {
      throw new Error("Access denied");
    }

    // If they match, get a signed Json Web Token
    return jwt.sign(
      { username, role: existingUser.role },
      config.encryption.secret,
      {
        expiresIn: config.encryption.expiresIn,
      }
    );
  },
};
