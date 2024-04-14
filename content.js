let styleElement;

chrome.runtime.onMessage.addListener((message, sender, sendResponse)=> {
  if (message.type === 'update-style') {
    if (!styleElement) {
      styleElement = document.createElement('style');
      document.body.appendChild(styleElement);
    }
    styleElement.textContent = message.cssCode;
  }
});
