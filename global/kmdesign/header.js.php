<script>
let lastScrollTop = 0;
var HEADER = document.getElementById("bar-header");

window.addEventListener("scroll", function(e) {
    let diff = lastScrollTop - window.pageYOffset;
    let currentHeaderTop = GetNumberPixels();
    HEADER.style.top = currentHeaderTop + diff + "px";

    if(GetNumberPixels() < -1 * HEADER.clientHeight) HEADER.style.top = -1 * HEADER.clientHeight + "px";
    else if(GetNumberPixels() > 0) HEADER.style.top = 0 + "px";

    lastScrollTop = window.pageYOffset;
});

function GetNumberPixels() {
    return Number(HEADER.style.top.replace("px", ""));
}
</script>