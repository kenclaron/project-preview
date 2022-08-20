function S(x) { return Math.sin(x); }
function C(x) { return Math.cos(x); }
function T(x) { return Math.tan(x); }
function R(r,g,b,a) {
  if(g == null) return "rgb("+r+",0,0,1)"; 
  else if(b == null) return "rgb("+r+","+g+",0,1)"; 
  else if(a == null) return "rgb("+r+","+g+","+b+",1)"; 
  else return "rgb("+r+","+g+","+b+","+a+")"; 
}

function setOriginalCanvas() {
  c = document.getElementById("canvas");
  x = c.getContext("2d");
  try { if(clear) return; }
  catch(err) {  }
  c.width = c.scrollWidth;
  c.height = c.scrollHeight;
}

function SetValueSettings(variable, value) {
  settings[variable] = value;
}

function onresize() {
  setOriginalCanvas();
  try { clearInterval(intervalId); }
  catch (err) {  }
  run();
}

function onload() {
  setOriginalCanvas();
  run();
}

window.addEventListener("load", function() {
  onload();
});

window.addEventListener("resize", function() {
  onresize()
});