
// Particles in system
var NPARTICLES = 500

// world timer
var tick = 0;

// canvas context and dimensions
var canvas;
var ctx;
var cwidth;
var cheight;

// Particle array
var parray = []

// Explosion Radius
var explodeRad      = 300
var explodeStrength = 2.5 // push particles with this factor
var floorFriction   = 0.1 // slow down particles with this factor

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

// Utilities

// distance between 2 points
function dist(x1, y1, x2, y2) {
    return (Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
}

// norm of a vector
function norm_l2(x1, x2) {
  return Math.sqrt(x1 * x1 + x2 * x2)
}

// vector dot product
function dot(x1, y1, x2, y2) {
  return x1 * x2 + y1 * y2
}

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
                     bvx: pvx, // base velocity ; velocity cannot go low
                     bvy: pvy, // beyond this in magnitude
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
        update_particle_pos_after_tick(pidx);
        // update particle velocity
        update_particle_vel_after_tick(pidx);

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

    // return particle position after collision handling
    return [nx, ny]
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

    if (norm_l2(nvx, nvy) > norm_l2(parray[pid]["bvx"], parray[pid]["bvy"])) {
      // account for friction
      nvx = nvx - nvx * floorFriction
      nvy = nvy - nvy * floorFriction
    }

    // return particle velocity after collision handling
    return [nvx, nvy]
}

function update_particle_pos_after_tick(pid) {

  var updated_pos = particle_pos_after_tick(pid)
  parray[pid]["x"] = updated_pos[0]
  parray[pid]["y"] = updated_pos[1]
}

function update_particle_vel_after_tick(pid) {

  var updated_vel = particle_vel_after_tick(pid)
  parray[pid]["vx"] = updated_vel[0]
  parray[pid]["vy"] = updated_vel[1]
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

    for (var pidx = 0; pidx < NPARTICLES; pidx++) {

        // particle position
        px = parray[pidx]["x"];
        py = parray[pidx]["y"];

        if (dist(evt.clientX, evt.clientY, px, py) < explodeRad) {
            // particle with in explosion radius
            explodeRepel(pidx, evt.clientX, evt.clientY)
        }
    }
}

// is the particle indexed at pid moving towards (x, y) ?
function moving_towards(pid, x, y) {

  // lets look at the particle position after tick
  var pos_after_tick = particle_pos_after_tick(pid);
  var x_after_tick = pos_after_tick[0];
  var y_after_tick = pos_after_tick[1];

  var d_before_tick = dist(parray[pid]["x"], parray[pid]["y"], x, y);
  var d_after_tick  = dist(x_after_tick, y_after_tick, x, y);

  if (d_after_tick < d_before_tick) {
    return true;
  } else {
    return false;
  }
}

function explodeRepel(pid, explodeX, explodeY) {

    // deflect particle
    var push_x = parray[pid]["x"] - explodeX
    var push_y = parray[pid]["y"] - explodeY

    // avoid 0 push vector
    if (push_x == 0) { push_x += 0.01; }
    if (push_y == 0) { push_y += 0.01; }

    // make push vector, a unit vector
    var len_push_vector = norm_l2(push_x, push_y)
    push_x = push_x / len_push_vector
    push_y = push_y / len_push_vector

    // how much energy does the particle have in the perpendicular direction
    var e = dot(parray[pid]["vx"], parray[pid]["vy"], push_x, push_y) + 0.1 // latent energy

    // alter push vector to reflect energy
    push_x = push_x * Math.abs(e)
    push_y = push_y * Math.abs(e)

    // deflect particle
    parray[pid]["vx"] = push_x * explodeStrength
    parray[pid]["vy"] = push_y * explodeStrength
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
