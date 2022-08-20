let script = document.createElement("script");
script.src = "js/html2canvas.min.js";
document.getElementById("scripts").append(script);
script = document.createElement("script");
script.src = "js/download.js";
document.getElementById("scripts").append(script);

function TakeScreenshot() {
  html2canvas(FRAME.document.body).then(function(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.lineWidth = 8;
    ctx.strokeStyle = "black";
    ctx.strokeRect(4, 4, canvas.width-8, canvas.height-8);
    let img = canvas.toDataURL("image/png");
    download(img, "screenshot-"+projectId+"-"+Date.now()+".png", "image/png");
  });
}