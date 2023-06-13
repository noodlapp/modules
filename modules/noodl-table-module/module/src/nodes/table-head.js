function TableHeadComponent(props) {
  const style = {
    position: "relative",
    ...(props.style || {}),
  };
  return (
    <thead className={props.cssClassName} style={style} onClick={props.onClick}>
      {props.children}
    </thead>
  );
}

const TableHeadNode = Noodl.defineReactNode({
  name: "Table Head",
  category: "Table",
  getReactComponent() {
    return TableHeadComponent;
  },
  inputProps: {
    cssClassName: {
      index: 100000,
      displayName: "CSS Class",
      group: "Advanced Style",
      type: "string",
      default: "table-head",
    },
  },
  outputProps: {
    onClick: { type: "signal", displayName: "Click" },
  },
});

module.exports = TableHeadNode;
