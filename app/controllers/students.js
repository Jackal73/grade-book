import client from "../client.js";
import config from "../config.js";

const studentsClient = client.db(config.db.name).collection("students");
export default {
  index() {
    return studentsClient.find().toArray();
  },
};
