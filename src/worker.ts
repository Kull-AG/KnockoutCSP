import ko = require('knockout');

export function parseBindings(content: string) {
    const regex1 = new RegExp(`data[-]bind=["][^"]*["]`, "g");
    const regex2 = new RegExp(`data[-]bind=['][']*[']`, "g");
    const allMatches = (content.match(regex1)||[]).concat(content.match(regex2)||[]);
    return allMatches.filter(s=>s!=null).map(s=> s.substring("data-bind=".length+1, s.length - 1));
}
export function getFunctionString(binding: string) {
    let bindPre =  (<any>ko.expressionRewriting).preProcessBindings(binding,  { 'valueAccessors': true });
    return "function($context, $element) { with($context){with($data||{}){return{" + bindPre + "}}}  }";
}
export function getBindingKey(binding: string){
    return binding + "true";
}

export function generateKnockoutStr(bindings: string[]) {
    return "{" + bindings.reduce((pv, vl, ind)=> {
        return pv + (ind? ", ": "") + JSON.stringify(getBindingKey(vl)) + ":" + getFunctionString(vl);
    }, "") + "}";
}

export function generatePreScriptContent(bindings: string[]) {
    
    
    return `
    (()=>{
        var obj = ${generateKnockoutStr(bindings)};
        var knockoutCache = ko.bindingProvider.instance.bindingCache;
        if(!knockoutCache) {
            // It's minified. Lets do an ugly hack
            knockoutCache=ko.bindingProvider.instance[Object.keys(new ko.bindingProvider())[0]];
        }
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                ko.bindingProvider.instance.bindingCache[key] = obj[key];
            }
        }
    })();
    `;
}