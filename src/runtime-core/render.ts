export function render(vnode, container) {
  const dom = mount(vnode, container);
  // container.appendChild(dom);
  return dom;
}

function mount(vnode: any, container: any) {
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  const dom = document.createElement(vnode.type);
  if (vnode.props) {
    for (const key in vnode.props) {
      dom.setAttribute(key, vnode.props[key]);
    }
  }
  if (vnode.children) {
    vnode.children.forEach((child) => {
      dom.appendChild(mount(child, dom));
    });
  }
  container.appendChild(dom);
  return dom;
}
