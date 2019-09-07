let toggle = false;

chrome.browserAction.onClicked.addListener(function() {
  toggle = !toggle;

  if (toggle) {
    chrome.browserAction.setIcon({path: 'assets/Logo_Echo_Media_02.png'});
  } else {
    chrome.browserAction.setIcon({path: 'assets/Logo_Echo_Media_01.png'});
  }

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, "toggle");
  });
});