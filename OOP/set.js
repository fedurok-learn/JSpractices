"use strict";

//Writing some wheels


class MySet {
    //my own set class
    //implemented not for perfomance purposes

    constructor(arr) {
        this.container = this.setify(arr);
    }

    setify(arr) {
        //unique elems from array
        let newArr = [];

        arr.map(
            (elem) => {
                if (newArr.indexOf(elem) < 0) 
                    newArr.push( elem );
            }
        )

        return newArr;
    }

    push(elem) {
        // add elem to set
        if (this.container.indexOf( elem ) < 0) {
            return this.container.push(elem);
        }
    }

    pop(elem) {
        //pop elem from set
        if (elem === undefined) {
            //just pop
            return this.container.pop();
        } else {
            //del specified elem
            let index = this.container.indexOf(elem);
            if (index >= 0) {
                this.container.splice(index, 1);
            }
        }
    }

    clear() {
        //del all elems from set
        while (this.container !== []) {
            this.pop();
        }
    }

    contains(elem) {
        return this.container.indexOf( elem );
    }

    union(...sets) {
        //union
        //i. e. all element of every set

        let arr = this.container;

        for(let set of sets) {
            arr = arr.concat(set.container);
        }

        return new MySet(arr);
    }

    difference(...sets) {
        //i. e. all elements that are in this set
        //but not in the others

        let sset = new MySet([]);
        sset = sset.union(...sets);

        let arr = [];

        for (let elem of this) {
            if (sset.contains(elem) < 0) {
                arr.push(elem);
            }
        }

        return new MySet(arr);
    }
    
    intersection(...sets) {
        //all elements that are common
        //to every set

        let sset = new MySet(this.container);

        for (let set of sets) {
            for (let elem of this) {
                if (set.contains(elem) < 0) {
                    sset.pop(elem);
                }
            }

            if (sset.container.length === 0) break;
        }

        return sset;
    }

    symmetricDifference(...sets) {
        //i. e. all elements that are exactly in one
        //of the sets

        if (this.container.length !== 0) {
            let tempSet = new MySet([]);
            return tempSet.symmetricDifference(...sets.concat(this));
        }

        let resSet = new MySet([]);

        for (let index1 in sets) {
            let setsExceptCurrent = [];
            let currentSet = sets[index1];

            for (let index2 in sets) {
                if (index1 !== index2) {
                    setsExceptCurrent.push(sets[index2]);
                }
            }

            let anotherSets = new MySet([]);
            anotherSets = anotherSets.union(...setsExceptCurrent);
            resSet = resSet.union( currentSet.difference(anotherSets) );
        }

        return resSet;
    }

    isSubset(set) {
        for (let elem of this) {
            if (set.contains(elem) < 0)
                return false;
        }
        return true;
    }

    isDisjoint(set) {
        for(let elem of set) {
            if (this.contains(elem) >= 0) {
                return false;
            }
        }
        return true;
    }

    [Symbol.iterator]() {
        return this.container[Symbol.iterator]();
    }

    inspect(depth, opts) {
        return this.container;
    }
}


let a = new MySet([1, 2, 3]);
let b = new MySet([2, 3, 4]);
let c = new MySet([4, 5, 6]);

console.log(
    'A ', a,
    '\nB ', b,
    '\nC ', c
    );

console.log( "union ", a.union(b, c) );
console.log( "difference ", a.difference(b, c) );
console.log( "symm difference ", a.symmetricDifference(b, c) );
console.log( "intersection ", a.intersection(b, c) );
