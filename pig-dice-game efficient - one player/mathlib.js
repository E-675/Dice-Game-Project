// Math fucntions

Math.randomDec = function(low, high) {
    //return a random decimal between a low (inclusive) and a high (exclusive) value
    return Math.random() * (high - low) + low;
}

Math.randomInt = function(low, high) {
    // Return a random integer between a low (inclusive) and a high (exclusive) value
    return Math.floor(Math.randomDec(low, high));
}

Math.roundTo = function(num, numPlaces) {
    //Round num off to the nearest numPlaces
    num = num * 10 ** numPlaces;
    num = Math.round(num);
    return num / 10 ** numPlaces;
}

