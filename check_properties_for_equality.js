function checkForEquality(obj1, obj2) {
    var oneSideCheck = (obj1, obj2) => {
        for (let prop in obj1)
            if (!(prop in obj2))
                return false;

        return true;
    };

    return oneSideCheck(obj1, obj2) && oneSideCheck(obj2, obj1);
}

var a = {
    q: 2,
    s: 3
};

var b = {
    q: 3,
    s: 4
}

var c = {};

console.log( checkForEquality( a, b ) );
console.log( checkForEquality( a, c ) );

