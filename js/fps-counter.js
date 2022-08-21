const COLORS_COUNTER = ["#f03535", "#f0f035", 
                        "#35c035", "#359090", 
                        "#3535c0", "#903590"];

/* create html */
let debug = document.getElementById("debug");

let DEBUG_ELEMENTS = {
  "FPS":      {},
  "MIN":      {},
  "FRAMES":   {},
  "SECONDS":  {},
  "MS/FRAME": {},
  "PROJECT":  {},
  "LINK":     {},
  "TIME":     {}
}

const DEBUG_DEFAULT = {
  "TIMES":            [],
  "COUNTS":           [],
  "COUNTS_N":         0,
  "COLORS_N":         0,
  "FPS":              0,
  "FRAMES":           0,
  "SECONDS":          0,
  "OLD_PERFORMANCE":  0,
  "MIN":              60
}

for(element in DEBUG_ELEMENTS) {
  let element_div = document.createElement("div");
  let element_p_text = document.createElement("p");
  let element_p_value = document.createElement("p");

  Object.defineProperty(DEBUG_ELEMENTS[element], "value", {value: element_p_value});

  element_div.classList.add("debug-element");
  element_div.classList.add("ripple");
  element_p_text.textContent = element;
  element_p_text.style.float = "left";
  element_p_value.style.float = "right";

  element_div.append(element_p_text);
  element_div.append(element_p_value);

  debug.append(element_div);
};

/*************/

let canvas_fps = document.createElement("canvas");
canvas_fps.width = 300;
canvas_fps.height = 30;

let ctx_fps = canvas_fps.getContext("2d");
ctx_fps.clearRect(0, 0, canvas_fps.width, canvas_fps.height);
ctx_fps.fillStyle = "#000"
debug.append(canvas_fps);

let DEBUG_CURRENT = DEBUG_DEFAULT;
let DEBUG_TIME_START = Date.now();

function ResetLoop() {
  DEBUG_CURRENT = DEBUG_DEFAULT;
  DEBUG_TIME_START = Date.now();
}

function FpsLoop() {
  window.requestAnimationFrame(() => {
    if(debug.style.display != "none") {
      DEBUG_CURRENT["SECONDS"] = (Date.now() - DEBUG_TIME_START)/1000;
      if(DEBUG_CURRENT["COUNTS_N"] == 0) {
        DEBUG_CURRENT["COLORS_N"]++;
      }
      ctx_fps.fillStyle = COLORS_COUNTER[DEBUG_CURRENT["COLORS_N"]];
      if(DEBUG_CURRENT["COLORS_N"] >= COLORS_COUNTER.length) DEBUG_CURRENT["COLORS_N"] = 0;
      for(let i = 0; i < DEBUG_CURRENT["COUNTS"].length; i++) {
        ctx_fps.clearRect(i*5.13, 30-(DEBUG_CURRENT["COUNTS"][i]/2), 5.13, -(60-DEBUG_CURRENT["COUNTS"][i]));
        ctx_fps.fillStyle = COLORS_COUNTER[DEBUG_CURRENT["COLORS_N"]];
        ctx_fps.fillRect(i*5.13, canvas_fps.height, 5.13, -DEBUG_CURRENT["COUNTS"][i]/2);
      }
      let now = performance.now();
      while (DEBUG_CURRENT["TIMES"].length > 0 && DEBUG_CURRENT["TIMES"][0] <= now - 1000) {
        DEBUG_CURRENT["TIMES"].shift();
      }
      DEBUG_CURRENT["TIMES"].push(now);
      DEBUG_CURRENT["COUNTS"][DEBUG_CURRENT["COUNTS_N"]++] = DEBUG_CURRENT["TIMES"].length;
      if(DEBUG_CURRENT["COUNTS_N"] > 59) {
        DEBUG_CURRENT["COUNTS"] = [];
        DEBUG_CURRENT["COUNTS_N"] = 0;
      }
      if(DEBUG_CURRENT["COUNTS"][0] != 1) {
        DEBUG_CURRENT["COUNTS"].forEach(el => {
          if(DEBUG_CURRENT["MIN"] > el) DEBUG_CURRENT["MIN"] = el;
        });
      }
      DEBUG_CURRENT["FPS"] = DEBUG_CURRENT["TIMES"].length;

      DEBUG_ELEMENTS["FPS"].value.textContent = DEBUG_CURRENT["FPS"];
      DEBUG_ELEMENTS["MIN"].value.textContent = DEBUG_CURRENT["MIN"];
      DEBUG_ELEMENTS["FRAMES"].value.textContent = DEBUG_CURRENT["FRAMES"]++;
      DEBUG_ELEMENTS["SECONDS"].value.textContent = DEBUG_CURRENT["SECONDS"];
      DEBUG_ELEMENTS["MS/FRAME"].value.textContent = Math.floor(now-DEBUG_CURRENT["OLD_PERFORMANCE"]);
      DEBUG_ELEMENTS["TIME"].value.textContent = new Date().toString().substr(0, 33);;

      try { DEBUG_ELEMENTS["PROJECT"].value.textContent = document.getElementById("title").textContent+" ["+projectId+"]"; }
      catch (err) {  }
      try { DEBUG_ELEMENTS["LINK"].value.textContent = "https://preview.kenclaron.ru/w/"+projectId; }
      catch (err) {  }
      DEBUG_CURRENT["OLD_PERFORMANCE"] = performance.now();
    }
    FpsLoop();
  });
}

FpsLoop();