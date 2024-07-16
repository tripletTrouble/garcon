var fs = require("node:fs");
var path = require("path");
var cf = require("../garcon.config");
var cs = require("change-case-all");

var make = function (options) {
  var fullPath = options.fullPath;
  var pathArr = fullPath.split("/");
  var name = pathArr.at(-1);
  var rm = require("./RepoService");
  var cm = require("./ControllerService");
  var sm = require("./SchemaService");
  var um = require("./UsecaseService");

  if (
    !fs.existsSync(
      path.join(__dirname, "../src", cf.targetPath, cf.version, fullPath)
    )
  ) {
    fs.mkdirSync(
      path.join(__dirname, "../src", cf.targetPath, cf.version, fullPath),
      {
        recursive: true,
      }
    );
  }else {
    console.error("Domain already exist");
    throw Error("Domain already exist");
  }

  pathArr.forEach((item, ix) => {
    if (
      !fs.existsSync(
        path.join(
          __dirname,
          "../src",
          cf.targetPath,
          cf.version,
          ...pathArr.slice(0, ix + 1),
          "/index.ts"
        )
      )
    ) {
      fs.writeFileSync(
        path.join(
          __dirname,
          "../src",
          cf.targetPath,
          cf.version,
          ...pathArr.slice(0, ix+1),
          "index.ts"
        ),
        `import { Router } from "express";\nconst ${cs
          .pascalCase(item)
          .toLowerCase()}Routes = Router();\n// Define your routes here ... \n // Ex: r.get("/", c.find.bind(c)); \nexport default ${cs
          .pascalCase(item)
          .toLowerCase()}Routes;`
      );
    }
  });

  rm(fullPath, name);
  cm(fullPath, name);
  sm(fullPath, name);
  um(fullPath, name);
};

module.exports = make;
