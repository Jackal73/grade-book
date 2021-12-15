import User from "./User.js";

export default class Admin extends User {
  constructor({ username, password } = {}) {
    super({ username, password });
    this.role = "ADMIN";
  }

  validate() {
    const errors = [];

    if (this.username.length < 3) {
      errors.push("Username must be 3 character minimum");
    }

    if (this.password.length < 5) {
      errors.push("Password must be 5 character minimum");
    }

    return errors;
  }
}
