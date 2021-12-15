import client from "../client.js";
import config from "../config.js";

const assignments = client.db(config.db.name).collection("assignments");
const students = client.db(config.db.name).collection("students");

export default {
  async create(newAssignment) {
    const { insertedId } = await assignments.insertOne(newAssignment);
    await students.updateMany({}, { $push: { grades: newAssignment } });
    return { insertedId };
  },
};
