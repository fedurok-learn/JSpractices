"use strict";

function* range(start = 0, stop, step = 1) {
    /*
    range funciton generates numbers 
    from start to stop exclusively
    */
    if (stop === undefined) {
        stop = start;
        start = 0;
    }

    for(let i = start; i < stop; i += step) {
        yield i;
    }


}

for (let i of range(5)) console.log( i );
for (let i of range(3, 5)) console.log( i );
for (let i of range(1, 9, 2)) console.log( i );

