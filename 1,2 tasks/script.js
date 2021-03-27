function random() {
    return Math.floor(Math.random() * 101);
}

console.log(random());


function isInCircle(centerX, centerY, radius, pointX, pointY) {
    if (Math.sqrt(((pointX - centerX) ** 2) + ((pointY - centerY) ** 2)) < radius) {
        console.log('Point is in the circle.');
    } else {
        console.log('Point is out of the circle.');
    }
}

isInCircle(1, 1, 2, 2, 3);
