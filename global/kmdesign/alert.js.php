<script>
  console.log("[alert.js] Version - 1.0b");

  window.alert = KAlert;
  const FUNCEXIT = "kmcontaineralert.remove(); document.body.style.overflow = 'auto';"
  function KAlert(...message) {

    // Create main DOM-elements
    let kmcontaineralert = document.createElement("div");
    kmcontaineralert.id = "kmcontaineralert";

    let kmmainalert = document.createElement("div");
    kmmainalert.id = "kmmainalert";

    let kmalertheader = document.createElement("div");
    kmalertheader.id = "kmalertheader";

    let kmalertcontent = document.createElement("div");
    kmalertcontent.id = "kmalertcontent";

    let kmalertfooter = document.createElement("div");
    kmalertfooter.id = "kmalertfooter";

    // Create header's DOM-elements
    let kmclosebutton = document.createElement("a");
    kmclosebutton.setAttribute("onclick", FUNCEXIT);
    kmclosebutton.textContent = "✕";

    let kmalerttitle = document.createElement("p");
    kmalerttitle.id = "kmalerttitle";

    // Create content's DOM-elements
    let kmalerttext = document.createElement("span");
    kmalerttext.id = "kmalerttext";

    message.forEach(element => {
      kmalerttext.innerHTML += element;
      if(element != message[message.length-1]) {
        kmalerttext.innerHTML += " ";
      }
    });

    // Create footer's DOM-elements
    let kmalertlink = document.createElement("a");
    kmalertlink.setAttribute("onclick", FUNCEXIT);
    kmalertlink.className = "kmalertlinks";
    kmalertlink.textContent = "Закрыть"

    // Append main DOM-elements
    kmcontaineralert.append(kmmainalert);
    kmmainalert.append(kmalertheader);
    kmmainalert.append(kmalertcontent);
    kmmainalert.append(kmalertfooter);

    // Append header's DOM-elements
    kmalertheader.append(kmclosebutton);
    kmalertheader.append(kmalerttitle);

    // Append content's DOM-elements
    kmalertcontent.append(kmalerttext);

    // Append footer's DOM-elements
    kmalertfooter.append(kmalertlink);

    // Append KMAlert to body
    document.body.append(kmcontaineralert);

    // Disable overflow in body element
    document.body.style.overflow = "hidden";
  }
</script>