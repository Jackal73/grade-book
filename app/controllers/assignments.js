import client from "../client.js";
import config from "../config.js";

const assignmentsClient = client.db(config.db.name).collection("assignments");

export default {
  create(newAssignments) {
    return assignmentsClient.insertOne(newAssignments);
  },
};
