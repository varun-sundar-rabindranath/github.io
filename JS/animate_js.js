
// Particles in system
var NPARTICLES = 300

// world timer
var tick = 0;

// canvas context and dimensions
var canvas;
var ctx;
var cwidth;
var cheight;

// Particle array
var parray = []

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
    canvas = document.getElementById('animate');
    ctx    = canvas.getContext('2d');

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    cwidth = ctx.canvas.width;
    cheight = ctx.canvas.height;

    init_particles();

    console.log("Particles initialized");

    setInterval(draw_particles, 25);

    // add canvas event listener
    canvas.addEventListener("mousedown", function (e) {
        mouseClick(e)
    });

  }
);

/* Initialize particles of the particle array system */
function init_particles() {

    for (var pidx = 0; pidx < NPARTICLES; pidx++) {

        // random particle position
        var px = Math.random() * cwidth;
        var py = Math.random() * cheight;

        //// random particle velocity
        var xdir = Math.random() > 0.5 ? 1 : -1;
        var ydir = Math.random() > 0.5 ? 1 : -1;
        var pvx  = Math.random() * 10 * xdir;
        var pvy  = Math.random() * 10 * ydir;

        // random particle radius
        var pr = Math.random() * 20;

        // random particle color
        var pcolor = random_rgbstr();

        parray.push({id: pidx,
                     x : px,
                     y : py,
                     vx : pvx,
                     vy : pvy,
                     r : pr,
                     color : pcolor})
    }
}

function draw_particles() {

    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, cwidth, cheight);

    ctx.globalCompositeOperation = 'source-over';

    for (var pidx = 0; pidx < NPARTICLES; pidx++) {

        // update particle position
        particle_pos_after_tick(pidx);
        // update particle velocity
        particle_vel_after_tick(pidx);

        // draw particle
        draw_particle(parray[pidx]);
    }

    // draw all
    ctx.save();

    // update world tick
    tick = tick + 1;

}

function random_rgbstr() {

    var base_colorstrength = 150;

    var want_b = Math.random() > 0.5;
    var want_g = Math.random() > 0.5;
    var want_r = Math.random() > 0.5;
    var b      = Math.ceil(base_colorstrength + Math.random() * 100);
    var g      = Math.ceil(base_colorstrength + Math.random() * 100);
    var r      = Math.ceil(base_colorstrength + Math.random() * 100);

    var pcolor = "rgb(" + String(b * want_b) + ", " + String(g * want_g) + ", " + String(r * want_r) + ")";

    return pcolor;
}

function particle_pos_after_tick(pid) {

    // new position
    var nx = parray[pid]["x"] + parray[pid]["vx"];
    var ny = parray[pid]["y"] + parray[pid]["vy"];

    // collision handling
    nx = nx > cwidth  ? cwidth - (nx - cwidth)   : nx;
    nx = nx < 0       ? nx * -1                  : nx;
    ny = ny > cheight ? cheight - (ny - cheight) : ny;
    ny = ny < 0       ? ny * -1                  : ny;

    // update particle position after collision handling
    parray[pid]["x"] = nx;
    parray[pid]["y"] = ny;
}

function particle_vel_after_tick(pid) {

    // new position
    var nx = parray[pid]["x"] + parray[pid]["vx"];
    var ny = parray[pid]["y"] + parray[pid]["vy"];

    // new velocity
    var nvx = parray[pid]["vx"];
    var nvy = parray[pid]["vy"];

    // collision handling
    nvx = (nx > cwidth  || nx < 0) ? nvx * -1 : nvx;
    nvy = (ny > cheight || ny < 0) ? nvy * -1 : nvy;

    // update particle position after collision handling
    parray[pid]["vx"] = nvx;
    parray[pid]["vy"] = nvy;
}

function draw_particle(p) {

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    ctx.closePath();

    ctx.fillStyle = p.color;
    ctx.fill();
}

function mouseClick(evt) {

    // Create explosion centered at mouse position!! :)
    var explodeRad = 150;

    for (var pidx = 0; pidx < NPARTICLES; pidx++) {

        // particle position
        px = parray[pidx]["x"];
        py = parray[pidx]["y"];

        if (dist(evt.clientX, evt.clientY, px, py) < explodeRad) {
            // particle with in explosion radius
            explodeRepel(pidx, explodeRad)
        }
    }
}

function dist(x1, y1, x2, y2) {
    return (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
}

function explodeRepel(pid, explodeRad) {

    // invert particle's velocity
    parray[pid]["vx"] *= -1;
    parray[pid]["vy"] *= -1;

    // modify particle position so it is out of the explosion region
    //parray[pid]["x"] += parray[pid]["vx"] * Math.abs(explodeRad / parray[pid]["vx"])
    //parray[pid]["y"] += parray[pid]["vy"] * Math.abs(explodeRad / parray[pid]["vy"])
}

function animateDemo() {

  ctx.clearRect();

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
