chrome.runtime.onMessage.addListener(function(msg, sender){
  if(msg == "toggle"){
    toggle();
  }
})

url = location.href

const iframe = document.createElement('iframe');
iframe.src = `https://521d0aaf.ngrok.io?url=${url}`;
iframe.id = 'media-echo';  
iframe.style = `
right: 0;
position: fixed;
height: 100%;
background: #fff;
z-index: 10000;
top: 0;
box-shadow: -3px 0px 16px 2px #15151517;
border: none;
width: 0px;
`
document.body.appendChild( iframe );
  
function toggle(){
  if(iframe.style.width == "0px"){
    iframe.style.width="300px";
  }
  else{
    iframe.style.width="0px";
  }
}