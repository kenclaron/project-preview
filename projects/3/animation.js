//BACKGROUND TYPE
var btype = 1;

//UI
var UIRightTop = document.getElementById("right-top");
var UILeftBottom = document.getElementById("left-bottom");

//UI TV
var DeptElement = document.getElementById("dept-element");
var DeptHeader = document.getElementById("dept-header");
var DeptMain = document.getElementById("dept-main");

//APPLY USER PROPERTIES WALLPAPER ENGINE
window.wallpaperPropertyListener = {
	applyUserProperties: function (properties) {
    //ON/OFF TV-ELEMENTS
    if(properties.tvelements) {
      if(properties.tvelements.value) {
        UIRightTop.style.opacity = 1;
        UILeftBottom.style.opacity = 1;
      }
      else {
        UIRightTop.style.opacity = 0;
        UILeftBottom.style.opacity = 0;
      }
    } 
    //SWITCH BACKGROUND TYPE (btype)
    if(properties.backgroundtype) {
      btype = properties.backgroundtype.value;
      //SOLID COLOR
      if(btype == 1) {
        var customColor = properties.backgroundcolor.value.split(' ');
        customColor = customColor.map(function(c) {
          return Math.ceil(c * 255); //GET (255, 255, 255)-TYPED STRING
        });
        document.body.style.background = "rgb(" + customColor + ")";
      }
      //IMAGE/GIF
      if(btype == 2) {
        if(properties.backgroundfile.value == "") {
          document.body.style.background = "#fff url(back.gif) no-repeat center";
          document.body.style.backgroundSize = "110%";
        }
        else {
          document.body.style.background = "#fff url(file://" + properties.backgroundfile.value + ") no-repeat center";
        }
      }
    } 
    //CHOOSE SOLID COLOR (if btype == 1)
    if(properties.backgroundcolor) {
      if(btype == 1) {
        var customColor = properties.backgroundcolor.value.split(' ');
        customColor = customColor.map(function(c) {
          return Math.ceil(c * 255); //GET (255, 255, 255)-TYPED STRING
        });
        document.body.style.background = "rgb(" + customColor + ")";
      }
    }
    //CHOOSE IMAGE/GIF (if btype == 2)
    if(properties.backgroundfile) {
      if(btype == 2) {
        if(properties.backgroundfile.value == "") {
          document.body.style.background = "#fff url(back.gif) no-repeat center";
          document.body.style.backgroundSize = "110%";
        }
        else {
          document.body.style.background = "#fff url(file://" + properties.backgroundfile.value + ") no-repeat center";
        }
      }
    }
  }
}

function onLoad()
{
  //CREATE INTERVAL FOR UPDATE NUMBER
  setInterval(function() {
    //GET DATE
    var date = new Date(1988, 0, 1);
    //GET CURRENT DEBT AND SEPARATED BY A COMMA
    var time = Math.round((Date.now() - (+date))*40.0003085/1.8045).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    //SHOW CURRENT DEBT
    DeptMain.firstChild.textContent = "$" + time;
  }, 57);
}

//SET FUNCTION
window.onload = function() {
  onLoad();
};