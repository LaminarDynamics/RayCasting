// 9-15-22

let my_width = window.innerWidth * .99;
let my_height = window.innerHeight * .97

let center_x = my_width * .5;
let center_y = my_height * .5;

function setup() {
    createCanvas(my_width, my_height);
    background(0);
}

function CreateRays(start_location) {
    for (let i = 0; i < 360; i++) {
        let other_end = AdjustVectorEnd([start_location[0], start_location[1]], i, 60)
        listOfRays.push({
            start: [start_location[0], start_location[1]],
            end: [other_end[0], other_end[1]],
            direction: i,
            index: ray_index,
            color: "red",
            intersections: CheckIntersections(start_location[0], start_location[1], other_end[0], other_end[1])
        });
        ray_index++;
    }
}


function MoveRays(speed) {  // Adjust line ends to simulate movement
    listOfRays.forEach(ray => {
        ray.start = AdjustVectorEnd(ray.start, ray.direction, speed);
        ray.end = AdjustVectorEnd(ray.end, ray.direction, speed);

        if (ray.color != "red") {
            stroke(0, 255, 50);
        }

        else {
            stroke(255, 5, 0);
        }
        line(ray.start[0], ray.start[1], ray.end[0], ray.end[1]);

        if (ray.start[0] < 0 || ray.start[0] > my_width || ray.start[1] < 0 || ray.start[1] > my_height) {  // Check if rays exiting canvas and remove them for performance
            listOfRays.splice(listOfRays.indexOf(ray), 1);
        }

        ray.intersections.forEach(intersection => {
            let check1 = Math.abs(ray.end[0] - intersection[0]);
            let check2 = Math.abs(ray.end[1] - intersection[1]);

            if (Math.abs(check1) < 3 && Math.abs(check2) < 3) { // Check if ray at intersection
                ray.color = "G"
            }
        });

    });
}

let ray_index = 0;
let listOfRays = [];
let listOfIntersections = [];
let listOfWalls = [ // All walls must be draw left to right/top to bottom for collision logic to work
    [my_width * .75, my_height * .25, my_width * .75, my_height * .75], // Vertical
    [my_width * .25, my_height * .25, my_width * .25, my_height * .75], // Vertical
    [my_width * .25, my_height * .75, my_width * .75, my_height * .75],
    [my_width * .25, my_height * .5, my_width * .85, my_height * .5]
];


function mouseClicked() {
    let click_location = [mouseX, mouseY];
    CreateRays(click_location);
}

function DrawPermanents() {
    stroke(0, 55, 255); // Blue
    // stroke(0, 255, 50); // Green
    strokeWeight(1);
    listOfWalls.forEach(wall => {
        line(wall[0], wall[1], wall[2], wall[3]);
    });
}


function CheckIntersections(start_location_x, start_location_y, other_end_x, other_end_y) {

    let listOfReturnIntersections = [];

    listOfWalls.forEach(wall => {
    
        let intersection = calculateIntersection([wall[0], wall[1]], [wall[2], wall[3]], [start_location_x, start_location_y], [other_end_x, other_end_y]);
        if (intersection != null) {
            if (intersection.x > 0 && intersection.x < my_width && intersection.y > 0 && intersection.y < my_height) {  // Only add intersection if in display area
                if (intersection.x > wall[0] && intersection.x < wall[2] || intersection.y > wall[1] && intersection.y < wall[3]) { // Check actual line, not extended line
                     listOfReturnIntersections.push([intersection.x, intersection.y]);
                }
               
            }
        }

    });

    return listOfReturnIntersections;
}




function draw() {
    clear();
    background(0);

    DrawPermanents();

    // stroke(255, 5, 0);
    strokeWeight(.5);
    MoveRays(1);
}





function showCoordinates(event) {   // For touchscreens
    var touch_x = Math.round(event.touches[0].clientX);
    var touch_y = Math.round(event.touches[0].clientY);

    let touch_location = [touch_x, touch_y];
    CreateRays(touch_location);
}