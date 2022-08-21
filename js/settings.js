const TABLE_ELEMENTS = {
  "-1": "settings-list",
  "0": "content",
  "1": "projects-list",
  "2": "editor"
};
const FRAME = window.frames["animation"];

const url = new URL(window.location.href);
let projectId = null;

projectId = Number(String(url.searchParams.get("id")).replace(/\D+/g,""));
try { window.history.replaceState(null, null, window.location.href.replace("?i=1", "")); }
catch (err) { console.warn(err); }
try { window.history.replaceState(null, null, window.location.href.replace("?id="+projectId, "")); }
catch (err) { console.warn(err); }

if(projectId == null || projectId < 1) {
  console.log("[settings.js] ID - "+projectId);
  if(projectId == null) projectId = 1;
  else projectId = localStorage.getItem("lastProjectId");
  try { window.history.replaceState(null, null, window.location.href.split("index.html")[0].split("index.php")[0]); }
  catch (err) { console.warn(err); }
}

let project = {};
let files = {
  links: [],
  previews: [],
  names: [],
  downloads: [],
  steamworkshoplinks: []
};

SetPreloaderText("Creating List Projects");
CreateListProjects();
SetPreloaderText("Getting Settings Info");
GetSettingsInfo();
SetPreloaderText("Getting Project Info");
GetProjectInfo();

localStorage.setItem("lastProjectLink", window.location.href);
localStorage.setItem("lastProjectId", projectId);

SetPreloaderText("Creating Global Settings");
CreateSettingsProject(true);
SetPreloaderText("Creating Project's Settings");
CreateSettingsProject(false);
SetPreloaderText("Loading Settings");
SetMainSettings();

setInterval(() => {
  SetOpacityMenuButton();
}, 500);

// 
// if(true)
// {
//   document.getElementById("right-side").style.backgroundColor = "#1e1e23";
// }
// 

function ReplaceProject(id, event = undefined)
{
  if(event != undefined) {
    event.preventDefault();
  }
  
  window.history.replaceState(null, null, window.location.href.replace("/w/"+projectId, ""));
  projectId = id;
  project = {};
  files = {
    links: [],
    previews: [],
    names: [],
    downloads: [],
    steamworkshoplinks: []
  };

  try {
    RemoveListProjects()
    CreateListProjects();
    
    GetProjectInfo();
    
    localStorage.setItem("lastProjectLink", window.location.href);
    localStorage.setItem("lastProjectId", projectId);
    
    RemoveSettingsProjects(false);
    CreateSettingsProject(false);
    SetMainSettings();
    AddEventRipple();
  }
  catch(err)
  {
    console.log(err);
  }
  
  FRAME.code = document.getElementById('editor-area').value;
  FRAME.run(document.getElementById('editor-area').value);

  Other_SetDownloadLink();
  Other_SetSteamWorkshopLink();
}

function ResetSettings()
{
  localStorage.removeItem("lastProjectLink");
  localStorage.removeItem("lastProjectId");
  let temp_settings = JSON.parse(localStorage.getItem("settings"));
  temp_settings["main"] = undefined;
  localStorage.setItem("settings", JSON.stringify(temp_settings));
  window.location.reload();
}

function RemoveListProjects()
{
  for(let i = document.getElementById("projects-list").children.length-1; i > -1; i--) {
    if(document.getElementById("projects-list").children[i].className.indexOf("center-text") == -1) {
      document.getElementById("projects-list").children[i].remove();
    }
  }
}

function CreateListProjects()
{
  let request = new XMLHttpRequest();
  request.open("GET", "/projects/getFiles.php", false);
  request.send();
  files.links = request.responseText.split("\n");
  files.links = files.links.splice(0, files.links.length-1);
  files.links.sort(function(a,b) { 
    return a - b;
  });

  files.links.forEach(element => {
    let request_preview = new XMLHttpRequest();
    if(window.location.href.indexOf("/index.html") > -1 || window.location.href.indexOf("/index.php") > -1) {
      request_preview.open("GET", GetPathSite(true)+"projects/"+element+"/project.json?"+element, false);
    }
    else {
      request_preview.open("GET", GetPathSite(false)+"projects/"+element+"/project.json?"+element, false);
    }
    request_preview.send();
    
    if(request_preview.status == 200) {
      files.previews.push(JSON.parse(request_preview.responseText).preview);
      files.names.push(JSON.parse(request_preview.responseText).title);
      files.downloads.push(JSON.parse(request_preview.responseText).download);
      files.steamworkshoplinks.push(JSON.parse(request_preview.responseText).steamworkshoplink);
    }
    else {
      files.previews.push(undefined);
      files.names.push(undefined);
      files.downloads.push(undefined);
      files.steamworkshoplinks.push(undefined);
    }
  });

  for (let i = 0; i < files.links.length; i++) {
    if(files.links[i] == "editor") continue;
    let a = document.createElement("a");
    if((i+1) == projectId) a.className = "button-project-w new disabled ripple";
    else a.className = "button-project-w new ripple";
    a.href = files.links[i];
    // a.onclick = function(event) { event.preventDefault(); ReplaceProject(i+1, event); };

    let title = document.createElement("div");
    title.className = "title";
    title.textContent = files.names[i];
    
    let perms = document.createElement("div");
    perms.className = "perms";
    let text_perms = "[";
    if(files.downloads[i]) text_perms += "Download ";
    if(files.steamworkshoplinks[i] == "comingsoon") text_perms += "Steam-ComingSoon ";
    else if(files.steamworkshoplinks[i]) text_perms += "Steam ";
    text_perms += "]";

    let index = text_perms.length-2;
    if(text_perms[index] == " ") {
      text_perms = text_perms.substr(0, index) + text_perms.substr(index + 1);
    }
    text_perms = text_perms.replace(/ /g, ";");
    if(text_perms == "[]") text_perms = "";
    perms.textContent = text_perms;

    let img = document.createElement("img");
    img.className = "content-value";
    img.src = "/projects/"+files.links[i]+"/"+files.previews[i];
    img.textContent = files.links[i]; 

    a.append(title);
    a.append(perms);
    a.append(img);
    document.getElementById("projects-list").append(a);
  }
}

function OpenTable(to, button, from)
{ 
  if(from === undefined) from = 0;
  for(key in TABLE_ELEMENTS) {
    key = Number(key);
    document.getElementById(TABLE_ELEMENTS[key]).style.transform = "translateY("+((from-to+key)*100)+"%)";
  }
  let buttons = document.getElementsByName("table-button");
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].style = "";
  }
  button.style.backgroundColor = "#dc3232";
  console.log("[settings.js] Open - "+TABLE_ELEMENTS[to]);
}

function GetPathProjectJSON(index, onlyhref)
{
  if(projectId == null || projectId < 1) {
    if(projectId == null) projectId = 1;
    else projectId = localStorage.getItem("lastProjectId");
  }
  if(index) {
    if(onlyhref) {
      return window.location.href.split("/index.html")[0].split("/index.php")[0]+"/projects/"+projectId+"/";
    }
    else {
      return window.location.href.split("/index.html")[0].split("/index.php")[0]+"/projects/"+projectId+"/project.json?"+projectId+"_"+GetRandomSubId();
    }
  }
  else {
    if(onlyhref) {
      return window.location.href.split("/")[0]+"//"+window.location.href.split("/")[2]+"/projects/"+projectId+"/";
    }
    else {
      return window.location.href.split("/")[0]+"//"+window.location.href.split("/")[2]+"/projects/"+projectId+"/project.json?"+projectId+"_"+GetRandomSubId();
    }
  }
}

function GetPathSite(index)
{
  if(index) {
    return window.location.href.split("/index.html")[0].split("/index.php")[0]+"/";
  }
  else {
    return window.location.href.split("/")[0]+"//"+window.location.href.split("/")[2]+"/";
  }
}

function GetRandomSubId()
{
  return Math.round(Math.random()*1000000000);
}

function GetProjectInfo()
{
  console.log("[settings.js] ID - "+projectId);
  let request = new XMLHttpRequest();
  if(window.location.href.indexOf("/index.html") > -1 || window.location.href.indexOf("/index.php") > -1) 
    request.open("GET", GetPathProjectJSON(true, false), false);
  else {
    request.open("GET", GetPathProjectJSON(false, false), false);
  }
  request.send();
  
  if(request.status == 200) {
    project = JSON.parse(request.responseText);
    
    if(document.getElementById("animation").src.indexOf("editor") == -1 || projectId != "editor") {
      document.getElementById("animation").src = String(GetPathProjectJSON(true, true)+project.file+"?"+projectId+"_"+GetRandomSubId()).replace("//projects", "/projects");
    }
    
    document.title = project.title+" - Project Preview";
    document.getElementById("title").textContent = project.title;
    document.getElementById("preview-logo").src = "/projects/"+projectId+"/"+project.preview+"?"+projectId+"_"+GetRandomSubId();
    
    if(window.location.href.indexOf("index.html") > -1 || window.location.href.indexOf("/index.php") > -1) {
      try { window.history.replaceState(null, null, GetPathSite(true)+"w/"+projectId); }
      catch (err) { console.warn(err); }
    }
    else {
      try { window.history.replaceState(null, null, GetPathSite(false)+"w/"+projectId); }
      catch (err) { console.warn(err); }
    }

    Other_SetDownloadLink();
    Other_SetSteamWorkshopLink();

    console.log("[project.json] Status: 200 - OK");
  }
  else if(request.status == 404) {
    console.warn("[project.json] Status: 404 - Not Found");
    if(localStorage.getItem("lastProjectId") == null) projectId = 1;
    else projectId = localStorage.getItem("lastProjectId");
    GetProjectInfo()
  }
  else {
    console.warn("[project.json]", request.statusText);
    if(localStorage.getItem("lastProjectId") == null) projectId = 1;
    else projectId = localStorage.getItem("lastProjectId");
    GetProjectInfo()
  }
}

function GetSettingsInfo()
{
  let request = new XMLHttpRequest();
  request.open("GET", "settings.json?"+GetRandomSubId(), false);
  request.send();
  
  if(request.status == 200) {
    project_settings = JSON.parse(request.responseText);
    console.log("[settings.json] Status: 200 - OK");
  }
  else if(request.status == 404) {
    console.warn("[settings.json] Status: 404 - Not Found");
  }
  else {
    console.warn("[settings.json]", request.statusText);
  }
}

function RemoveSettingsProjects(settings)
{
  if(settings) return;
  for(let i = document.getElementById("sub-content").children.length-1; i > -1; i--) {
    if(document.getElementById("sub-content").children[i].className != "footer-content" && 
       document.getElementById("sub-content").children[i].classList[2] != "unselectable")
    {
      document.getElementById("sub-content").children[i].remove();
    }
  }
}

function CreateSettingsProject(settings)
{
  let file;
  if(settings) file = project_settings;
  else file = project;

  let childNumber = 0;
  for (element in file.general.properties) {
    if(element == "schemecolor") continue;
     
    let maindiv = document.createElement("div");
    maindiv.className = "settings-element ripple";
    if(element == "always_full_menu" || element == "extended_menu") {
      maindiv.className = "settings-element no-mobile ripple";
    }

    if(file.general.properties[element].blocked) {
      maindiv.classList.add("blocked");
    }
    
    let ptext = document.createElement("p");
    ptext.textContent = file.general.properties[element].text;
    ptext.className = "text";
    maindiv.append(ptext);
  
    if(file.general.properties[element].type == "slider") {
      let input = document.createElement("input");
      input.type = "range";
      input.name = element;
      input.min = file.general.properties[element].min;
      input.max = file.general.properties[element].max;
      input.value = file.general.properties[element].value;
  
      let min = document.createElement("p");
      let max = document.createElement("p");
      let current = document.createElement("p");
      let currentSymb1 = document.createElement("p");
      let currentSymb2 = document.createElement("p");
      min.textContent = file.general.properties[element].min;
      max.textContent = file.general.properties[element].max;
      current.classList.add("value")
      current.textContent = file.general.properties[element].value;
      currentSymb1.textContent = "[";
      currentSymb2.textContent = "]";
      currentSymb2.style.marginRight = "4px";
      
      input.addEventListener("input", function() { current.textContent = input.value; OneUpdateSettings(); FRAME.onresize(); } );
      
      let collapse = document.createElement("div");
      collapse.className = "collapse";

      collapse.append(max);
      collapse.append(input);
      collapse.append(min);
      collapse.append(currentSymb2);
      collapse.append(current);
      collapse.append(currentSymb1);
      maindiv.append(collapse);
    }
    else if(file.general.properties[element].type == "color") {
      let input = document.createElement("input");
      input.type = "color";
      input.name = element;
      input.value = GetColor(file.general.properties[element].value, true);
      input.addEventListener("input", function() { OneUpdateSettings(); FRAME.onresize(); });
      maindiv.append(input);
    }
    else if(file.general.properties[element].type == "combo") {
      let select = document.createElement("select");
      select.name = element;
      for(let i = 0; i < file.general.properties[element].options.length; i++) {
        let option = document.createElement("option");
        option.value = file.general.properties[element].options[i].value;
        option.textContent = file.general.properties[element].options[i].label;
        select.append(option); 
      }
      select.value = file.general.properties[element].value;
      select.addEventListener("input", function() { OneUpdateSettings(); FRAME.onresize(); });
      maindiv.append(select);
    }
    else if(file.general.properties[element].type == "bool") {
      let input = document.createElement("input");
      let rnd = Math.round(Math.random()*1000000000);
      input.type = "checkbox";
      input.name = element;
      input.id = element+"_"+rnd;
      input.checked = file.general.properties[element].value;
      input.addEventListener("input", function() { OneUpdateSettings(); FRAME.onresize(); });
      let label = document.createElement("label");
      label.htmlFor = element+"_"+rnd;
      label.innerHTML = "&#10004;";
      maindiv.append(input);
      maindiv.append(label);
    }
    else if(file.general.properties[element].type == "separator") {
      maindiv.classList.add("unselectable");
      let div = document.createElement("div");
      div.className = "separator";
      if(file.general.properties[element].value == "") {
        let hr = document.createElement("hr");
        div.append(hr);
      }
      else {
        let span = document.createElement("span");
        span.name = element;
        span.textContent = file.general.properties[element].value;
        div.append(span);
      }
      maindiv.append(div);
    }
    else if(project.general.properties[element].type == "file") {
      let select = document.createElement("select");
      select.name = element;
      
      let request = new XMLHttpRequest();
      request.open("GET", "/projects/getFiles.php?folder="+projectId+"/content/"+element, false);
      request.send();
      
      let infolder = request.responseText.split("\n");
      infolder = infolder.splice(0, infolder.length-1);

      for(let i = 0; i < infolder.length; i++) {
        let option = document.createElement("option");
        option.value = "content/"+element+"/"+infolder[i];
        option.textContent = infolder[i];
        select.append(option); 
      }
      select.value = file.general.properties[element].value;
      select.addEventListener("input", function() { OneUpdateSettings(); FRAME.onresize(); });
      maindiv.append(select);
    }
    if(settings) document.getElementById("settings-content").insertBefore(maindiv, document.getElementById("settings-content").children[childNumber++]); 
    else document.getElementById("sub-content").insertBefore(maindiv, document.getElementById("sub-content").children[childNumber++]);
  }
  if(projectId == "editor") {
    for(let i = 0; i < document.getElementsByName("for-editor-hidden").length; i++) {
      document.getElementsByName("for-editor-hidden")[i].style.display = "none";
    }
  }
  else {
    for(let i = 0; i < document.getElementsByName("for-editor-hidden").length; i++) {
      document.getElementsByName("for-editor-hidden")[i].style.display = "block";
    }
  }
  console.log("[settings.js] Settings was created");
}

function SetSettingsProject(standard)
{
  for (element in project.general.properties) {
    if(element == "schemecolor") continue;

    let value;

    if(standard) {
      value = project.general.properties[element].value;
      if(project.general.properties[element].type == "color") {
        value = GetColor(value, true);
      }
    }
    else {
      try { value = JSON.parse(localStorage.getItem("settings"))[projectId][element]; }
      catch (err) { console.warn(err);value = project.general.properties[element].value; }
    }

    if(project.general.properties[element].type == "color") {
      document.getElementsByName(element)[0].value = value;
    }
    else if(project.general.properties[element].type == "slider") {
      document.getElementsByName(element)[0].value = Number(value);
      for(let i = 0; i < document.getElementsByName(element)[0].parentElement.children.length; i++) {
        if(document.getElementsByName(element)[0].parentElement.children[i].classList.contains("value")) {
          document.getElementsByName(element)[0].parentElement.children[i].textContent = value;
        }
      }
    }
    else if(project.general.properties[element].type == "bool") {
      document.getElementsByName(element)[0].checked = value;
    }
    else if(project.general.properties[element].type == "file") {
      document.getElementsByName(element)[0].value = value;
    }
    else if(project.general.properties[element].type != "text") {
      document.getElementsByName(element)[0].value = value;
    }
  }
  OneUpdateSettings();
  FRAME.onresize();
  console.log("[settings.js] Settings was set");
}

function SetMainSettings(standard)
{
  for (element in project_settings.general.properties) {
    let value;

    try { value = JSON.parse(localStorage.getItem("settings"))["main"][element]; }
    catch (err) { console.warn(err); value = project_settings.general.properties[element].value; }

    if(project_settings.general.properties[element].type == "color" || 
       project_settings.general.properties[element].type == "file") {
      document.getElementsByName(element)[0].value = value;
    }
    else if(project_settings.general.properties[element].type == "slider") {
      document.getElementsByName(element)[0].value = Number(value);
      for(let i = 0; i < document.getElementsByName(element)[0].parentElement.children.length; i++) {
        if(document.getElementsByName(element)[0].parentElement.children[i].classList.contains("value")) {
          document.getElementsByName(element)[0].parentElement.children[i].textContent = value;
        }
      }
    }
    else if(project_settings.general.properties[element].type == "bool") {
      document.getElementsByName(element)[0].checked = value;
    }
    else if(project_settings.general.properties[element].type != "text" && 
            project_settings.general.properties[element].type != "separator") {
      document.getElementsByName(element)[0].value = value;
    }
  }
  console.log("[settings.js] Settings was set");
}

function ShowContent()
{
  TouchMenu.toggle();
}

function OneUpdateSettings()
{
  localStorage.setItem("settings", JSON.stringify(Object.assign(OneUpdateProjectSettings(), OneUpdateMainSettings())));
  try { FRAME.onresize(); }
  catch (err) { console.warn(err); }
  FRAME.onresize();
  console.log("[settings.js] Settings was updated");
}

function OneUpdateMainSettings()
{
  let obj = {main: {}};
  for (element in project_settings.general.properties) {
    if(project_settings.general.properties[element].type != "text" && 
       project_settings.general.properties[element].type != "separator") {
      let docElement = document.getElementsByName(element)[0];
      let value = docElement.value;
      if(project_settings.general.properties[element].type == "bool") {
        value = docElement.checked;
      }
      else if(project_settings.general.properties[element].type == "slider") {
        value = Number(docElement.value);
      }
      obj["main"][element] = value;
      eval(project_settings.general.properties[element].eval);
    }
  }
  return obj;
}

function OneUpdateProjectSettings()
{
  let obj = JSON.parse(localStorage.getItem("settings"));
  if(obj == null) obj = {};
  obj[projectId] = {};
  for (element in project.general.properties) {
    if(project.general.properties[element].type != "text" && element != "schemecolor") {
      try {
        let docElement = document.getElementsByName(element)[0];
        let value = docElement.value;
        if(project.general.properties[element].type == "bool") {
          value = docElement.checked;
        }
        else if(project.general.properties[element].type == "slider") {
          value = Number(docElement.value);
        }
        obj[projectId][element] = value;
        try { FRAME.SetValueSettings(element, value, project.general.properties[element].type); }
        catch (err) { console.warn(element, value, err); }
      }
      catch (err) { console.warn(element, err); }
    }
  }
  return obj;
}

function SetOpacityMenuButton()
{
  if(document.getElementById("settings").classList.contains("opened")) {
    document.getElementById("menu-button-click").style.opacity = 0.0;
    document.getElementById("menu-button-click").style.pointerEvents = "none";
  }
  else if (document.getElementById("settings").classList.contains("closed")) {
    document.getElementById("menu-button-click").style.opacity = JSON.parse(localStorage.getItem("settings"))["main"]["transparent_open_menu_button"] ? 0.0 : 1.0; //beta
    document.getElementById("menu-button-click").style.pointerEvents = "all";
  }
}

function GetColor(rawColorValue, toHex)
{
  let tColor = rawColorValue.split(' ');
  tColor = tColor.map(function(c) {
    return Math.ceil(c * 255);
  });
  if(toHex) return RgbToHex(tColor[0], tColor[1], tColor[2])
  else return tColor;
}

function ComponentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function RgbToHex(r, g, b) {
  return "#" + ComponentToHex(r) + ComponentToHex(g) + ComponentToHex(b);
}

function Other_SetDownloadLink() {
  if(project.download) {
    document.getElementById("download-project").href = "/download.php?id="+projectId;
    document.getElementById("download-project").style.display = "block";
  }
  else {
    document.getElementById("download-project").href = "";
    document.getElementById("download-project").style.display = "none";
  }
}

function Other_SetSteamWorkshopLink() {
  if(project.steamworkshoplink == "comingsoon") {
    document.getElementById("steam-workshop-link").href = "";
    document.getElementById("steam-workshop-link").style.display = "block";
    document.getElementById("steam-workshop-link").textContent = "Steam Workshop [Coming Soon]";
    document.getElementById("steam-workshop-link").classList.add("blocked");
  }
  else if(!project.steamworkshoplink) {
    document.getElementById("steam-workshop-link").href = "";
    document.getElementById("steam-workshop-link").style.display = "none";
    document.getElementById("steam-workshop-link").textContent = "Steam Workshop";
    document.getElementById("steam-workshop-link").classList.remove("blocked");
  }
  else {
    document.getElementById("steam-workshop-link").href = project.steamworkshoplink;
    document.getElementById("steam-workshop-link").style.display = "block";
    document.getElementById("steam-workshop-link").textContent = "Steam Workshop";
    document.getElementById("steam-workshop-link").classList.remove("blocked");
  }
}