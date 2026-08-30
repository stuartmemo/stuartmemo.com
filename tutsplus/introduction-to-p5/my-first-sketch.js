function setup () {
    createCanvas(200, 200);
    background('red');
    frameRate(5);
}

function draw () {
    translate(random(0,width), random(0,height));

    angleMode(DEGREES);
    rotate(random(1, 360));
    fill('#CC00FF');
    rect(0, 0, 50, 50);

    rotate(random(1, 360));
    fill('#66CC66');
    ellipse(25, 25, 25, 25);

    rotate(random(1, 360));
    fill('yellow');
    triangle(25, 0, 50, 50, 0, 50);
}
