console.log("I am content and can manipulate....");

var webMarks = [];
const stylings =
  "width: 50px; height: 30px; position: absolute; background: #fff222;";
const cutIcon = "cursor: pointer;position:absolute; top:-15px; right:-7px;";

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

  const mark = document.createElement("span");
  mark.setAttribute("style", stylings);
  mark.setAttribute("id", `webMark${Math.random() * webMarks.length + 1}`);
  mark.innerHTML = "<p>❌</p>";
  mark.children[0].setAttribute("style", cutIcon);

  document.body.appendChild(mark);

  window.addEventListener("mousemove", dragMark);
  window.addEventListener("click", dropMark);
  mark.children[0].addEventListener("click", deleteMark);

  function deleteMark() {
    console.log(mark.id);

    let newWebMarks = JSON.parse(
      window.localStorage[`webMark~${window.location.href}`]
    );

    newWebMarks = newWebMarks.filter((webMark) => webMark.id !== mark.id);
    window.localStorage[`webMark~${window.location.href}`] = JSON.stringify(
      newWebMarks
    );
    console.log(newWebMarks);

    webMarks = [...newWebMarks];

    mark.remove();
  }

  function dragMark(e) {
    mark.style.left = `${e.pageX}px`;
    mark.style.top = `${e.pageY}px`;
  }

  function dropMark(e) {
    window.removeEventListener("mousemove", dragMark);

    const webMark = {
      id: mark.id,
      webMarkX: mark.style.left,
      webMarkY: mark.style.top,
    };

    webMarks.push(webMark);

    window.localStorage[`webMark~${window.location.href}`] = JSON.stringify(
      webMarks
    );

    window.removeEventListener("click", dropMark);
  }

  console.log(mark);
}
