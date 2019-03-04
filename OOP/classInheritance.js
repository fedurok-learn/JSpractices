"use strict";


class DistanceMixin {
    static distance(fst, snd) {
        let a = fst[0], b = fst[1], c = snd[0], d = snd[1];
        return Math.sqrt(
            (a - c) ** 2 + (b - d) ** 2
            );
    }
}


class PrintAllMixin {
    printAll() {
        for (let prop in this) {
            console.log( prop );
        }
    }
}


class Shape extends PrintAllMixin {
    distance(fst, snd) {
        return DistanceMixin.distance(fst, snd);
    }

    constructor(points = []) {
        super();
        this.points = points;
    }

    init(points) { this.points = points }

}


class Rectangle extends Shape {
    square() {
        let a = super.distance(this.points[0], this.points[1]);
        let b = super.distance(this.points[2], this.points[3]);

        return a * b;
    }
}


class Square extends Rectangle {
    square() {
        let a = super.distance(this.points[0], this.points[1]);  
        let b = super.distance(this.points[2], this.points[3]);
        
        if (a != b) {
            throw Error(str(a) + " and " + str(b) + "must be equal");
        } else {
            return super.square();
        }
    }
}

let sq = new Square([[0,0], [1,1], [0,1], [1,0]]);

console.log( Math.floor(sq.square()) );

