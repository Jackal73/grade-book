export default class Assignment {
  constructor({ title, pointsPossible }) {
    this.title = title;
    this.pointsPossible = pointsPossible;
  }

  validate() {
    const errors = [];

    if (!this.title) {
      errors.push("Title is required");
    }

    if (!this.pointsPossible) {
      errors.push("Points possible is required");
    }

    if (this.pointsPossible < 0) {
      errors.push("Points possible must be greater than zero");
    }

    return errors;
  }
}
