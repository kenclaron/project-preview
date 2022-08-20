console.log("[ripple.js] Version - 1.1 (for Project Preview)");

var a = document.getElementsByClassName('ripple');

window.addEventListener("load", function(e) {
  AddEventRipple();
});

function AddEventRipple() {
  Array.prototype.forEach.call(a, function (b) {
    b.addEventListener('click', CreateRipple);
  });
}

function CreateRipple (e) {
  var circle = document.createElement('div');
  this.appendChild(circle);

  var d = Math.max(this.clientWidth, this.clientHeight);

  circle.style.width = circle.style.height = d + 'px';
  circle.style.transition = "all 0.05s ease-out !important;"

  var rect = this.getBoundingClientRect();
  circle.style.left = e.clientX - rect.left -d/2 + 'px';
  circle.style.top = e.clientY - rect.top - d/2 + 'px';

  circle.classList.add('ripple');

  setTimeout(() => {
    circle.remove();
  }, 1500);
}