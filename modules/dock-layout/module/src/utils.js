export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// NOTE: Could use https://github.com/ticlo/rc-dock#find- instead
export function traverse(layout, id, update) {
  function process(child, parent) {
    if (child.id === id) {
      update(child, parent);
      return false;
    }

    if (child.children) {
      return child.children.every((x) => process(x, child));
    }
    
    if (child.tabs) {
      return child.tabs.every((x) => process(x, child));
    }

    return true;
  }

  const children = [
    layout.dockbox,
    layout.floatbox,
    layout.maxbox,
    layout.windowbox,
  ]

  return !children.every((x) => process(x, null))
}
