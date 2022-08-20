<!DOCTYPE html>
<div id="preloader">
  <style>
    @keyframes left-symbol {
      from { transform: translateY(-100vh);  }
      30% { transform: translateY(25px); }
      45% { transform: translateY(0); }
      60% { transform: scale(1.5); }
      to { transform: scale(1); }
    }
    @keyframes right-symbol {
      from { transform: translateY(100vh); }
      30% { transform: translateY(-25px); }
      45% { transform: translateY(0); }
      60% { transform: scale(1.5); }
      to { transform: scale(1); }
    }

    @keyframes left-shadow {
      from { opacity: 0; transform: translate(-50%, -50%) skewY(16deg); }
      30% { opacity: 0; transform: translate(-50%, -50%) skewY(16deg); }
      45% { opacity: 0; transform: translate(-50%, -50%) skewY(16deg); }
      60% { opacity: 1; transform: translate(calc(-50% - 4px), calc(-50% - 1px)) scale(1.4) skewY(16deg); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(0.95) skewY(16deg); }
    }

    @keyframes right-shadow {
      from { opacity: 0; transform: translate(-50%, -50%) skewY(-20deg); }
      30% { opacity: 0; transform: translate(-50%, -50%) skewY(-20deg); }
      45% { opacity: 0; transform: translate(-50%, -50%) skewY(-20deg); }
      60% { opacity: 1; transform: translate(calc(-50% + 4px), calc(-50% + 1px)) scale(1.4) skewY(-20deg); }
      to { opacity: 1; transform: translate(-50%, -50%) scale(0.95) skewY(-20deg); }
    }

    html, body {
      overflow: hidden;
    }

    #preloader .preloader {
      z-index: 1000000;
      background-color: #111;
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

    #preloader-custom {
      width: 128px;
      height: 128px;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      position: relative;
    }

    #preloader #right-symbol {
      animation: 2s right-symbol forwards;
    }

    #preloader #left-symbol {
      animation: 2s left-symbol forwards;
    }

    #preloader .left-shadow {
      position: absolute;
      left: 51px;
      top: 58px;
      width: 34px;
      height: 94px;
      box-shadow: 0 0 20px 0 #ff0000;
      transform: translate(-50%, -50%) skewY(16deg);
      animation: 2s left-shadow forwards;
    }

    #preloader .right-shadow {
      position: absolute;
      right: 11px;
      top: 70px;
      width: 37px;
      height: 96px;
      box-shadow: 0 0 20px 0 #f2f2f2;
      transform: translate(-50%, -50%) skewY(-20deg);
      animation: 2s right-shadow forwards;
    }
    
    @media (max-device-width: 512px) and (display-mode: browser) {
      #preloader-custom {
        width: 128px;
        height: 128px;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%) scale(3.5);
        position: relative;
      }
      #preloader .preloader #preloader-text,
      #preloader .preloader #preloader-loading {
        top: 70vh;
        font-size: 42px;
      }
      #preloader .preloader #preloader-text {
        top: 50vh;
      }
      #preloader .preloader .version {
        font-size: 32px;
      }
    }
  </style>
  <div class="preloader" name="preloader">
    <div id="preloader-custom">
      <div class="left-shadow"></div>
      <div class="right-shadow"></div>
      <svg class="preloader-custom-svg" id="left-symbol">
        <polygon points="34,0 34,100 69,110 69,10" fill="#f23232" />
      </svg>
      <svg class="preloader-custom-svg" id="right-symbol">
        <polygon points="59,25 59,125 99,110 99,10" fill="#f2f2f2" />
      </svg>
    </div>
    <p id="preloader-text" name="text"></p>
    <p id="preloader-loading" name="text">|</p>
    <p class="version"><script> try { document.write(VERSION); } catch(err) {} </script></p>
  </div>
  <script>
    const LOADING_SYMBOLS = ['/', '—', '\\', '|'];

    var SetPreloaderText = function(newText) {
      loading_queue.push(newText);
    }

    let preload = document.getElementsByName("preloader")[0];
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