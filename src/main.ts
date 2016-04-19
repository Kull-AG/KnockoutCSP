/// <reference path="typings/node/node.d.ts" />
/// <reference path="typings/tsd.d.ts" />

import fs = require("fs");
import yargs = require("yargs");

const fileName = yargs.argv.fileName || "E:\\Code\\Kull\\P0939FHNW\\FHNW_Web_FilePermissions-dev\\FHNW_Web_FilePermissions\\Views\\Admin\\Administrators.cshtml";

const fileContent = fs.readFileSync(fileName, "utf-8");
const regex1 = new RegExp(`data[-]bind=["][^"]*["]`, "g");
const regex2 = new RegExp(`data[-]bind=['][']*[']`, "g");
const allMatches = fileContent.match(regex1).concat(fileContent.match(regex2));
allMatches.forEach(s=> console.log(s));

