
import through = require('through2');
import gutil = require('gulp-util');
import worker = require('./worker');
import path = require('path');
const PluginError = gutil.PluginError;





// consts
const PLUGIN_NAME = 'knockout-csp';

// plugin level function (dealing with files)
function gulpPrefixer() {
  
  // creating a stream through which each file will pass
  var stream = through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
        const strVl = file.contents.toString();
        file.contents =new Buffer(worker.generatePreScriptContent(worker.parseBindings(strVl)), 'utf8');
    }
    
	file.path = file.path.replace(path.extname(file.path), ".js");
    // make sure the file goes through the next gulp plugin
    this.push(file);

    // tell the stream engine that we are done with this file
    cb();
  });

  // returning the file stream
  return stream;
};

// exporting the plugin main function
export = gulpPrefixer;