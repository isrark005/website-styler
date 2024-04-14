// Inject the CSS styles
// const style = document.createElement('style');
// style.textContent = `
//   div:has(div) {
//     outline: 1px solid red;
//   }
//   h1,h2,h3,h4,h5,p {
//     outline:1px double purple;
//   }
// `;
// document.head.appendChild(style);


const elements = document.querySelectorAll('div:has(div), h1, h2, h3, h4, h5, p');

elements.forEach(element => {
  const firstClass = element.classList.length > 0 ? element.classList[0] : ''; // Get first class or empty string
  const afterElement = document.createElement('div'); // Create element for ::after content
  afterElement.classList.add('custom-after-class'); // Optional class for styling (optional)
  afterElement.textContent = firstClass;
  element.appendChild(afterElement);

  element.style.position = 'relative'; // Ensure relative positioning (if not already set)
});
