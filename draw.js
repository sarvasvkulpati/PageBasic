var canvas,
  ctx,
  flag = false,
  prevX = 0,
  currX = 0,
  prevY = 0,
  currY = 0,
  dot_flag = false;

var x = "black";
var y = 2;

function switchColor(color) {}

function init() {
  canvas = document.getElementById("can");
  ctx = canvas.getContext("2d");
  w = canvas.width;
  h = canvas.height;

  canvas.addEventListener(
    "mousemove",
    function(e) {
      findxy("move", e);
    },
    false
  );
  canvas.addEventListener(
    "mousedown",
    function(e) {
      findxy("down", e);
    },
    false
  );
  canvas.addEventListener(
    "mouseup",
    function(e) {
      findxy("up", e);
    },
    false
  );
  canvas.addEventListener(
    "mouseout",
    function(e) {
      findxy("out", e);
    },
    false
  );
}

function draw() {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY);
  ctx.lineTo(currX, currY);
  ctx.strokeStyle = x;
  ctx.lineWidth = y;
  ctx.stroke();
  ctx.closePath();
}

function erase() {
  var m = confirm("Are you sure you want to erase?");
  if (m) {
    ctx.clearRect(0, 0, w, h);
    document.getElementById("canvasimg").style.display = "none";
  }
}

function save() {
  document.getElementById("canvasimg").style.border = "2px solid";
  var image = canvas.toDataURL();
  document.getElementById("canvasimg").src = image;
  document.getElementById("canvasimg").style.display = "inline";
  var pngImage = canvas.toDataURL("image/png");
  $.ajax();
}

function findxy(res, e) {
  if (res == "down") {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - canvas.offsetLeft;
    currY = e.clientY - canvas.offsetTop;

    flag = true;
    dot_flag = true;
    if (dot_flag) {
      ctx.beginPath();
      ctx.fillStyle = x;
      ctx.fillRect(currX, currY, 2, 2);
      ctx.closePath();
      dot_flag = false;
    }
  }
  if (res == "up" || res == "out") {
    flag = false;
  }
  if (res == "move") {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - canvas.offsetLeft;
      currY = e.clientY - canvas.offsetTop;
      draw();
    }
  }
}
