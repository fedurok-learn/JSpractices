"use strict";


const isTrulyNaN  = (elem) => {
    return (elem !== elem && isNaN(elem));
}

const containsNaN = (array) => {
    let index = 0;
    for (let elem of array) {
        if (isTrulyNaN(elem)) {
            return index;
        }
        index++;
    }

    return -1;
}

const contains = (array, needle) => {
    if (isTrulyNaN(needle)) {
        return containsNaN(array);
    } else {
        let index = 0;
        for (let elem of array) {
            if (elem === needle) {
                return index;
            }

            index++;
        }

        return -1;
    }
}


class MySet {
    //my own set class
    //implemented not for perfomance purposes
    length;

    constructor(arr) {
        this.container = this.setify(arr);
        this.length = this.container.length;
    }

    setify(arr) {
        //set from array
        let newArr = [];
        for (let elem of arr)
            if (newArr.indexOf(elem) < 0)
                newArr.push(elem);

        return newArr;
    }

    push(elem) {
        // add elem to set
        if (this.container.indexOf( elem ) < 0) {
            this.length++;
            return this.container.push(elem);
        }
    }

    pop(elem) {
        //pop elem from set
        this.length--;
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
        while (this.length) {
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
        sset = sset.union(sets);

        arr = [];

        for (let elem of this) {
            if (!sset.contains(elem)) {
                arr.push(elem);
            }
        }

        return new MySet(arr);
    }
    
    intersection(...sets) {
        //all elements that are common
        //to every set

        let sset = new MySet([]);
        sset = sset.union(sets);

        arr = [];

        for (let elem of this) {
            if (sset.contains(elem)) {
                arr.push(elem);
            }
        }

        return new MySet(arr);
    }

    symmetricDifference(...sets) {
        //i. e. all elements that are exactly in one
        //of the sets

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
            if (!set.contains(elem))
                return true;
        }
        return false;
    }

    isDisjoint(set) {
        for(let elem of set) {
            if (this.contains(elem)) {
                return false;
            }
        }
        return true;
    }

    [Symbol.iterator]() {
        return this.container[Symbol.iterator]();
    }
}
