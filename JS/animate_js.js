
// world timer
var tick = 0;

// canvas context and dimensions
var ctx;
var cwidth;
var cheight;

// A ball's radial gradient properties
var rg1 = { start_posx: 125,
            start_posy: 125,
            start_rad:  25,
            end_posx:   150,
            end_posy:   150,
            end_rad:    250,
            inner_c:    "lightgreen",
            outer_c:    "green",
            border :    "rgba(0, 255, 0, 0)",
            tick   :    0};

$(document).ready(
  function() {
    console.log("Yeah !! I am ready to animate!!");

    // Get canvas and initialize context
    var canvas = document.getElementById('animate');
    ctx    = canvas.getContext('2d');

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    cwidth = ctx.canvas.width;
    cheight = ctx.canvas.height;

    setInterval(animateDemo, 250);

  }
);

function animateDemo() {



  ctx.clearRect(0, 0, cwidth, cheight);

  ctx.globalCompositeOperation = 'source-over';

  var icx = rg1["start_posx"];
  var icy = rg1["start_posy"] + tick;
  var icr = rg1["start_rad"];
  var ocx = rg1["end_posx"];
  var ocy = rg1["end_posy"] + tick;
  var ocr = rg1["end_rad"];

  var new_icx = icx + icr * Math.cos(tick) * 1.5;
  var new_icy = icy + icr * Math.sin(tick) * 1.5;

  var radgrad = ctx.createRadialGradient(new_icx, new_icy, icr, ocx, ocy, ocr);

  radgrad.addColorStop(0,   rg1["inner_c"])
  radgrad.addColorStop(0.9, rg1["outer_c"])
  radgrad.addColorStop(1,   rg1["border"])

  //ctx.beginPath();
  //ctx.arc(rg1["end_posx"], rg1["end_posy"] + rg1["tick"], rg1["end_rad"], 0, Math.PI * 2, false)
  //ctx.fillStyle = radgrad;
  //ctx.fill();

  ctx.fillStyle = radgrad;
  ctx.fillRect(0, 0, cwidth, cheight);

  ctx.save();

  tick = tick + 1;

  //window.requestAnimationFrame(animateDemo);
}
