"use strict";
var fs = require("fs");
var yargs = require("yargs");
var fileName = yargs.argv.fileName || "E:\\Code\\Kull\\P0939FHNW\\FHNW_Web_FilePermissions-dev\\FHNW_Web_FilePermissions\\Views\\Admin\\Administrators.cshtml";
var fileContent = fs.readFileSync(fileName, "utf-8");
var regex1 = new RegExp("data[-]bind=[\"][^\"]*[\"]", "g");
var regex2 = new RegExp("data[-]bind=['][']*[']", "g");
var allMatches = fileContent.match(regex1).concat(fileContent.match(regex2));
allMatches.forEach(function (s) { return console.log(s); });
