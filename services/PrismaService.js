var path = require("path");
var fs = require("node:fs");
var cf = require("../garcon.config");
var cs = require("change-case-all");

var make = (name) => {
  name = cs.pascalCase(name);
  if (fs.existsSync(path.join(process.cwd(), "./prisma/schema.prisma"))) {
    fs.readFile(
      path.join(process.cwd(), "./prisma/schema.prisma"),
      "utf-8",
      (error, data) => {
        if (data.includes(name)) {
          console.log("Migration already created!");
        } else {
          fs.appendFileSync(
            path.join(process.cwd(), "./prisma/schema.prisma"),
            `\nmodel ${name} {\n\tid\t\t\tInt\t\t\t@id @default(autoincrement())\n}\n`
          );
        }
      }
    );
  } else {
    console.error("Prisma not installed, please install it first!");
    process.exit(0);
  }
};

module.exports = make;
