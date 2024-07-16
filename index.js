#!/usr/bin/env node

var argv = require("minimist")(process.argv.slice(2));

switch (argv["_"][0]) {
  case "make:domain":
    if (argv["_"][1]) {
      var mk = require("./services/DomainService");
      mk({
        fullPath: argv["_"][1],
        migration: argv['m'] ?? false
      });
    } else {
      console.error("Nama tidak diberikan");
    }
    break;
  case "init":
    var invoker = require("./services/InvokerService");

    invoker();
    break;
  default:
    break;
}
