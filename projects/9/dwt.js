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

function SetValueSettings(letiable, value) {
  settings[letiable] = value;
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
  WE_PropertyListen();
  onload();
});

window.addEventListener("resize", function() {
  onresize()
});

function ComponentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function RgbToHex(r, g, b) {
  return "#" + ComponentToHex(r) + ComponentToHex(g) + ComponentToHex(b);
}

function WE_PropertyListen() {
  window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {
      for(property in properties) {
        if(properties[property].type == "slider" || properties[property].type == "combo" || properties[property].type == "bool") { 
          settings[property] = properties[property].value;
        }
        else if(properties[property].type == "color") {
          let temp = properties[property].value.split(' ');
          temp = temp.map(function(c) {
            return Math.ceil(c * 255);
          });
          settings[property] = RgbToHex(temp[0], temp[1], temp[2])
        }
      }
    }
  }
}

//2019.07.05