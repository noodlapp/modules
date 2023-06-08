function isPercentage(size) {
  return (size && size[size.length - 1] === '%');
}

function getPercentage(size) {
  return Number(size.slice(0, -1));
}

function getSizeWithMargins(size, startMargin, endMargin) {
  if (!startMargin && !endMargin) {
    return size;
  }

  let css = `calc(${size}`;
  if (startMargin) {
    css += ` - ${startMargin}`;
  }
  if (endMargin) {
    css += ` - ${endMargin}`;
  }
  css += ')';

  return css;
}

module.exports = {
  paddingCssProps: {
    paddingLeft: {
      index: 0,
      group: "Padding",
      default: 0,
      applyDefault: false,
      displayName: "Pad Left",
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
        marginPaddingComp: "padding-left",
      },
      allowVisualStates: true,
    },
    paddingRight: {
      index: 0,
      group: "Padding",
      default: 0,
      applyDefault: false,
      displayName: "Pad Right",
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
        marginPaddingComp: "padding-right",
      },
      allowVisualStates: true,
    },
    paddingTop: {
      index: 0,
      group: "Padding",
      displayName: "Pad Top",
      default: 0,
      applyDefault: false,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
        marginPaddingComp: "padding-top",
      },
      allowVisualStates: true,
    },
    paddingBottom: {
      index: 0,
      group: "Padding",
      displayName: "Pad Bottom",
      default: 0,
      applyDefault: false,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
        marginPaddingComp: "padding-bottom",
      },
      allowVisualStates: true,
    },
  },

  boxShadowProps: {
    boxShadowEnabled: {
      index: 250,
      group: "Box Shadow",
      displayName: "Shadow Enabled",
      type: "boolean",
      default: false,
    },
    boxShadowOffsetX: {
      index: 251,
      group: "Box Shadow",
      displayName: "Offset X",
      default: 0,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
      },
    },
    boxShadowOffsetY: {
      index: 252,
      group: "Box Shadow",
      displayName: "Offset Y",
      default: 0,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
      },
    },
    boxShadowBlurRadius: {
      index: 253,
      group: "Box Shadow",
      displayName: "Blur Radius",
      default: 5,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
      },
    },
    boxShadowSpreadRadius: {
      index: 254,
      group: "Box Shadow",
      displayName: "Spread Radius",
      default: 2,
      type: {
        name: "number",
        units: ["px"],
        defaultUnit: "px",
      },
    },
    boxShadowInset: {
      index: 255,
      group: "Box Shadow",
      displayName: "Inset",
      type: "boolean",
      default: false,
    },
    boxShadowColor: {
      index: 256,
      group: "Box Shadow",
      displayName: "Shadow Color",
      type: "color",
      default: "rgba(0,0,0,0.2)",
    },
  },

  size(style, props) {
    if (props.parentLayout === 'none') {
      style.position = 'absolute';
    }

    if (props.sizeMode === 'explicit') {
      style.width = props.width;
      style.height = props.height;
    } else if (props.sizeMode === 'contentHeight') {
      style.width = props.width;
    } else if (props.sizeMode === 'contentWidth') {
      style.height = props.height;
    }

    style.flexShrink = 0;

    if (props.parentLayout === 'row' && style.position === 'relative') {
      if (isPercentage(style.width) && !props.fixedWidth) {
        style.flexGrow = getPercentage(style.width);
        style.flexShrink = 1;
      }

      if (isPercentage(style.height) && !props.fixedHeight) {
        style.height = getSizeWithMargins(style.height, style.marginTop, style.marginBottom);
      }
    } else if (props.parentLayout === 'column' && style.position === 'relative') {
      if (isPercentage(style.width) && !props.fixedWidth) {
        style.width = getSizeWithMargins(style.width, style.marginLeft, style.marginRight);
      }

      if (isPercentage(style.height) && !props.fixedHeight) {
        style.flexGrow = getPercentage(style.height);
        style.flexShrink = 1;
      }
    } else if (style.position !== 'relative') {
      if (isPercentage(style.width)) {
        style.width = getSizeWithMargins(style.width, style.marginLeft, style.marginRight);
      }
      if (isPercentage(style.height)) {
        style.height = getSizeWithMargins(style.height, style.marginTop, style.marginBottom);
      }
    }
  }
};