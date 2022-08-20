<!DOCTYPE html>
<html>
<head>
  <!-- Information -->
  <title>Project Preview</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf8" />
  <meta name="description" content="Project Preview. Preview wallpapers by KenClaron. Like Wallpaper Engine, only in your browser">
  <link rel="icon" href="/global/content/favicons/preview.kenclaron.png">
  <!-- End Information -->
  
  <!-- Local Stylesheets -->
  <link rel="stylesheet" href="/css/settings.css">
  <link rel="stylesheet" href="/css/editor.css">
  <link rel="stylesheet" href="/js/touchmenu/css/touch-menu-la.css">
  <!-- End Local Stylesheets -->

  <!-- Global Stylesheets -->
  <link rel="stylesheet" href="/global/root.css">
  <link rel="stylesheet" href="/global/ripple/ripple.css">
  <link rel="stylesheet" href="/global/kmdesign/kmdesign.css">
  <link rel="stylesheet" href="/global/kmdesign/scrollbar.css">
  <!-- End Global Stylesheets -->

  <!-- Color -->
  <meta name="yandex-tableau-widget" content="logo=/global/content/favicons/preview.kenclaron.png, color=#ff3030" />
  <meta name="theme-color" content="#ff3030">
  <!-- End Color -->

  <!-- Local Scripts -->
  <script src="js/fs-api.js"></script>
  <!-- End Local Scripts -->

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://preview.kenclaron.ru">

  <meta property="og:site_name" content="preview.kenclaron.ru">
  <meta property="og:title" content="Project Preview">
  <meta property="og:description" content="Preview wallpapers by KenClaron. Like Wallpaper Engine, only in your browser">

  <meta property="og:image" content="/global/content/open-graph/preview.kenclaron.png">
  <meta property="og:image:width" content="1024" />
  <meta property="og:image:height" content="1024" />
  <!-- End Open Graph -->
</head>
<body>
  <script>const VERSION = "PROJECT PREVIEW - 2.0.0";</script>
  <?php 
    echo file_get_contents("./global/preloader/preloader.php");
  ?>

  <script id="iframe-preview-script">
    function LoadIframe() 
    {
      if(projectId == "editor") {
        FRAME.code = document.getElementById('editor-area').value;
        OneUpdateSettings();
        document.getElementById("iframe-preview-script").remove();
        return;
      }

      console.log("[main] Load iframe");

      try { 
        if(localStorage.getItem("settings") && JSON.parse(localStorage.getItem("settings"))[projectId] != undefined) { 
          SetSettingsProject(false); 
        }
        else {
          SetSettingsProject(true);
        }
        OneUpdateSettings();
        document.getElementById("iframe-preview-script").remove();
      }
      catch (err) { console.warn(err); }
    }
  </script>
  
  <iframe id="animation" name="animation" src="" onload="LoadIframe()">iframe not working on this device</iframe>
  
  <div id="settings" class="touch-menu-la tmla-menu" style="display: none;">
    <div id="right-side">
      <div id="settings-list" style="transform: translateY(-100%);">
        <div class="center-text ripple">
          <span>SETTINGS</span>
        </div>
        <div id="settings-content">
          <div class="footer-content">
            <a class="ripple" onclick="TakeScreenshot()">Take a Screenshot</a>
            <a class="ripple" onclick="ResetSettings()">Reset Settings</a>
            <a class="ripple" href="https://www.donationalerts.com/r/kenclaron" target="_blank" style="background-color: #F57507">Donate</a>
          </div>
          <div class="footer-content bottom-content">
            <p><a href="https://github.com/kenclaron">Created by Dmitry Britov</a> - <script>document.write(VERSION);</script> - PageSpeed Insights: 47 ~ 81</a></p>
          </div>
        </div>
      </div>
      <div id="content" style="transform: translateY(0%);">
        <div class="center-text">
          <canvas id="backlogo"></canvas>
          <img id="preview-logo" alt="logo" width="128" height="128">
          <br>
          <span id="title">${project.title}</span>
          <br>
        </div>
        <br>
        <div name="for-editor-hidden" class="settings-element ripple unselectable"><p class="text"></p><div class="separator"><hr></div></div>
        <div name="for-editor-hidden" id="sub-content">
          <div class="settings-element ripple unselectable"><p class="text"></p><div class="separator"><hr></div></div>
          <div class="footer-content">
            <a onclick="SetSettingsProject(true)" class="ripple">Reset Settings</a>
            <a id="download-project" class="ripple">Download</a>
            <a id="steam-workshop-link" class="ripple" target="_blank">Steam Workshop</a>
          </div>
        </div>
      </div>
      <div id="projects-list" style="transform: translateY(100%);">
        <div class="center-text ripple">
          <span>PROJECTS LIST</span>
        </div>
      </div>
      <div id="editor" style="transform: translateY(200%);">
        <div class="center-text ripple">
          <span>EDITOR</span>
        </div>
        <br>
        <div class="container">
          <div id="container-lines" class="container-lines">
            <p>1</p>
          </div>
          <textarea name="editor-area" id="editor-area" cols="30" rows="10" onkeypress="ResizeEditor(this);" onkeyup="ResizeEditor(this);" onkeydown="ResizeEditor(this);"></textarea>
        </div>
        <div class="footer-content">
          <br>
          <a onclick="ReplaceProject('editor');" class="ripple">Launch The Code</a>
          <div class="settings-element ripple" style="margin-left: 0;"><p class="text" style="text-transform: none">t: Elapsed time in seconds</p></div>
          <div class="settings-element ripple" style="margin-left: 0;"><p class="text" style="text-transform: none">S: Shorthand for Math.sin</p></div>
          <div class="settings-element ripple" style="margin-left: 0;"><p class="text" style="text-transform: none">C: Shorthand for Math.cos</p></div>
          <div class="settings-element ripple" style="margin-left: 0;"><p class="text" style="text-transform: none">T: Shorthand for Math.tan</p></div>
          <div class="settings-element ripple" style="margin-left: 0;"><p class="text" style="text-transform: none">R: Function that generates rgba-strings, usage ex.: R(255, 255, 255, 0.5)</p></div>
          <div class="settings-element ripple" style="margin-left: 0;"><p class="text" style="text-transform: none">c: A canvas</p></div>
          <div class="settings-element ripple" style="margin-left: 0;"><p class="text" style="text-transform: none">x: A 2D context for that canvas</p></div>
        </div>
      </div>
    </div>
    <div id="left-side">
      <div name="table-button" class="ripple" onclick="OpenTable(-1, this)">
        <p>MAIN SETTINGS</p>
        <svg viewBox="-2 -2 24 24">
          <path d="M17.4 11 C17.4 10.7 17.5 10.4 17.5 10 C17.5 9.6 17.5 9.3 17.4 9 L19.5 7.3 C19.7 7.1 19.7 6.9 19.6 6.7 L17.6 3.2 C17.5 3.1 17.3 3 17 3.1 L14.5 4.1 C14 3.7 13.4 3.4 12.8 3.1 L12.4 0.5 C12.5 0.2 12.2 0 12 0 L8 0 C7.8 0 7.5 0.2 7.5 0.4 L7.1 3.1 C6.5 3.3 6 3.7 5.4 4.1 L3 3.1 C2.7 3 2.5 3.1 2.3 3.3 L0.3 6.8 C0.2 6.9 0.3 7.2 0.5 7.4 L2.6 9 C2.6 9.3 2.5 9.6 2.5 10 C2.5 10.4 2.5 10.7 2.6 11 L0.5 12.7 C0.3 12.9 0.3 13.1 0.4 13.3 L2.4 16.8 C2.5 16.9 2.7 17 3 16.9 L5.5 15.9 C6 16.3 6.6 16.6 7.2 16.9 L7.6 19.5 C7.6 19.7 7.8 19.9 8.1 19.9 L12.1 19.9 C12.3 19.9 12.6 19.7 12.6 19.5 L13 16.9 C13.6 16.6 14.2 16.3 14.7 15.9 L17.2 16.9 C17.4 17 17.7 16.9 17.8 16.7 L19.8 13.2 C19.9 13 19.9 12.7 19.7 12.6 L17.4 11 L17.4 11 Z M10 13.5 C8.1 13.5 6.5 11.9 6.5 10 C6.5 8.1 8.1 6.5 10 6.5 C11.9 6.5 13.5 8.1 13.5 10 C13.5 11.9 11.9 13.5 10 13.5 L10 13.5 Z"/>
        </svg>
      </div>
      <div name="table-button" class="ripple" style="background-color: #dc3232;" onclick="OpenTable(0, this)">
        <p>PROJECT'S SETTINGS</p>
        <svg viewBox="-2 -2 28 28">
          <path d="M12 1.7L1 10.5V24h22V10.5L12 1.7z M21 22H3V11.5l9-7.2l9 7.2V22z M6 19h12v-2H6V20z M6 16h12v-2H6V20z"/>
        </svg>
      </div>
      <div name="table-button" class="ripple" onclick="OpenTable(1, this)">
        <p>PROJECTS LIST</p>
        <svg viewBox="-2 -2 36 36">
          <path d="M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z"/>
        </svg>
      </div>
      <div name="table-button" class="ripple only-pc" onclick="OpenTable(2, this)">
        <p>EDITOR</p>
        <svg viewBox="0 0 32 32" style="margin: 2px;">
          <path d="M24 12H8v2h15h1V12z M28 15.518V4H4v24h11.518c1.614 2.411 4.361 3.999 7.482 4c4.971-0.002 8.998-4.029 9-9 C31.999 19.879 30.411 17.132 28 15.518z M15.517 18c-0.412 0.616-0.743 1.289-0.994 2H8v2h6.058C14.022 22.329 14 22.661 14 23 c0 1.054 0.19 2.061 0.523 3H6V6h20v8.523C25.061 14.19 24.054 14 23 14c-2.143 0-4.107 0.751-5.652 2H8v2H15.517z M23 29.883 c-3.801-0.009-6.876-3.084-6.885-6.883c0.009-3.801 3.084-6.876 6.885-6.884c3.799 0.008 6.874 3.083 6.883 6.884 C29.874 26.799 26.799 29.874 23 29.883z"/>
          <polygon points="22,27 19,27 19,24  "/>
          <rect height="4.243" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 56.5269 20.5858)" width="7.071" x="20.464" y="19.879"/>
        </svg>
      </div>
      <div class="ripple only-pc" onclick="ToggleFullScreen()">
        <p>FULLSCREEN MODE</p>
        <svg viewBox="-2 -2 36 36">
          <path d="M20 8l8 8V8H20z M4 24h8l-8-8V24z"/>
          <path d="M32 28V4H0v24h14v2H8v2h16v-2h-6v-2H32z M2 26V6h28v20H2z"/>
        </svg>
      </div>
      <div class="ripple" onclick="TouchMenu.toggle()" style="position: absolute; bottom: 0; left: 0; width: 100%;">
        <p>CLOSE MENU</p>
        <svg viewBox="4 4 42 42">
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z"/>
        </svg>
      </div>
    </div>
  </div>

  <a id="menu-button-click" class="ripple kmbutton kmside-left open-menu kmside-bottom" onclick="TouchMenu.toggle()"></a>

  <div id="debug">
    <style>
      #debug {
        position: fixed; 
        display: none;
        right: 0; 
        bottom: 0; 
        z-index: 10000; 
        user-select: none;
        -moz-user-select: none;
        margin-right: 6px;
        pointer-events: none;
      }

      #debug div.debug-element {
        width: 100%;
        min-width: 300px;
        height: 16px;
      }

      #debug div.debug-element:hover {
        background-color: #00000075;
      }

      #debug p {
        font-family: monofonto;
        color: #dcdce7;
        text-shadow: -1px -1px 5px #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        text-transform: uppercase;
        text-align: right;
        margin: 0 auto;
      }

      @media (max-device-width: 512px) and (display-mode: browser) {
        #debug {
          transform: scale(2) translate(-30%, -30%);
        }
      }
    </style>
  </div>

  <div id="scripts">
    <script src="js/hammerjs/hammer.min.js"></script>
    <script src="js/touchmenu/js/touch-menu-la.js"></script>
    <script>
      var TouchMenu = TouchMenuLA({ target: document.getElementById('settings') });
      TouchMenu.close();
      console.log("[main] TouchMenu was created");
    </script>
    <script src="js/click-logo.js"></script>
    <script src="js/fps-counter.js"></script>
    <script src="js/capture-canvas.js"></script>
    <script src="js/editor.js"></script>
    <script src="js/settings.js"></script>
    <script src="/global/ripple/ripple-preview.js?1"></script>
  </div>
</body>
</html>