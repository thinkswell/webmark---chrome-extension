console.log("I am content and can manipulate....");

var webMarks = [];
const stylings = `width: 70px; height: 30px; position: absolute;background-color: #00d9ff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='30' viewBox='0 0 1000 120'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='6.9' stroke-opacity='0.98'%3E%3Cpath d='M-500 75c0 0 125-30 250-30S0 75 0 75s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 45c0 0 125-30 250-30S0 45 0 45s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 105c0 0 125-30 250-30S0 105 0 105s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 15c0 0 125-30 250-30S0 15 0 15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500-15c0 0 125-30 250-30S0-15 0-15s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3Cpath d='M-500 135c0 0 125-30 250-30S0 135 0 135s125 30 250 30s250-30 250-30s125-30 250-30s250 30 250 30s125 30 250 30s250-30 250-30'/%3E%3C/g%3E%3C/svg%3E");transform: translate(-50%, -50%);padding: 5px;box-sizing: border-box;
background-size: cover;display:flex; align-items: center; justify-content: flex-end;`;
const cutIcon = `cursor: pointer; font-size:20px;font-family: cursive;color: #ff2222; font-weight: 900;`;

(function () {
  console.log("Checking for existing webMarks....");

  if (window.localStorage[`webMark~${window.location.href}`]) {
    webMarks = JSON.parse(
      window.localStorage[`webMark~${window.location.href}`]
    );
  }

  if (webMarks.length > 0) {
    webMarks.forEach((webMark) => {
      console.log(webMark);
      const { webMarkX, webMarkY, id } = webMark;
      const mark = createMark();
      mark.style.left = webMarkX;
      mark.style.top = webMarkY;
      mark.setAttribute("id", id);
      document.body.appendChild(mark);

      mark.children[0].addEventListener("click", () => deleteMark(mark));

      console.log(mark);
    });
  }
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

  const mark = createMark();
  document.body.appendChild(mark);

  window.addEventListener("mousemove", dragMark);
  window.addEventListener("click", dropMark);
  mark.children[0].addEventListener("click", () => deleteMark(mark));

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

function createMark() {
  const mark = document.createElement("span");
  mark.setAttribute("style", stylings);
  mark.setAttribute("id", `webMark${Math.random() * webMarks.length + 1}`);
  mark.innerHTML = "<p>X</p>";
  mark.children[0].setAttribute("style", cutIcon);

  return mark;
}

function deleteMark(mark) {
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
