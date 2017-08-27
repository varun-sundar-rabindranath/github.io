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

    //drawBeizerQuad(ctx);

    drawBeizerCube(ctx);
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

function drawBeizerQuad(ctx) {
  // Draw quadratic beizer curve (1 control point)
  ctx.beginPath();
  ctx.moveTo(75, 75);
  ctx.quadraticCurveTo(100, 100, 125, 75);
  //ctx.closePath();
  ctx.stroke();
}

function drawBeizerCube(ctx) {
  // Draw cubic beizer curve (2 control points)
  ctx.beginPath();
  ctx.moveTo(75, 75);
  ctx.bezierCurveTo(70, 100, 120, 100, 125, 75);
  //ctx.closePath();
  ctx.stroke();
}
