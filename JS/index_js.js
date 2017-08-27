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

    drawDashedRectangle(ctx);
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

