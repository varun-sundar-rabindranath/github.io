$(document).ready(
  function() {
    console.log("Yeah !! I am ready !!");

    // Get canvas and initialize context
    var canvas = document.getElementById('tutorial');
    var ctx    = canvas.getContext('2d');

    //drawRects(ctx);

    //drawTriangle(ctx);

    //drawArc(ctx);

    //drawLine(ctx);

    //drawBezierQuad(ctx);

    //drawBezierCube(ctx);

    //usePath2D(ctx);

    //drawDashedRectangle(ctx);

    //fillstrokeStyleDemo(ctx);

    //linearGradientDemo(ctx);

    //radialGradientDemo(ctx);

    //imagePatterns(ctx);

    //clipDemo(ctx);

  }
);

function drawTriangle(ctx) {
  // Draw triangle
  ctx.beginPath();
  ctx.moveTo(75,  50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.closePath();
  ctx.stroke();
}

function drawRects(ctx) {
  // Draw and fill rectangle
  ctx.fillStyle = 'rgb(200, 0, 0)';
  ctx.fillRect(10, 10, 50, 50);
}

function drawArc(ctx) {
  // Draw arc
  ctx.beginPath();
  ctx.moveTo(75, 75);
  ctx.arc(75, 75, 50, 0, Math.PI * 1.5, false);
  ctx.fill();
}

function drawLine(ctx) {
  // Draw line
  ctx.beginPath();
  ctx.moveTo(75, 75);
  ctx.lineTo(125, 75);
  ctx.stroke();
}

function drawBezierQuad(ctx) {
  // Draw quadratic bezier curve (1 control point)
  ctx.beginPath();
  ctx.moveTo(75, 75);
  ctx.quadraticCurveTo(100, 100, 125, 75);
  //ctx.closePath();
  ctx.stroke();
}

function drawBezierCube(ctx) {
  // Draw cubic bezier curve (2 control points)
  ctx.beginPath();
  ctx.moveTo(75, 75);
  ctx.bezierCurveTo(70, 100, 120, 100, 125, 75);
  //ctx.closePath();
  ctx.stroke();
}

function drawDashedRectangle(ctx) {
  // Draw a rect with dashed lines
  ctx.beginPath();
  ctx.moveTo(75, 75);
  ctx.setLineDash([4, 2]);
  ctx.strokeRect(75, 75, 50, 50);
}

function usePath2D(ctx) {

  // Decl rectangle
  var rectangle = new Path2D();
  rectangle.moveTo(75, 75);
  rectangle.rect(75, 75, 50, 50);

  // Decl circle
  var circle = new Path2D();
  circle.arc(75, 75, 15, 0, Math.PI * 2, true);

  // Draw the figures
  ctx.stroke(circle);
  ctx.stroke(rectangle);
}

function fillstrokeStyleDemo(ctx) {
  // Demonstrate the how fill/stroke styles are used

  // Assign colors to fill/stroke operations
  ctx.fillStyle   = "rgba(100, 0, 100, 1)";
  ctx.strokeStyle = "rgba(0, 100, 100, 1)";

  ctx.beginPath();
  ctx.fillRect(75, 75, 25, 25);
  ctx.strokeRect(100, 75, 25, 25);
}

function linearGradientDemo(ctx) {
  // Demonstrate how to use radial gradients

  // Setup linear gradient
  var lingrad = ctx.createLinearGradient(0, 0, 1000, 1000);
  lingrad.addColorStop(0, 'red');
  lingrad.addColorStop(1, 'black');

  // Assign
  ctx.fillStyle = lingrad;

  // Draw
  ctx.fillRect(0, 0, 1000, 1000);

  // Setup linear gradient 2
  var lingrad2 = ctx.createLinearGradient(1000, 1000, 2000, 0);
  lingrad2.addColorStop(0, 'black');
  lingrad2.addColorStop(1, 'red');

  //// Assign
  ctx.fillStyle = lingrad2;

  // Draw
  ctx.fillRect(1000, 0, 1000, 1000);
}

function radialGradientDemo(ctx) {
  // Demonstrate how to use radial gradients

  // Offset to place all balls
  var offset = 200;

  // Setup radial gradient 1
  var radgrad1 = ctx.createRadialGradient(125, 125, 50, 150, 150, 200);
  radgrad1.addColorStop(0,   'lightgreen');
  radgrad1.addColorStop(0.9, 'green');
  radgrad1.addColorStop(1,   "rgba(0, 255, 0, 0)");

  // Setup radial gradient 2
  var radgrad2 = ctx.createRadialGradient(125 + offset, 125, 25,
                                          150 + offset, 150, 200);
  radgrad2.addColorStop(0,   'lightyellow');
  radgrad2.addColorStop(0.9, 'yellow');
  radgrad2.addColorStop(1,   "rgba(255, 255, 0, 0)");

  // Setup radial gradient 2
  var radgrad3 = ctx.createRadialGradient(125, 125 + offset, 25,
                                          150, 150 + offset, 100);
  radgrad3.addColorStop(0,   'gray');
  radgrad3.addColorStop(0.9, 'black');
  radgrad3.addColorStop(1,   "rgba(0, 0, 0, 0)");

  // Setup radial gradient 2
  var radgrad4 = ctx.createRadialGradient(125 + offset, 125 + offset, 25,
                                          150 + offset, 150 + offset, 100);
  radgrad4.addColorStop(0,   'lightblue');
  radgrad4.addColorStop(0.9, 'blue');
  radgrad4.addColorStop(1,   "rgba(0, 0, 255, 0)");

  // Assign draw radgrad1
  ctx.fillStyle = radgrad1;
  ctx.fillRect(0, 0, 2000, 2000);

  // Assign draw radgrad2
  ctx.fillStyle = radgrad2;
  ctx.fillRect(0, 0, 2000, 2000);

  // Assign draw radgrad3
  ctx.fillStyle = radgrad3;
  ctx.fillRect(0, 0, 2000, 2000);

  // Assign draw radgrad4
  ctx.fillStyle = radgrad4;
  ctx.fillRect(0, 0, 2000, 2000);
}

function imagePatterns(ctx) {
  // Demonstrate how to use image patters

  // Setup image
  var img = new Image();
  img.src='https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png';

  img.onload = function() {

    // Create a pattern out of that image
    var ptrn = ctx.createPattern(img, 'repeat');

    // Assign and draw
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 2000, 2000);

  }
}

function clipDemo(ctx) {

  // Demonstrate how to  clip

  // Clip path
  ctx.beginPath();
  ctx.moveTo(75,  50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.clip();

  linearGradientDemo(ctx);

  console.log("Clipped !!");
}

