export function toNumber(value, fallback) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const result = parseInt(value);
    if (!Number.isNaN(result)) {
      return result;
    }
  }
  return fallback;
}

export function defineCornerTab(suffix, tabName, indexOffset, defaultValue) {
  const nameWithTab = (name) => `${name} ${suffix ? "(" + suffix + ")" : ""}`;

  const tab = {
    group: "corners",
    tab: tabName,
    label: suffix
  };
  const radiusName = `border${suffix}Radius`;
  return {
    index: 80 + indexOffset,
    displayName: "Corner Radius",
    editorName: nameWithTab("Corner Radius"),
    group: "Corner Radius",
    type: {
      name: "number",
      units: ["px", "%"],
      defaultUnit: "px",
    },
    allowVisualStates: true,
    default: defaultValue,
    tab,
    set(value) {
      this._internal.borderRadius[radiusName] =
        value.value === undefined ? undefined : value.value + value.unit;
      this._updateCornerRadii();
    },
  };
}

export const sharedInputProps = {
  allowHTML: {
    index: 50,
    displayName: "Allow HTML",
    group: "Content",
    tooltip: "Determines if content strings are parsed as HTML instead of text.",
    type: "boolean",
    default: false,
  },
  content: {
    index: 51,
    displayName: "Content",
    group: "Content",
    tooltip: "The content of the tooltip.",
    type: "string",
  },
  placement: {
    index: 120,
    displayName: "Placement",
    group: "Position",
    tooltip: "The preferred placement of the tooltip.",
    type: {
      name: "enum",
      enums: [{
          label: "Top",
          value: "top",
        },
        {
          label: "Top Start",
          value: "top-start",
        },
        {
          label: "Top End",
          value: "top-end",
        },

        {
          label: "Right",
          value: "right",
        },
        {
          label: "Right Start",
          value: "right-start",
        },
        {
          label: "Right End",
          value: "right-end",
        },

        {
          label: "Bottom",
          value: "bottom",
        },
        {
          label: "Bottom Start",
          value: "bottom-start",
        },
        {
          label: "Bottom End",
          value: "bottom-end",
        },

        {
          label: "Left",
          value: "left",
        },
        {
          label: "Left Start",
          value: "left-start",
        },
        {
          label: "Left End",
          value: "left-end",
        },

        {
          label: "Auto",
          value: "auto",
        },
        {
          label: "Auto Start",
          value: "auto-start",
        },
        {
          label: "Auto End",
          value: "auto-end",
        },
      ],
    },
    default: "auto",
  },
  arrow: {
    index: 62,
    displayName: "Arrow",
    group: "Style",
    tooltip: "Determines if the tooltip has an arrow.",
    type: "boolean",
    default: true,
  },
  animation: {
    index: 150,
    displayName: "Animation",
    group: "Animation",
    tooltip: "The type of transition animation.",
    type: {
      name: "enum",
      enums: [{
          label: "Disable",
          value: "false",
        },

        {
          label: "Perspective",
          value: "perspective",
        },
        {
          label: "Perspective Subtle",
          value: "perspective-subtle",
        },
        {
          label: "Perspective Extreme",
          value: "perspective-extreme",
        },

        {
          label: "Scale",
          value: "scale",
        },
        {
          label: "Scale Extreme",
          value: "scale-extreme",
        },
        {
          label: "Scale Subtle",
          value: "scale-subtle",
        },

        {
          label: "Shift Away",
          value: "shift-away",
        },
        {
          label: "Shift Away Extreme",
          value: "shift-away-extreme",
        },
        {
          label: "Shift Away Subtle",
          value: "shift-away-subtle",
        },

        {
          label: "Shift Toward",
          value: "shift-toward",
        },
        {
          label: "Shift Toward Extreme",
          value: "shift-toward",
        },
        {
          label: "Shift Toward Subtle",
          value: "shift-toward",
        },
      ],
    },
    default: "scale",
  },
  delayShow: {
    index: 151,
    displayName: "Delay Show",
    group: "Animation",
    tooltip: "Delay in ms once a trigger event is fired before a tippy shows.",
    type: {
      name: "number",
      units: ["ms"],
      defaultUnit: "ms",
    },
    default: 0,
  },
  delayhide: {
    index: 152,
    displayName: "Delay Hide",
    group: "Animation",
    tooltip: "Delay in ms once a trigger event is fired before a tippy hides.",
    type: {
      name: "number",
      units: ["ms"],
      defaultUnit: "ms",
    },
    default: 0,
  },
  durationShow: {
    index: 153,
    displayName: "Duration Show",
    group: "Animation",
    tooltip: "Duration in ms of the transition animation.",
    type: {
      name: "number",
      units: ["ms"],
      defaultUnit: "ms",
    },
    default: 300,
  },
  durationHide: {
    index: 154,
    displayName: "Duration Hide",
    group: "Animation",
    tooltip: "Duration in ms of the transition animation.",
    type: {
      name: "number",
      units: ["ms"],
      defaultUnit: "ms",
    },
    default: 250,
  },
  followCursor: {
    index: 121,
    displayName: "Follow Cursor",
    group: "Position",
    tooltip: "Determines if the tooltip follows the user's mouse cursor.",
    type: {
      name: "enum",
      enums: [{
          label: "Disable",
          value: "false",
        },
        {
          label: "Enabled",
          value: "true",
        },
        {
          label: "Horizontal",
          value: "horizontal",
        },
        {
          label: "Vertical",
          value: "vertical",
        },
        {
          label: "Initial",
          value: "initial",
        },
      ],
    },
    default: "false",
  },
  hideOnClick: {
    index: 200,
    displayName: "Hide On Click",
    group: "Interactive",
    tooltip: "Determines if the tippy hides upon clicking the reference or outside of the tooltip. The behavior can depend upon the trigger events used.",
    type: {
      name: "enum",
      enums: [{
          label: "True",
          value: "true",
        },
        {
          label: "False",
          value: "false",
        },
        {
          label: "Toggle",
          value: "toggle",
        },
      ],
    },
    default: "true",
  },
  interactive: {
    index: 210,
    displayName: "Interactive",
    group: "Interactive",
    tooltip: "Determines if the tooltip has interactive content inside of it, so that it can be hovered over and clicked inside without hiding.",
    type: "boolean",
    default: false,
  },
  interactiveBorder: {
    index: 211,
    displayName: "Interactive Border",
    group: "Interactive",
    tooltip: "Determines the size of the invisible border around the tooltip that will prevent it from hiding if the cursor left it.",
    type: {
      name: "number",
      units: ["px"],
      defaultUnit: "px",
    },
    default: 2,
  },
  interactiveDebounce: {
    index: 212,
    displayName: "Interactive Debounce",
    group: "Interactive",
    tooltip: "Determines the time in ms to debounce the interactive hide handler when the cursor leaves the tooltip's interactive region.",
    type: {
      name: "number",
      units: ["ms"],
      defaultUnit: "ms",
    },
    default: 0,
  },
  maxWidth: {
    index: 62,
    displayName: "Max Width",
    group: "Style",
    tooltip: "Specifies the maximum width of the tooltip.",
    type: {
      name: "number",
      units: ["px"],
      defaultUnit: "px",
    },
    default: 350,
  },
  offsetX: {
    index: 122,
    displayName: "Offset X",
    group: "Position",
    tooltip: "Displaces the tooltip from its reference element in pixels (skidding).",
    type: {
      name: "number",
      units: ["px"],
      defaultUnit: "px",
    },
    default: 0,
  },
  offsetY: {
    index: 123,
    displayName: "Offset Y",
    group: "Position",
    tooltip: "Displaces the tooltip from its reference element in pixels (distance).",
    type: {
      name: "number",
      units: ["px"],
      defaultUnit: "px",
    },
    default: 10,
  },
  trigger: {
    index: 201,
    displayName: "Trigger",
    group: "Interactive",
    tooltip: "Determines the events that will show the tooltip.",
    type: {
      name: "enum",
      enums: [{
          label: "Mouse Enter",
          value: "mouseenter focus",
        },
        {
          label: "Click",
          value: "click",
        },
        {
          label: "Manual",
          value: "manual",
        },
      ],
    },
    default: "mouseenter focus",
  },

  // Box shadow
  boxShadowEnabled: {
    index: 250,
    group: "Box Shadow",
    displayName: "Shadow Enabled",
    type: "boolean",
    default: true,
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
}

export const sharedInputs = {
  paddingLeft: {
    index: 100,
    group: "Margin and padding",
    default: 9,
    displayName: "Pad Left",
    type: {
      name: "number",
      units: ["px"],
      defaultUnit: "px",
      marginPaddingComp: "padding-left",
    },
    set(value) {
      this._internal.padding.paddingLeft =
        value.value === undefined ? undefined : value.value + value.unit;
      this._updatePadding();
    },
  },
  paddingRight: {
    index: 101,
    group: "Margin and padding",
    default: 9,
    displayName: "Pad Right",
    type: {
      name: "number",
      units: ["px"],
      defaultUnit: "px",
      marginPaddingComp: "padding-right",
    },
    set(value) {
      this._internal.padding.paddingRight =
        value.value === undefined ? undefined : value.value + value.unit;
      this._updatePadding();
    },
  },
  paddingTop: {
    index: 102,
    group: "Margin and padding",
    displayName: "Pad Top",
    default: 5,
    type: {
      name: "number",
      units: ["px"],
      defaultUnit: "px",
      marginPaddingComp: "padding-top",
    },
    set(value) {
      this._internal.padding.paddingTop =
        value.value === undefined ? undefined : value.value + value.unit;
      this._updatePadding();
    },
  },
  paddingBottom: {
    index: 103,
    group: "Margin and padding",
    displayName: "Pad Bottom",
    default: 5,
    type: {
      name: "number",
      units: ["px"],
      defaultUnit: "px",
      marginPaddingComp: "padding-bottom",
    },
    set(value) {
      this._internal.padding.paddingBottom =
        value.value === undefined ? undefined : value.value + value.unit;
      this._updatePadding();
    },
  },
  backgroundColor: {
    index: 60,
    displayName: "Background Color",
    group: "Style",
    type: "color",
    default: "#5836F5",
    set(value) {
      this._internal.backgroundColor = value;
      this._updateBackgroundColor();
    },
  },
  borderRadius: defineCornerTab("", "corners-all", 0, 4),
  borderTopLeftRadius: defineCornerTab("TopLeft", "corners-top-left", 1),
  borderTopRightRadius: defineCornerTab("TopRight", "corners-top-right", 2),
  borderBottomRightRadius: defineCornerTab(
    "BottomRight",
    "corners-bottom-right",
    3
  ),
  borderBottomLeftRadius: defineCornerTab(
    "BottomLeft",
    "corners-bottom-left",
    4
  ),

  textStyle: {
    index: 61,
    type: {
      name: "textStyle",
      childPorts: [
        "fontFamily",
        "fontSize",
        "color",
        "letterSpacing",
        "lineHeight",
        "textTransform",
      ],
    },
    group: "Text Style",
    displayName: "Text Style",
    default: "None",
    set(value) {
      this._internal.textStyle = this.context.styles.getTextStyle(value);
      this._updateTextStyle();
    },
    allowVisualStates: true,
    popout: {
      group: "input-text-style",
      label: "Text Style",
      parentGroup: "Style",
    },
  },
  // TODO: Dont have access to FontLoader anywhere?
  //    fontFamily: {
  //      index: 1,
  //      type: {
  //        name: "font",
  //        parentPort: "textStyle",
  //      },
  //      group: "Text Style",
  //      displayName: "Font Family",
  //      set(value) {
  //        if (value) {
  //          let family = value;
  //          if (family.split(".").length > 1) {
  //            FontLoader.instance.loadFont(family);
  //            family = family.replace(/\.[^/.]+$/, "");
  //            family = family.split("/").pop();
  //          }
  //          this.setStyle({ fontFamily: family }, "tooltipContent");
  //        } else {
  //          this.removeStyle(["fontFamily"], "tooltipContent");
  //        }
  //
  //        if (this.props.textStyle) {
  //          this.forceUpdate();
  //        }
  //      },
  //      allowVisualStates: true,
  //      popout: {
  //        group: "input-text-style",
  //        label: "Text Style",
  //        parentGroup: "Style",
  //      },
  //    },
  fontSize: {
    index: 62,
    group: "Text Style",
    displayName: "Font Size",
    targetStyleProperty: "fontSize",
    type: {
      name: "number",
      units: ["px"],
      defaultUnit: "px",
      parentGroup: "Style",
    },
    set(value) {
      this._internal.styles.tooltipContent.fontSize = value.value + value.unit;
      this._updateTextStyle();
    },
    allowVisualStates: true,
    popout: {
      group: "input-text-style",
      label: "Text Style",
      parentGroup: "Style",
    },
  },
  color: {
    index: 63,
    type: {
      name: "color",
      parentGroup: "Style",
    },
    displayName: "Color",
    group: "Text Style",
    targetStyleProperty: "color",
    allowVisualStates: true,
    popout: {
      group: "input-text-style",
      label: "Text Style",
      parentGroup: "Style",
    },
    set(value) {
      this._internal.styles.tooltipContent.color = value;
      this._updateTextStyle();
    },
  },
  letterSpacing: {
    index: 64,
    group: "Text Style",
    displayName: "Letter Spacing",
    targetStyleProperty: "letterSpacing",
    type: {
      name: "number",
      units: ["px", "em"],
      defaultUnit: "px",
      parentGroup: "Style",
    },
    allowVisualStates: true,
    popout: {
      group: "input-text-style",
      label: "Text Style",
      parentGroup: "Style",
    },
    default: "Auto",
    applyDefault: false,
    set(value) {
      this._internal.styles.tooltipContent.letterSpacing = value.value + value.unit;
      this._updateTextStyle();
    },
  },
  lineHeight: {
    index: 65,
    group: "Text Style",
    displayName: "Line Height",
    targetStyleProperty: "lineHeight",
    type: {
      name: "number",
      units: ["", "px", "%"],
      defaultUnit: "",
      parentGroup: "Style",
    },
    allowVisualStates: true,
    set(value) {
      this._internal.styles.tooltipContent.lineHeight = value.value + value.unit;
      this._updateTextStyle();
    },
    popout: {
      group: "input-text-style",
      label: "Text Style",
      parentGroup: "Style",
    },
    default: "Auto",
    applyDefault: false,
  },
  textTransform: {
    index: 66,
    group: "Text Style",
    displayName: "Case",
    applyDefault: false,
    targetStyleProperty: "textTransform",
    type: {
      name: "enum",
      enums: [{
          label: "None",
          value: "none"
        },
        {
          label: "Uppercase",
          value: "uppercase"
        },
        {
          label: "Lowercase",
          value: "lowercase"
        },
        {
          label: "Capitalize",
          value: "capitalize"
        },
      ],
      parentGroup: "Style",
    },
    default: "none",
    popout: {
      group: "input-text-style",
      label: "Text Style",
      parentGroup: "Style",
    },
    allowVisualStates: true,
    set(value) {
      this._internal.styles.tooltipContent.textTransform = value;
      this._updateTextStyle();
    },
  },
}