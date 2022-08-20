function ToggleFullScreen() {
  if (!document.fullscreenElement) {
    console.log("[fs-api.js] Request fullscreen-mode");
    if(document.body.requestFullscreen) {
      document.body.requestFullscreen();
    } else if(document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen();
    } else if(document.body.webkitRequestFullScreen) {
      document.body.webkitRequestFullScreen();
    }
  } else {
    console.log("[fs-api.js] Request window-mode");
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozExitFullScreen) {
      document.mozExitFullScreen();
    } else if(document.webkitExitFullScreen) {
      document.webkitExitFullScreen();
    }
  }
}