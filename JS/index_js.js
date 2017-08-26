$(document).ready(
  function() {
    console.log("Yeah !! I am ready !!");
    var canvas = document.getElementById('tutorial');
    var canvas_ctx = canvas.getContext('2d');

    canvas_ctx.fillStyle = 'rgb(200, 0, 0)';
    canvas_ctx.fillRect(10, 10, 50, 50);


    canvas_ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    canvas_ctx.fillRect(30, 30, 50, 50);
  }
);
