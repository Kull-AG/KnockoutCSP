import fs = require("fs");
import yargs = require("yargs");
import worker = require("./worker");

const fileName = yargs.argv.fileName as string || "../test/test.html";
const fileContent = fs.readFileSync(fileName, "utf-8");
const allMatches = worker.parseBindings(fileContent);
 
const outputFileName = yargs.argv.output as string || (fileName === "../test/test.html" ? "../dist/test.js" : null);
  
if(outputFileName) {
    fs.writeFileSync(outputFileName, worker.generatePreScriptContent(allMatches), {encoding: "utf-8"});
}