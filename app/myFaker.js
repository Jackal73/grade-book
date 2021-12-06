import faker from "faker";
import { promises as fs } from "fs";
fs.writeFile(
  "db.json",
  JSON.stringify(
    Array.from({ length: 20 }, () => ({
      fname: faker.name.firstName(),
      lname: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
    })),
    null,
    2
  ),
  "utf8"
);
