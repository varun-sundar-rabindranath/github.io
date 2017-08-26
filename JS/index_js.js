$(document).ready(
  function() {
    console.log("Yeah !! I am ready !!");

    // Get canvas and initialize context
    var canvas = document.getElementById('tutorial');
    var ctx    = canvas.getContext('2d');

    //ctx.fillStyle = 'rgb(200, 0, 0)';
    //ctx.fillRect(10, 10, 50, 50);

    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(75,  50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.closePath();
    ctx.stroke();

  }
);
