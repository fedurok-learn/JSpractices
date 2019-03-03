"use strict"

let createIterator = function (obj) {
    Object.defineProperty(
        obj,
        Symbol.iterator, {
            writable: false,
            enumerable: false,
            configurable: true,
            value: function () {
                let o = this;
                let idx = 0;
                let props = Object.keys(o);

                return {
                    next: function () {
                        return {
                            value: o[props[idx++]],
                            done: idx > props.length
                        }
                    }
                }
            }
        }
    );
}


let myobj = {
    a: 2,
    b: 4,
    c: 6
};

createIterator(myobj);

let it = myobj[Symbol.iterator]();

for (let i of myobj) {
    console.log(i);
}