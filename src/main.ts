/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/tsd.d.ts" />

import fs = require("fs");
import yargs = require("yargs");
import worker = require("./worker");

const fileName = yargs.argv.fileName || "E:\\Code\\Kull\\P0939FHNW\\FHNW_Web_FilePermissions-dev\\FHNW_Web_FilePermissions\\Views\\Admin\\Administrators.cshtml";
const fileContent = fs.readFileSync(fileName, "utf-8");
const allMatches = worker.parseBindings(fileContent);
allMatches.forEach(s=> console.log(s));
  
if(yargs.argv.output) {
    fs.writeFileSync(yargs.argv.output, worker.generatePreScriptContent(allMatches), {encoding: "utf-8"})
}