// 9-15-22

let running = false;

let my_width = window.innerWidth * .99;
let my_height = window.innerHeight * .97

let center_x = my_width * .5;
let center_y = my_height * .5;

function setup() {
    createCanvas(my_width, my_height);
    background(0);
}

function CreateRays(start_location) {
    for (let i = 0; i < 3; i++) {
        let other_end = AdjustVectorEnd([start_location[0], start_location[1]], i + 90, 60)
        listOfRays.push({
            start: [start_location[0], start_location[1]],
            end: [other_end[0], other_end[1]],
            direction: i + 90
        });
    }
}


function MoveRays(speed) {  // Adjust line ends to simulate movement
    listOfRays.forEach(ray => {
        ray.start = AdjustVectorEnd(ray.start, ray.direction, speed);
        ray.end = AdjustVectorEnd(ray.end, ray.direction, speed);
        line(ray.start[0], ray.start[1], ray.end[0], ray.end[1]);

        if (ray.start[0] < 0 || ray.start[0] > my_width || ray.start[1] < 0 || ray.start[1] > my_height) {  // Check if rays exiting canvas and remove them for performance
            listOfRays.splice(listOfRays.indexOf(ray), 1);
        }

        CheckIntersections(ray, listOfWalls[0]);
    });
}


listOfRays = [];
listOfWalls = [
    // [my_width * .75, my_height * .25, my_width * .75, my_height * .75],
    // [my_width * .75, my_height * .75, my_width * .25, my_height * .75],
    [my_width * .25, my_height * .5, my_width * .85, my_height * .5]
];
// console.log(listOfWalls)
// CreateRays();

function mouseClicked() {
    let click_location = [mouseX, mouseY];
    CreateRays(click_location);
}

function DrawPermanents() {
    stroke(0, 255, 50);
    strokeWeight(1);
    listOfWalls.forEach(wall => {
        line(wall[0], wall[1], wall[2], wall[3]);
    });
}


function CheckIntersections(current_ray, wallToCheck) {

    // Test
    wallToCheck = [100, 0, 100, 100];
    // current_ray.start = 0, 50;
    // current_ray.end = 100, 50;

    let wall_start = { x: wallToCheck[0], y: wallToCheck[1] };
    let wall_end = { x: wallToCheck[2], y: wallToCheck[3] };

    // let ray_start = { x: current_ray.start[0], y: current_ray.start[1] };
    // let ray_end = { x: current_ray.end[0], y: current_ray.end[1] };
    let ray_start = { x: 0, y: 50 };
    let ray_end = { x: 200, y: 50 };
    line(wallToCheck[0],wallToCheck[1],wallToCheck[2],wallToCheck[3]);
    line(ray_start.x, ray_start.y, ray_end.x, ray_end.y)

    // let intersection = calculateIntersection(current_ray.start, current_ray.end, [wallToCheck[0], wallToCheck[1]], [wallToCheck[2], wallToCheck[3]]);
    // let intersection = calculateIntersection([testWall[0], testWall[1]], [testWall[2], testWall[3]], [wallToCheck[0], wallToCheck[1]], [wallToCheck[2], wallToCheck[3]]);
    let intersection = calculateIntersection(wall_start, wall_end, ray_start, ray_end);
    let thisOne = math.intersect([wallToCheck[0], wallToCheck[1]], [wallToCheck[2], wallToCheck[3]], [ray_start.x, ray_start.y], [ray_end.x, ray_end.y]);
    console.log("THIS", thisOne);
    // console.log(intersection)
    if (intersection != null) {
        circle(intersection.x, intersection.y, 20);
    }

}




function draw() {

    clear();
    background(0);

    DrawPermanents();


    stroke(255, 5, 0);
    strokeWeight(.5);
    MoveRays(1);


    // console.log("Number of rays = ", listOfRays.length)
    // console.log(touches)
}





function showCoordinates(event) {   // For touchscreens
    var touch_x = Math.round(event.touches[0].clientX);
    var touch_y = Math.round(event.touches[0].clientY);

    let touch_location = [touch_x, touch_y];
    CreateRays(touch_location);
}