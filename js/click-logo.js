let _canvas = document.getElementById("backlogo");
let _ctx = _canvas.getContext('2d');
let img = document.getElementById("preview-logo");

if(_canvas.width == 394) _canvas.width = 434;

let mouse = {
  x: _canvas.width / 2,
  y: _canvas.height / 2
}

let particles = [];
let colors;



_canvas.addEventListener('mouseup', function(e){
	DrawAll(e)
});

Draw();

function DrawAll(e)
{
	_canvas.width = _canvas.clientWidth;
	_canvas.height = _canvas.clientHeight;

  mouse = GetMousePos(_canvas, e);
	
	CreateParticles();
}

function Draw()
{
	_ctx.clearRect(0, 0, _canvas.width, _canvas.height);
	IncParticles();
	DrawParticles();
	
	window.requestAnimationFrame(Draw);
}

function DrawParticles()
{
	for(i = 0; i < particles.length; i++){
		_ctx.beginPath();
		_ctx.fillRect(particles[i].x,
                particles[i].y,
                particles[i].size,
                particles[i].size);
		_ctx.fillStyle = particles[i].color;
		_ctx.closePath();
    _ctx.fill();
    _ctx.strokeRect(particles[i].x-1,
                  particles[i].y-1,
                  particles[i].size+2,
                  particles[i].size+2);
	}
}

function IncParticles()
{
	for(i = 0; i < particles.length; i++){
		particles[i].x += particles[i].velX*2;
		particles[i].y += particles[i].velY*2;
		
		particles[i].size = Math.max(0, (particles[i].size - .05));
		
		if(particles[i].size === 0){
			particles.splice(i, 1);
		}
	}
}

function CreateParticles() 
{
	if(!(mouse.x >= _canvas.width/2-70 && mouse.x <= _canvas.width/2+58 && 
			 mouse.y >= _canvas.height/2-80 && mouse.y <= _canvas.height/2+48)) return false;
	colors = GetMainColorsImage();
  img.classList.toggle("clicked");
  img.addEventListener("transitionend", function() { img.classList.remove("clicked"); });
	for(i = 0; i < 20; i++){
		particles.push({
			x: mouse.x,
			y: mouse.y,
			size: parseInt(Math.random() * 15),
			color: RanRgb(),
			velX: RanVel(),
			velY: RanVel()
		});
	}
}

function RanRgb()
{
	return colors[parseInt(Math.random() * colors.length)].hex;
}

function RanVel()
{
	let vel = 0;
	
	if(Math.random() < 0.5){
		vel = Math.abs(Math.random());
	} else {
		vel = -Math.abs(Math.random());
	}
			
	return vel;
}

function GetMousePos(canvas, e) 
{
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;

  return {
    x: e.clientX - rect.left - root.scrollLeft,
    y: e.clientY - rect.top - root.scrollTop
  };
}

function GetMainColorsImage() {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext('2d');
  
  ctx.width = img.width;
  ctx.height = img.height;
  ctx.clearRect(0, 0, img.width, img.height);
  ctx.drawImage(document.getElementById('preview-logo'), 0, 0, img.width , img.height);
  
  let col, colors_temp = {};
  let pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = ctx.getImageData(0, 0, img.width, img.height);
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
		r = data[i];
		g = data[i + 1];
		b = data[i + 2];
		a = data[i + 3];
		if (a < (255/2) || (r <= 25 && g <= 25 && b <= 25)) {
			continue;
		} 
		col = RgbToHex(r, g, b);
		if (!colors_temp[col])
		colors_temp[col] = 0;
		colors_temp[col]++;
  }
  let rawColors = [];
  for(key in colors_temp) {
    rawColors.push({hex: key, count: colors_temp[key]});
  }
	let sortedColors = rawColors.sort(function(a, b) { return b.count - a.count; });
	console.log("[click-logo.js] Main colors on image-preview were received");
  return sortedColors.splice(0, 5);
}