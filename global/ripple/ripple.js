console.log("[ripple.js] Version - 1.0");

let a = document.getElementsByClassName('ripple');

window.addEventListener("load", function(e) {
  AddEventRipple();
});

function AddEventRipple() {
  Array.prototype.forEach.call(a, function (b) {
    b.addEventListener('click', CreateRipple);
  });
}

function CreateRipple (e) {
  let tar = e.target.tagName == "A" ? e.target : e.target.parentElement;

  if(tar.getAttribute("href") != null && tar.getAttribute("href") != "" && tar.getAttribute("href")[0] != "#" && tar.getAttribute("href")[0] != "#" && tar.getAttribute("href").startsWith("mailto:") == false) {
    e.preventDefault();
  }

  let circle = document.createElement('div');
  this.appendChild(circle);

  let d = Math.max(this.clientWidth, this.clientHeight);

  circle.style.width = circle.style.height = d + 'px';
  circle.style.transition = "all 0.05s ease-out !important;"

  let rect = this.getBoundingClientRect();
  circle.style.left = e.clientX - rect.left -d/2 + 'px';
  circle.style.top = e.clientY - rect.top - d/2 + 'px';

  circle.classList.add('ripple');

  setTimeout(() => {
    circle.remove();
  }, 1500);

  if(tar.getAttribute("href") != null && tar.getAttribute("href") != "" && tar.getAttribute("href")[0] != "#" && tar.getAttribute("href")[0] != "#" && tar.getAttribute("href").startsWith("mailto:") == false) {
    setTimeout(() => {
      if(tar.getAttribute("target") == "_blank") {
        window.open(tar.href, "_blank");
      }
      else {
        window.open(tar.href);
      }
    }, 500);
  }
}