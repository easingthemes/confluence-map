export const renderStyle = (root, style) => {
  const template = document.createElement('template');
  template.innerHTML = style;

  root.appendChild(template.content.cloneNode(true));
}
