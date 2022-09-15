// 9-15-22
let my_width = window.innerWidth * .99;
let my_height = window.innerHeight * .97

let center_x = my_width * .5;
let center_y = my_height * .5;

function setup() {
    createCanvas(my_width, my_height);
    background(0);
}

let listOfLines = [];


function CreateLines() {
    for (let i = 0; i < 360; i++) {
        let other_end = AdjustVectorEnd([mouseX, mouseY], i, 300)
        listOfLines.push({ start: [center_x, center_y], end: [other_end[0], other_end[1]] });
    }
}

function AdjustVectorEnd(particle_pos, direction, magnatude) {
    let line_end = VectorToCartesian(magnatude, direction)
    line_end[0] += particle_pos[0] // Adjust for starting point
    line_end[1] += particle_pos[1]
    return line_end;
}

function VectorToCartesian(magnatude, direction) {
    let x = magnatude * Math.cos((direction * Math.PI) / 180.0)
    let y = magnatude * Math.sin((direction * Math.PI) / 180.0)
    return [x, y]
}

function DrawLines() {
    listOfLines.forEach(eachLine => {
        line(center_x, center_y, eachLine.end[0], eachLine.end[1]);
    });
}







function draw() {
    clear();
    background(0);

    stroke(0, 255, 0);
    strokeWeight(5);
    fill(0, 75, 185)
    ellipse(center_x, center_y, 80, 80);

    listOfLines = [];
    CreateLines();

    stroke(255, 5, 0);
    strokeWeight(.5)
    DrawLines();
}

