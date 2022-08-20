<script>
console.log("[kmdesign.js] Version - 1.0");

let back_to_top = document.getElementsByClassName('back-to-top');
let open_menu = document.getElementsByClassName('open-menu');

if(back_to_top.length > 0) AddEventBackToTop();
if(open_menu.length > 0)   AddEventOpenMenu();

function AddEventBackToTop() {
  Array.prototype.forEach.call(back_to_top, function (b) {
    b.addEventListener('click', function() { 
      window.document.body.scrollTo(window.document.body.scrollLeft, 0); 
      window.document.getElementsByTagName("html")[0].scrollTo(window.document.body.scrollLeft, 0); 
    });
    window.addEventListener('scroll', function() { 
      if(window.document.body.scrollTop > 299 || window.document.getElementsByTagName("html")[0].scrollTop > 299) { 
        b.style.opacity = "0.25";
        b.style.pointerEvents = "all";
      }
      else {
        b.style.opacity = "0";
        b.style.pointerEvents = "none";
      }
    });
  });
}

function AddEventOpenMenu() {
  Array.prototype.forEach.call(open_menu, function (b) {
    b.addEventListener('click', function() { /* unknown */ });
  });
}
</script>