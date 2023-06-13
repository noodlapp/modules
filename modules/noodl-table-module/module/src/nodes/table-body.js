function TableBodyComponent(props) {
  const style = {
    position: "relative",
    backgroundColor: props.backgroundColor,
    ...(props.style || {}),
  };
  return (
    <tbody className={props.className} style={style} onClick={props.onClick}>
      {props.children}
    </tbody>
  );
}

const TableBodyNode = Noodl.defineReactNode({
  name: "Table Body",
  category: "Table",
  getReactComponent() {
    return TableBodyComponent;
  },
  inputProps: {
    cssClassName: {
      index: 100000,
      displayName: "CSS Class",
      group: "Advanced Style",
      type: "string",
      default: "table-body",
    },
  },
  inputCss: {
    backgroundColor: {
      index: 201,
      displayName: "Background Color",
      group: "Style",
      type: "color",
      allowVisualStates: true,
      default: "transparent",
      applyDefault: false,
    },
  },
  outputProps: {
    onClick: { type: "signal", displayName: "Click" },
  },
});

module.exports = TableBodyNode;
