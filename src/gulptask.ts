import util = require('util');
import stream = require('stream');
import worker = require("./worker");
const Transform = stream.Transform;

class KnockoutCSPTask extends Transform 
{
    constructor(opts:stream.TransformOptions){
        super(opts);
    }
    _transform(chunk: any, encoding: string, callback: Function) {
        const strVl = chunk.toString();//Does not work yet
        this.push(worker.generatePreScriptContent(worker.parseBindings(strVl)));
        return  callback();
        
        
    }
}

// Factory for creating new object mode noop streams
function gulpPlugin(){
    return new KnockoutCSPTask({ objectMode: true });
}


export = gulpPlugin;