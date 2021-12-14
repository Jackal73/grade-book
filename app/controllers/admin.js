import client from "../client.js";
import config from "../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const admin = client.db(config.db.name).collection("admin");

export default {
  async create({ username, password, role }) {
    // Check for an existing user in the db

    // console.log(username, password, "from admin controller");

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
  async show(username, password) {
    const existingUser = await admin.findOne({ username });

    const comparison = await bcrypt.compare(password, existingUser.password);
    if (!comparison) {
      throw new Error("Access denied");
    }
    // // If the username is not found, error
    // if (!existingUser) {
    //   throw Error("User not found"); // Stops
    // }

    // If it exists;
    // Compare, (with bcrypt.compare), string password with hashed password
    const match = await bcrypt.compare(password, existingUser.password);

    // If passwords do not match, error
    if (!match) {
      throw Error("Password does not match"); // Stops
    }

    // If they match, get a signed Json Web Token
    return jwt.sign({ username }, config.encryption.secret, {
      expiresIn: config.encryption.expiresIn,
    });
  },
};
