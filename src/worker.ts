import ko = require('knockout');

export function parseBindings(content: string) {
    const regexes = [
        new RegExp(`data[-]bind=["][^"]*["]`, "g"),
        new RegExp(`data[-]bind=['][']*[']`, "g"),
        new RegExp(`params=['][']*[']`, "g"),
        new RegExp(`params=["][^"]*["]`, "g")];

    const allMatches = regexes.map(rg => content.match(rg) || [])
        .reduce((p, v) => p.concat(v), []);
    return allMatches
        .map(s => s.indexOf("params") === 0 ? s.substring("params=".length + 1, s.length - 1) : s)
        .map(s => s.indexOf("data-bind") === 0 ? s.substring("data-bind=".length + 1, s.length - 1) : s);
}
export function getFunctionString(binding: string) {
    let bindPre = (<any>ko.expressionRewriting).preProcessBindings(binding, { 'valueAccessors': true });
    return "function($context, $element) { with($context){with($data||{}){return{" + bindPre + "}}}  }";
}
export function getBindingKey(binding: string) {
    return binding + "true";
}

export function generateKnockoutStr(bindings: string[]) {
    return "{" + bindings.reduce((pv, vl, ind) => {
        return pv + (ind ? ", " : "") + JSON.stringify(getBindingKey(vl)) + ":" + getFunctionString(vl);
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