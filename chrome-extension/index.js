document.getElementById("btn-main").addEventListener('click', function(e) {
  e.preventDefault()
  const form = new FormData(document.getElementById('form'))
  console.log(form.getAll('checkbox'))
  // chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
  //   function(tabs){
  //     alert(tabs[0].url);
  //   }
  // );
})
