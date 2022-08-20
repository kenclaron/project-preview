var canvas;
var ctx;

var discord_logo = new Image();
discord_logo.src = 'discord_logo.svg';
var backimage = "";
var colors = ["#7D8187", "#5F698B", "#1E1F23"]
var circles = [];
var frames = 0;
var oldMouse = {
  x: -1,
  y: -1
};
var mouse = {
  x: -1,
  y: -1
};
var preMouse = {
  x: -1,
  y: -1
};
var settings = {
  speed: 100,
  spawntime: 30,
  backgroundlines: false,
  discordlogo: true,
  backimageview: false
};
var diffLines = 0;
var diffLinesUp = true;

window.wallpaperPropertyListener = {
	applyUserProperties: function (properties) {
    if(properties.speed) {
      settings.speed = properties.speed.value;
    }
    if(properties.spawntime) {
      settings.spawntime = properties.spawntime.value;
    }
    if(properties.backgroundlines) {
      settings.backgroundlines = properties.backgroundlines.value;
      if(settings.backgroundlines) document.body.getElementsByTagName("div")[0].style.visibility = "visible";
      else document.body.getElementsByTagName("div")[0].style.visibility = "hidden";
    }
    if(properties.discordlogo) {
      settings.discordlogo = properties.discordlogo.value;
    }
    //if(properties.backimagemode) {
    //  settings.backimageview = properties.backimagemode.value;
    //  if(backimage){
    //    document.body.style.backgroundRepeat = "no-repeat";
    //    document.body.style.backgroundPosition = "center";
    //    document.body.style.backgroundImage = "url('" + backimage + "')";
    //    document.body.style.backgroundSize = "100%";
    //  }else{
    //    document.body.style.backgroundImage = null;
    //  }
    //}
    //if(properties.backimage) {
    //  backimage = "file:///"+properties.backimage.value;
    //  if(backimage){
    //    document.body.style.backgroundRepeat = "no-repeat";
    //    document.body.style.backgroundPosition = "center";
    //    document.body.style.backgroundImage = "url('" + backimage + "')";
    //    document.body.style.backgroundSize = "100%";
    //  }else{
    //    document.body.style.backgroundImage = null;
    //  }
    //}
  }
}
function run() 
{
  if(settings.backgroundlines) document.body.getElementsByTagName("div")[0].style.visibility = "visible";
  else document.body.getElementsByTagName("div")[0].style.visibility = "hidden";

  if(frames < settings.spawntime) frames++;
  else {
    circles.push({
      radius: 3+Math.random()*2, 
      speed: 0.5+Math.random()*0.5,
      color: colors[Math.floor(Math.random()*colors.length)],
      position: {
        x: Math.random()*canvas.width, 
        y: canvas.height + 0
      }
    });
    frames = 0;
  }

  //if(settings.backimageview) {
  //  document.body.style.backgroundRepeat = "no-repeat";
  //  document.body.style.backgroundPosition = "center";
  //  document.body.style.backgroundImage = "url('"+backimage+"')";
  //  document.body.style.backgroundColor = "#2C2F33";
  //  document.body.style.backgroundSize = "100%";
  //}
  //else {
    document.body.style.backgroundImage = null;
    document.body.style.background = "#2C2F33";
  //}
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  if(settings.discordlogo) {
    ctx.drawImage(discord_logo, canvas.width-275, canvas.height-100, 1048/4, 350/4);
  }
  
  for(let i = 0; i < circles.length; i++) {
    if(circles[i].position.y < -10) {
      circles.splice(i, 1);
    }
  }
  
  circles.forEach(circle => {
    circle.position.y -= circle.speed*(settings.speed/100);
  });
  
  let diffX = mouse.x - oldMouse.x;
  let diffY = mouse.y - oldMouse.y;
  if(diffY > 0) diffY = 0;
  if(preMouse.x != mouse.x && preMouse.x != mouse.x) {
    circles.forEach(circle => {
      circle.position.x += diffX/25*circle.speed*(settings.speed/100);
      circle.position.y += diffY/25*circle.speed*(settings.speed/100);
    });
  }
  if(diffLines > 5) diffLinesUp = false;
  else if(diffLines < -5) diffLinesUp = true;
  if(diffLinesUp) diffLines += 0.01*(settings.speed/200);
  else diffLines -= 0.01*(settings.speed/200);
  let addHeight = (-mouse.y/(canvas.height/10)-5)+diffLines;
  document.getElementsByName("line")[0].style.height = 20+addHeight+"%";
  document.getElementsByName("line")[1].style.height = 35+addHeight+"%";
  document.getElementsByName("line")[2].style.height = 50+addHeight+"%";

  preMouse = mouse;
  circles.forEach(circle => {
    ctx.beginPath();
    ctx.fillStyle = circle.color;
    ctx.arc(circle.position.x, circle.position.y, circle.radius, 0, Math.PI*2);
    ctx.fill();
  });
  
	window.requestAnimationFrame(run);
}

window.onload = function() {
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d");
	canvas.width = canvas.scrollWidth;
	canvas.height = canvas.scrollHeight;
  document.onmousemove = getMousePos;
	window.requestAnimationFrame(run);
};
window.onresize = function() {
	canvas.width = canvas.scrollWidth;
	canvas.height = canvas.scrollHeight;
};

function getMousePos(event)
{
  let mouseX = -1;
  let mouseY = -1;
  if (document.attachEvent != null) {
    mouseX = window.event.clientX;
    mouseY = window.event.clientY;
  } else if (!document.attachEvent && document.addEventListener) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
  oldMouse = mouse;
  mouse = {
    x: mouseX,
    y: mouseY 
  };
}



