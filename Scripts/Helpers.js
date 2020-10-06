﻿function clone(obj) {
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

    if (obj instanceof ServusState)
        var temp = new obj.constructor(obj.get_state()); 
    else
        var temp = obj.constructor();

    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }
    return temp;
}


function dir(toCheck) {
    var props = [];
    var obj = toCheck;
    do {
        props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    return props.sort().filter(function (e, i, arr) {
        if (e != arr[i + 1] && typeof toCheck[e] == 'function') return true;
    });
}
