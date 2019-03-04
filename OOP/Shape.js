"use strict";

function Shape() {
    let {points} = this;

    return Object.assign(this, {
        printPoints() {
            points.forEach(element => {
                console.log(element);
            });
        },
    });
}

let MyShape = (target) => Shape.call(target);

const tri = { points: [[1, 2], [2, 3], [3, 4]] };
let triangle = MyShape(tri);

triangle.printPoints();