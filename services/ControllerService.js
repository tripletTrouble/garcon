var path = require("path");
var fs = require("node:fs");
var cf = require("../garcon.config");
var cs = require("change-case-all");

var make = (fp, name) => {
  name = cs.pascalCase(name);
  fs.readFile(
    path.join(__dirname, "../templates/controller.tm.gc"),
    "utf-8",
    (err, template) => {
      if (err) {
        console.error(err);
      }

      fs.writeFileSync(
        path.join(process.cwd(), `./src/${cf.targetPath}/${cf.version}`, fp, `${name}Controller.ts`),
        template
          .replaceAll("%name%", name),
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }
  );
};

module.exports = make;
