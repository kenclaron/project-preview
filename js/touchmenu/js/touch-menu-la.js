var TouchMenuLA = function (options) {
  var self,
      defaults,
  menuClassName = '',
  mask,
  handle,
  menuHammer,
  maskHammer,
  newPos = 0,
  currentPos = 0,
  startPoint = 0,
  countStart = 0,
  velocity = 0.0;
  
    var TouchMenuLA = function () {
      self = this;

      defaults = {
        width: 720,
        zIndex: 100,
        disableSlide: false,
        handleSize: 400,
        disableMask: false,
        maxMaskOpacity: 0.25
      };

      if(document.body.clientWidth <= 1000 && document.body.clientWidth >= 720) defaults.width = document.body.clientWidth;
      else defaults.width = 720;
      
      window.addEventListener("load", this.editSize);
      window.addEventListener("resize", this.editSize);
      window.addEventListener("pointerdown", this.editSize);

      this.isVisible = false;
  
      this.initialize();
    };

    TouchMenuLA.prototype.editSize = function (e) {
      let width = 720;
      let is_alwaysfull = false;
      try { 
        is_alwaysfull = JSON.parse(localStorage.getItem("settings"))["main"]["always_full_menu"];
      }
      catch(err) {  }
      let is_small = document.body.clientWidth <= 1000;

      if(e === true || e === false || is_alwaysfull || is_small) {
        width = document.body.clientWidth;
      }
      else if(e === false || (e !== true && e !== false && !is_alwaysfull && is_small)) {
        width = document.body.clientWidth;
      }

      if(e === true || e === false) {
        if(e === true) {
          width = document.body.clientWidth;
        }
        else if(e === false) {
          width = 720;
        }
        else if (is_alwaysfull) {
          width = document.body.clientWidth;
        }
      }
      else if (is_alwaysfull) {
        width = document.body.clientWidth;
      }
      else {
        if(is_small) {
          width = document.body.clientWidth;
        }
        else {
          width = 720;
        }
      }

      if(is_small) {
        width = document.body.clientWidth;
      }

      defaults.width = width;
      options.width = width;

      options.target.style.width = defaults.width+"px";
      options.target.style.left = -(defaults.width)+"px";
      options.target.style.transform = "translateX("+defaults.width+"px)";
    }

    TouchMenuLA.prototype.editTransparencyMenu = function(transparentMode) {
      if(transparentMode) document.getElementById('settings').style.backgroundColor = 'rgba(15, 15, 20, 0.75)'; 
      else document.getElementById('settings').style.backgroundColor = 'rgba(15, 15, 20, 1)';
    }

    TouchMenuLA.prototype.editBlackoutMenu = function(blackoutMode) {
      if(blackoutMode) mask.style.opacity = 0.25; 
      else mask.style.opacity = 0;
    }

    TouchMenuLA.prototype.editExtendedMenu = function(extendedMode) {
      if(extendedMode) {
        let leftSide = document.getElementById("left-side");
        leftSide.style.width = 196 + "px";
        let rightSide = document.getElementById("right-side");
        rightSide.style.left = 164 + "px";
        rightSide.style.marginRight = 164 + "px";
        return true;
      }
      else {
        let leftSide = document.getElementById("left-side");
        leftSide.style.width = 32 + "px";
        let rightSide = document.getElementById("right-side");
        rightSide.style.left = 0 + "px";
        rightSide.style.marginRight = 0 + "px";
        return false;
      }
    }
  
    TouchMenuLA.prototype.setDefaultsOptions = function () {
      for (var key in defaults) {
        if (!options[key]) {
          options[key] = defaults[key];
        }
      }
    };
  
    TouchMenuLA.prototype.initElements = function () {
      options.target.style.display = "block";
      options.target.style.zIndex = options.zIndex;
      options.target.style.width = options.width + 'px';
      options.target.style.left = -options.width + 'px';
  
      handle = document.createElement('div');
      handle.className = "tmla-handle";
      handle.style.width = options.handleSize + 'px';
      handle.style.right = -options.handleSize + 20 + 'px';
      handle.style.zIndex = 255;
  
      options.target.appendChild(handle);
  
      if (!options.disableMask) {
        mask = document.createElement('div');
        mask.id = 'tmla-mask';
        document.body.appendChild(mask);
  
        maskHammer = new Hammer(mask, null);
      }
    };
  
    TouchMenuLA.prototype.touchStartMenu = function () {
      menuHammer.on('panstart panmove', function (ev) {
        if(ev.pointerType == "touch") {
          return false;
        }
        if(ev.pointerType == "mouse" || (ev.pointerType == "touch" && ev.target.classList.contains("tmla-handle"))) {
          newPos = currentPos + ev.deltaX;
        }
        self.changeMenuPos();
        velocity = Math.abs(ev.velocity);
      });
    };
  
    TouchMenuLA.prototype.animateToPosition = function (pos) {
      options.target.style.transform = 'translateX(' + pos + 'px)';
      options.target.style.WebkitTransform = 'translateX(' + pos + 'px)';
      options.target.style.MozTransform = 'translateX(' + pos + 'px)';
    };
  
    TouchMenuLA.prototype.changeMenuPos = function () {
      if (newPos <= options.width) {
        if(document.activeElement.type == "range" || document.activeElement.type == "textarea") {
          //nothing...
        }
        else {
          options.target.className = menuClassName + ' tmla-menu';
          this.animateToPosition(newPos);
    
          if (!options.disableMask) {
            this.setMaskOpacity(newPos);
          }
        }
      }
    };
  
    TouchMenuLA.prototype.setMaskOpacity = function (newMenuPos) {
      var opacity = parseFloat((newMenuPos / options.width) * options.maxMaskOpacity * JSON.parse(localStorage.getItem("settings"))["main"]["blackout_menu"]);
  
      mask.style.opacity = opacity;
  
      if (opacity === 0) {
        mask.style.zIndex = -1;
      } else {
        mask.style.zIndex = options.zIndex - 1;
      }
    };
  
    TouchMenuLA.prototype.touchEndMenu = function () {
      menuHammer.on('panend pancancel', function (ev) {
        if(ev.pointerType == "touch") {
          return false;
        }
        currentPos = ev.deltaX;
        self.checkMenuState(ev.deltaX);
      });
    };
  
    TouchMenuLA.prototype.eventStartMask = function () {
      maskHammer.on('panstart panmove', function (ev) {
        if(ev.pointerType == "touch") {
          return false;
        }
        if (ev.center.x <= options.width && self.isVisible) {
          countStart++;
  
          if (countStart == 1) {
            startPoint = ev.deltaX;
          }

          console.log("ev.deltaX", ev.deltaX);
          console.log("startPoint", startPoint);
  
          if (ev.deltaX < 0) {
            newPos = (ev.deltaX - startPoint) + options.width;
            console.log("newPos", newPos);
            self.changeMenuPos();
            velocity = Math.abs(ev.velocity);
          }
        }
      });
    };
  
    TouchMenuLA.prototype.eventEndMask = function () {
      maskHammer.on('panend pancancel', function (ev) {
        self.checkMenuState(ev.deltaX);
        countStart = 0;
      });
    };
  
    TouchMenuLA.prototype.clickMaskClose = function () {
      mask.addEventListener('click', function () {
        self.close();
      });
    };
  
    TouchMenuLA.prototype.checkMenuState = function (deltaX) {
      if (velocity >= 1.0) {
        if (deltaX >= 0) {
          self.open();
        } else {
          self.close();
        }
      } else {
        if (newPos >= 100) {
          self.open();
        } else {
          if(options.target.className.indexOf("opened") == -1)
          self.close();
        }
      }
    };
  
    TouchMenuLA.prototype.open = function () {
      options.target.className = menuClassName + " tmla-menu opened";
      this.animateToPosition(options.width);
  
      currentPos = options.width;
      this.isVisible = true;
      
      self.showMask();
      self.invoke(options.onOpen);
    };
  
    TouchMenuLA.prototype.close = function () {
      options.target.className = menuClassName + " tmla-menu closed";
      currentPos = 0;
      self.isVisible = false;
  
      self.hideMask();
      self.invoke(options.onClose);
    };
  
    TouchMenuLA.prototype.toggle = function () {
      if (self.isVisible) {
        self.close();
      } else {
        self.open();
      }
    };
  
    TouchMenuLA.prototype.showMask = function () {
      mask.className = "transition";
      mask.style.opacity = options.maxMaskOpacity * JSON.parse(localStorage.getItem("settings"))["main"]["blackout_menu"];
      mask.style.zIndex = options.zIndex - 1;
    };
  
    TouchMenuLA.prototype.hideMask = function () {
      mask.className = "transition";
      mask.style.opacity = 0;
      mask.style.zIndex = -1;
    };
  
    TouchMenuLA.prototype.setMenuClassName = function () {
      menuClassName = options.target.className;
    };
  
    TouchMenuLA.prototype.invoke = function (fn) {
      if (fn) {
        fn.apply(self);
      }
    };
  
    TouchMenuLA.prototype.initialize = function () {
      if (options.target) {
        menuHammer = Hammer(options.target, null);

        self.setDefaultsOptions();
        self.setMenuClassName();
        self.initElements();
  
        if (!options.disableSlide) {
          self.touchStartMenu();
          self.touchEndMenu();
          self.eventStartMask();
          self.eventEndMask();
        }
  
        if (!options.disableMask) {
          self.clickMaskClose();
        }
      } else {
        console.error('TouchMenuLA: The option \'target\' is required.');
      }
    };
  
    return new TouchMenuLA();
  };