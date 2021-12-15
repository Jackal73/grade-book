import client from "../client.js";
import config from "../config.js";

const studentsClient = client.db(config.db.name).collection("students");
export default {
  index() {
    return studentsClient.find().toArray();
  },
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
