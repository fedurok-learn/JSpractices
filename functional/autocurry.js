"use strict";

const curry = ( fn ) => {
    let tempf = fn;

    const _ = ( ...args ) => {
        for ( let arg of args )
            tempf = tempf(arg);
        
        return tempf
    }

    return _;
}

let fst_test = fst => n => n => fst;
let cur_test = curry( fst_test );

console.log( cur_test(1, 2, 3) );
console.log( fst_test(1)(2)(3) );

