"use strict";


let DistanceMixin = {
    distance(fst, snd) {
        let a = fst[0], b = fst[1], c = snd[0], d = snd[1];
        return Math.sqrt(
            (a - c) ** 2 + (b - d) ** 2
            );
    }
}


let PrintAllMixin = {
    printAll() {
        for (let prop in this) {
            console.log( prop );
        }
    }
}


function Shape(points = []) {
    return Object.assign(
        {},
        PrintAllMixin,
        DistanceMixin,

        {
            points: points,

            init(points) { this.points = points },

        }
    );
}


function Rectangle(points=[]) {
    let shapeInherited = Shape(points);

    return Object.assign(
        {},
        shapeInherited, 
        
        {
        square() {
            let a = this.distance(this.points[0], this.points[1]);
            let b = this.distance(this.points[2], this.points[3]);

            return a * b;
            }
        }
    );
}


function Square(points = []) {
    let rectangleInherited =  Rectangle(points);

    return Object.assign(
        {},
        rectangleInherited, 
        
        {
            square() {
                let prevSquare = () => rectangleInherited.square.call(this);
                let a = this.distance(this.points[0], this.points[1]);  
                let b = this.distance(this.points[2], this.points[3]);

                if (a != b) {
                    throw Error(str(a) + " and " + str(b) + "must be equal");
                } else {
                    return prevSquare();
                }
            }
        }
    );
}

let points = [[0,0], [1,1], [0,1], [1,0]];
let sq = new Square(points);


console.log( Math.floor(sq.square()) );

sq.printAll();
console.log();
Square().printAll();
console.log();
Rectangle().printAll();
console.log();
Shape().printAll();

