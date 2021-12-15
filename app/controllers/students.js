import { ObjectId as objectId } from "mongodb";
import client from "../client.js";
import config from "../config.js";

const studentsClient = client.db(config.db.name).collection("students");
export default {
  // Get students
  index() {
    return studentsClient.find().toArray();
  },

  // Student by id
  show(id) {
    return studentsClient.findOne({ _id: objectId(id) });
  },

  // Update a grade by student and assignment id
  async update(id, grade) {
    const studentQuery = {
      _id: objectId(id),
      "grades._id": objectId(grade.id),
    };
    const updateGrade = {
      $set: { "grades.$.pointsEarned": grade.pointsEarned },
    };
    return studentsClient.updateOne(studentQuery, updateGrade);
  },
};
