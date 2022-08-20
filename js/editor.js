String.prototype.lines = function() { return this.split(/\r*\n/); }
String.prototype.lineCount = function() { return this.lines().length; }

let placeholder = 
"x.fillStyle = \"#fff\";\n"+
"x.clearRect(0,0,i=2e3,i);\n"+
"let ti = 0;\n"+
"for(ti+=90;p=i&1,m=ti/C(ti/i)+p*(ti/2+i%ti),i--;)\n"+
"{\n"+
"x.fillRect(c.width/2+m*S(n=ti+t/9+i*i)*C(!p*i/ti),\n"+
"           (c.height/2)+m*C(n+p*2),s=3-C(n)*3,s);\n"+
"}\n"+
"t += 0.1;";

document.getElementById("editor-area").setAttribute("placeholder", placeholder);

let oldLengthLines = 1;

function ResizeEditor(element) {
  if(element.value != "") {
    element.style.whiteSpace = "nowrap";
    document.getElementById("editor-area").setAttribute("placeholder", "");
  }
  else {
    element.style.whiteSpace = "pre";
    document.getElementById("editor-area").setAttribute("placeholder", placeholder);
  }
  let newLengthLines = element.value.lineCount();
  let container = document.getElementById("container-lines");

  if(oldLengthLines == newLengthLines) return;

  element.style.height = (newLengthLines*17.2)+'px';

  for (let i = container.childNodes.length-1; i > -1; i--) {
    container.childNodes[i].remove();
  }
  for (let i = 0; i < element.value.lineCount(); i++) {
    let p = document.createElement("p");
    p.textContent = i+1;
    container.appendChild(p);
  }

  oldLengthLines = newLengthLines;
}