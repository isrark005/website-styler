let injectedStyleElement;

document.addEventListener('DOMContentLoaded', function () {
    let applyCssButton = document.getElementById('apply-css-button');
    let cssEditorTextarea = document.getElementById('css-editor');
    let injectExistingStyleCheckbox = document.getElementById('inject-existing-style-checkbox');

    applyCssButton.addEventListener('click', function () {
        let cssCode = cssEditorTextarea.value;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { type: 'update-style', cssCode: cssCode });
        });
    });

    injectExistingStyleCheckbox.addEventListener('change', function () {
        if (this.checked) {
            injectExistingStyle(); 
        } else {
            if (injectedStyleElement) {
                injectedStyleElement.parentNode.removeChild(injectedStyleElement);
                injectedStyleElement = null; // Clear reference
              }
        }
    });
});

function injectExistingStyle() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let activeTab = tabs[0];
        chrome.scripting.executeScript({ 
            target: { tabId: activeTab.id },
            func: () => {
                const style = document.createElement('style');
                style.setAttribute("class", "outline-reference")
                style.textContent = `
            div:has(div) {
              outline: 1px solid red;
            }
            
            div .custom-after-class:not(h1,h2,h3,h4,h5,p) {
                background:red
            }

            h1,h2,h3,h4,h5,p {
              outline:1px double purple;
            }

            .custom-after-class {
                position: absolute;
                top: 0;
                right: 0;
                font-size: 10px;
                font-weight: 500;
                padding: 0px 8px;
                color: white;
            }
          `;
                document.head.appendChild(style);

                const elements = document.querySelectorAll('div:has(div), h1, h2, h3, h4, h5, p');

                elements.forEach(element => {
                    const firstClass = element.classList.length > 0 ? element.classList[0] : '';
                    if(firstClass === ''){
                        parentFirstClass = element.parentElement.classList.length > 0 ? element.parentElement.classList[0] : ''
                    }
                    const afterElement = document.createElement('span'); 
                    afterElement.classList.add('custom-after-class'); 
                    afterElement.textContent = (firstClass === '' ? (`.${parentFirstClass} > ${element.tagName.toLowerCase()}`): (`.${firstClass}`));
                    element.style.position = 'relative'; 
                    element.appendChild(afterElement);

                });

            }
        });
    });
}
