console.log("I am content and can manipulate....");

var webMarks = [];

var { localStorage, location } = window;

(function () {
  console.log("Checking for existing webMarks....");
})();

chrome.runtime.onMessage.addListener(recievedCmd);
function recievedCmd(message, sender, sendResponse) {
  if (message.text === "new") {
    console.log("To create NEW webmark");

    addWebmark();
  }
}

function addWebmark() {
  console.log("Creating Webmark.");

  const stylings =
    "width: 50px; height: 30px; position: absolute; background: #fff222;";
  const cutIcon = "cursor: pointer;position:absolute; top:-15px; right:-7px;";

  const mark = document.createElement("span");
  mark.setAttribute("style", stylings);
  mark.innerHTML = "<p>❌</p>";
  mark.children[0].setAttribute("style", cutIcon);
  mark.children[0].setAttribute("id", `webMark${webMarks.length + 1}`);

  document.body.appendChild(mark);

  window.addEventListener("mousemove", dragMark);
  window.addEventListener("click", dropMark);
  mark.children[0].addEventListener("click", deleteMark);

  function deleteMark() {
    mark.remove();
  }

  function dragMark(e) {
    mark.style.left = `${e.pageX}px`;
    mark.style.top = `${e.pageY}px`;
  }

  function dropMark(e) {
    window.removeEventListener("mousemove", dragMark);

    const webMark = {
      id: webMarks.length + 1,
      webMarkX: mark.style.left,
      webMarkY: mark.style.top,
    };

    webMarks.push(webMark);

    localStorage[`webMark~${location.href}`] = JSON.stringify(webMarks);

    window.removeEventListener("click", dropMark);
  }

  console.log(mark);
}
