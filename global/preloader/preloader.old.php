<!DOCTYPE html>
<?php 
  //if(check_smartphone()) return true; 
  //function check_smartphone() {
  //  $phone_array = array('iphone', 'android', 'pocket', 'palm', 'windows ce', 'windowsce', 'cellphone', 'opera mobi', 'ipod', 'small', 'sharp', 'sonyericsson', 'symbian', 'opera mini', 'nokia', 'htc_', 'samsung', 'motorola', 'smartphone', 'blackberry', 'playstation portable', 'tablet browser');
  //  $agent = strtolower($_SERVER['HTTP_USER_AGENT']);
  //  foreach ($phone_array as $value) {
  //    if (strpos($agent, $value) !== false) return true;
  //  }
  //  return false;
  //}
?>
<div id="preloader">
  <style>
    @keyframes pulse {
      0% {
        box-shadow: 0 0 0 0 rgba(220, 220, 220, 0.4);
      }
      70% {
        box-shadow: 0 0 0 8px rgba(220, 220, 220, 0);
      }
      100% {
        box-shadow: 0 0 0 0 rgba(220, 220, 220, 0);
      }
    }

    html, body {
      overflow: hidden;
    }

    #preloader .preloader {
      z-index: 1000000;
      background-color: #222;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      transition: 0.5s ease;
      opacity: 1;
    }

    #preloader .preloader.fade {
      opacity: 0;
    }

    #preloader .preloader img, .preloader svg  {
      position: fixed;
      width: 128px;
      height: 128px;
      top: calc(50vh - 64px);
      left: calc(50vw - 64px);
      animation: pulse 2s infinite;
    }

    #preloader .preloader #preloader-text,
    #preloader .preloader #preloader-loading  {
      font-family: monospace;
      font-weight: bold;
      color: #dcdce7;
      text-align: center;
      position: fixed;
      top: calc(50vh + 96px);
      width: 100%;
    }

    #preloader .preloader #preloader-text {
      top: calc(50vh + 64px);
      text-transform: uppercase;
      font-family: monospace;
    }

    #preloader .preloader .version {
      font-family: monospace;
      font-weight: bold;
      color: #b4b4e250;
      text-align: center;
      position: fixed;
      width: 100%;
      bottom: 0;
      z-index: 1000001;
    }
    
    @media (max-device-width: 512px) and (display-mode: browser) {
      #preloader-custom-svg, #preloader-custom-image {
        transform: scale(2);
      }
      #preloader .preloader #preloader-text,
      #preloader .preloader #preloader-loading {
        top: calc(50vh + 192px);
        font-size: 42px;
      }
      #preloader .preloader #preloader-text {
        top: calc(50vh + 128px);
      }
      #preloader .preloader .version {
        font-size: 32px;
      }
    }
  </style>
  <div class="preloader" name="preloader">
    <svg id="preloader-custom-svg">
      <rect x="0" y="0" width="128" height="128"></rect>
      <rect x="8" y="8" width="112" height="112" fill="#fff"></rect>
    </svg>
    <img id="preloader-custom-image" src="">
    <p id="preloader-text" name="text"></p>
    <p id="preloader-loading" name="text">|</p>
    <p class="version"><script> try { document.write(VERSION); } catch(err) {} </script></p>
  </div>
  <script>
    function GetFaviconHTML() {
      let nodeList = document.getElementsByTagName("link");
      for(let i = 0; i < nodeList.length; i++) {
        if((nodeList[i].getAttribute("rel") == "icon") || (nodeList[i].getAttribute("rel") == "shortcut icon")) {
          return nodeList[i].getAttribute("href");
        }
      }
      return false;
    }
    var SetPreloaderText = function(newText) {
      loading_queue.push(newText);
    }

    let favicon = GetFaviconHTML();
    if(favicon !== true) { 
      document.getElementById("preloader-custom-image").src = GetFaviconHTML();
    }
    else {
      document.getElementById("preloader-custom-image").remove();
    }

    let preload = document.getElementsByName("preloader")[0];
    const LOADING_SYMBOLS = ['/', '—', '\\', '|'];
    let loading_i = 0;

    let loading_queue = [];
    let loading_queue_i = 0;

    let loaded = false;

    let loading_text_id = setInterval(() => {
      if(loading_queue.length > 0 ) {
        if(loading_queue[loading_queue_i] == undefined) document.getElementById('preloader-text').innerText = loading_queue[loading_queue_i-1];
        else document.getElementById('preloader-text').innerText = loading_queue[loading_queue_i++];
      }
      if(loaded && loading_queue_i >= loading_queue.length) {
        loading_queue.length = 0;
        setTimeout(function() {
          preload.className += ' fade';
          setTimeout(function() {
            clearInterval(loading_symbols_id);
            clearInterval(loading_text_id);
            preload.style.display = 'none';
            try { document.getElementById("preloader").remove(); }
            catch(err) {  }
          }, 600);
        }, 600);
      }
    }, 450);

    let loading_symbols_id = setInterval(() => {
      document.getElementById('preloader-loading').innerText = LOADING_SYMBOLS[loading_i++];
      if(loading_i == LOADING_SYMBOLS.length) loading_i = 0;
    }, 250);

    window.addEventListener('load', function() {
      loaded = true;
    });
  </script>
</div>