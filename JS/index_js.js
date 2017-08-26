$(document).ready(
  function() {
    console.log("Yeah !! I am ready !!");

    // Get canvas and initialize context
    var canvas = document.getElementById('tutorial');
    var ctx    = canvas.getContext('2d');

    //drawRects(ctx);

    //drawTriangle(ctx);

    drawArc(ctx);

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
