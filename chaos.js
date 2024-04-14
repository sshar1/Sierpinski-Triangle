const SIDE_LENGTH = 800;
const margin = 50;
const translation = -50;
var positions = [];

var currentHue = 0;

var vertices = [];

const FRAME_RATE = 1; // Low frame rate to visualize the math

function setup() {
  createCanvas(SIDE_LENGTH, SIDE_LENGTH);
  
  // positions[0] = [SIDE_LENGTH / 2, 500];
  
  vertices = [
    [margin, SIDE_LENGTH - margin + translation],
    [SIDE_LENGTH - margin, SIDE_LENGTH - margin + translation],
    [SIDE_LENGTH / 2, SIDE_LENGTH - margin - (pow(3, 1/2) / 2) * (SIDE_LENGTH - margin*2) + translation]
  ];
  
  positions[0] = [random(SIDE_LENGTH),  random(SIDE_LENGTH)];
  
  // Optional piece of code that ensures the first point will be inside the triangle
  while (!isInsideTriangle(vertices[0][0], vertices[0][1], vertices[1][0], vertices[1][1], vertices[2][0], vertices[2][1], positions[0][0], positions[0][1])) {
    positions[0] = [random(SIDE_LENGTH),  random(SIDE_LENGTH)];
  }
  
  colorMode(HSB, 500);
  
  frameRate(FRAME_RATE)
}

function draw() {
  background('black');
  
  stroke('yellow');
  strokeWeight(8);
  
  for (let i = 0; i < vertices.length; i++) {
    point(vertices[i][0], vertices[i][1]);
  }
  
  // stroke(color(currentHue++ % 500, 500, 500));
  stroke('white');
  strokeWeight(3);
  
  for (let i = 0; i < positions.length; i++) {
    point(positions[i][0], positions[i][1]);
  }
  
  // Get random vertex
  randomVertex = random(vertices);
  newPosition = getHalfwayPoint(
    positions[positions.length-1][0], 
    positions[positions.length-1][1],
    randomVertex[0],
    randomVertex[1]
  );
  
  // Optional: Line visualizer
  stroke('green');
  strokeWeight(1);
  line(positions[positions.length-1][0], 
    positions[positions.length-1][1],
    randomVertex[0],
    randomVertex[1]);
  
  // Optional: Show new point on line
  stroke('red')
  strokeWeight(10)
  point(newPosition[0], newPosition[1]);
  
  positions[positions.length] = newPosition;
}

function getHalfwayPoint(x1, y1, x2, y2) {
  return [(x2 + x1)/2, (y2 + y1)/2];
}

function getDistance(x1, y1, x2, y2) {
  return sqrt( pow((x2 - x1), 2) + pow((y2 - y1), 2));
}

// Checks if point is inside triangle by checking if sum of partial
// triangles formed by the point and other vertices is equal to 
// the area of the triangle
function isInsideTriangle(x1, y1, x2, y2, x3, y3, x, y) {
  let A = area (x1, y1, x2, y2, x3, y3);
  let A1 = area (x, y, x2, y2, x3, y3);
  let A2 = area (x1, y1, x, y, x3, y3);
  let A3 = area (x1, y1, x2, y2, x, y);
  
  return (A == A1 + A2 + A3);
}

// Get area of triangle
function area(x1, y1, x2, y2, x3, y3) {
  return abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);
}
