const { size } = require('./helper');

function TableComponent(props) {
  const style = {
    position: "relative",
    borderSpacing: props.borderSpacingVertical + " " + props.borderSpacingHorizontal,
    // borderSpacingVertical == 0 && borderSpacingHorizontal == 0 equals to borderSpacing collapse
    borderCollapse: "separate",
    ...(props.style || {}),
  };

  size(style, props);

  return (
    <table className={props.cssClassName} style={style} onClick={props.onClick}>
      {props.children}
    </table>
  );
}

const TableNode = Noodl.defineReactNode({
  name: "Table",
  category: "Table",
  getReactComponent() {
    return TableComponent;
  },
  inputProps: {
    sizeMode: {
      index: 10,
      type: {
        name: "enum",
        enums: [
          { value: 'explicit', label: 'Explicit' },
          { value: 'contentWidth', label: 'Content Width' },
          { value: 'contentHeight', label: 'Content Height' },
          { value: 'contentSize', label: 'Content Size' }
        ],
        allowEditOnly: true,
        sizeComp: 'mode',
      },
      group: "Dimensions",
      displayName: "Size Mode",
      default: 'contentHeight',
    },
    width: {
      index: 11,
      group: 'Dimensions',
      displayName: 'Width',
      type: {
        name: "number",
        units: ["%", "px", 'vw'],
        defaultUnit: "%"
      },
      default: 100
    },
    height: {
      index: 13,
      group: 'Dimensions',
      displayName: 'Height',
      type: {
        name: "number",
        units: ["%", "px", 'vh'],
        defaultUnit: "%"
      },
      default: 100
    },
    borderSpacingHorizontal: {
      default: 0,
      displayName: "Horizontal Gap",
      group: "Table Style",
      type: {
        name: "number",
        units: ["px", "rem", "em", "cm"],
        defaultUnit: "px",
      },
    },
    borderSpacingVertical: {
      default: 0,
      displayName: "Vertical Gap",
      group: "Table Style",
      type: {
        name: "number",
        units: ["px", "rem", "em", "cm"],
        defaultUnit: "px",
      },
    },
    cssClassName: {
      index: 100000,
      displayName: "CSS Class",
      group: "Advanced Style",
      type: "string",
      default: "table",
    },
  },
  inputCss: {
    opacity: {
      index: 200,
      group: "Style",
      displayName: "Opacity",
      type: "number",
      default: 1,
      allowVisualStates: true,
    },
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

module.exports = TableNode;
