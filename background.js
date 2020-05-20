console.log("I am background and active....");

chrome.browserAction.onClicked.addListener(getStarted);
function getStarted(tab) {
  console.log("Tab needs new webmark...");
  var msg = {
    text: "new",
  };
  chrome.tabs.sendMessage(tab.id, msg);
}
