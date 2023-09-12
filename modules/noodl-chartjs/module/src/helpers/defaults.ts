import {
  generateEnum,
  generateInputs,
  generateInputsChanged,
  Input,
  toNoodlFontClass,
} from "./boilerplate";

const globalOptions: Input = {
  group: "General Options",
  options: [
    {
      name: "responsive",
      displayName: "Responsive",
      type: "boolean",
      transformFrom: () => true,
    },
    {
      name: "maintainAspectRatio",
      displayName: "Maintain Aspect Ratio",
      type: "boolean",
      transformFrom: () => false,
    },
    {
      name: "aspectRatio",
      displayName: "Aspect Ratio",
      type: "number",
      transformFrom: () => undefined,
    },
    {
      name: "resizeDelay",
      displayName: "Resize Delay",
      type: "number",
      transformFrom: () => 0,
    },
  ],
};

const globalAnimationOptions: Input = {
  group: "Animation",
  options: [
    {
      name: "animateOnDataUpdate",
      displayName: "On Data Update",
      type: "boolean",
      transformFrom: () => true,
    },
  ],
};

const tooltipsOptions: Input = {
  group: "Tooltips",
  namespace: "plugins.tooltip",
  options: [
    {
      name: "enabled",
      displayName: "Show Tooltips",
      type: "boolean",
      transformFrom: () => true,
    },
    { name: "intersect" },
    {
      name: "mode",
      type: generateEnum(["point", "nearest", "index", "dataset", "x", "y"]),
    },
    { name: "position", type: generateEnum(["average", "nearest"]) },
    { name: "backgroundColor", type: "color" },
    { name: "bodyColor", type: "color" },
    {
      name: "bodySpacing",
      displayName: "Spacing",
      type: "number",
      transformFrom: () => 2,
    },
    {
      name: "cornerRadius",
      displayName: "Corner Radius",
      type: "number",
      transformFrom: () => 6,
    },
    {
      name: "displayColors",
      displayName: "Display Colors",
      type: "boolean",
      transformFrom: () => true,
    },
  ],
};

const tooltipsFontOptions: Input = {
  group: "Tooltips Font",
  namespace: "plugins.tooltip.bodyFont",
  options: [
    {
      name: "family",
      displayName: "Font Family",
      type: "font",
      transformTo: toNoodlFontClass,
    },
    {
      name: "size",
      displayName: "Font Size",
      type: "number",
      transformFrom: () => 12,
    },
    {
      name: "style",
      displayName: "Font Style",
      type: generateEnum(["normal", "italic", "oblique", "initial"]),
      transformFrom: () => "normal",
    },
    {
      name: "weight",
      displayName: "Weight",
      type: generateEnum(["normal", "italic", "oblique", "initial"]),
      transformFrom: () => "normal",
    },
    {
      name: "lineHeight",
      displayName: "Line Height",
      type: "number",
      transformFrom: () => 1.2,
    },
  ],
};

const titleOptions: Input = {
  group: "Title",
  namespace: "plugins.title",
  options: [
    {
      name: "display",
      displayName: "Show Title",
      type: "boolean",
      transformFrom: () => false,
    },
    { name: "text", type: "string" },
    {
      name: "align",
      type: generateEnum(["start", "center", "end"]),
      transformFrom: () => "center",
    },
    {
      name: "position",
      type: generateEnum(["top", "bottom"]),
      transformFrom: () => "top",
    },
    { name: "color", displayName: "Color", type: "color" },
  ],
};

const titleFontOptions: Input = {
  group: "Title Font",
  namespace: "plugins.title.font",
  options: [
    {
      name: "family",
      displayName: "Font Family",
      type: "font",
      transformTo: toNoodlFontClass,
    },
    {
      name: "size",
      displayName: "Font Size",
      type: "number",
      transformFrom: () => 12,
    },
    {
      name: "style",
      displayName: "Font Style",
      type: generateEnum(["normal", "italic", "oblique", "initial"]),
      transformFrom: () => "normal",
    },
    {
      name: "weight",
      displayName: "Weight",
      type: generateEnum(["normal", "italic", "oblique", "initial"]),
      transformFrom: () => "normal",
    },
    {
      name: "lineHeight",
      displayName: "Line Height",
      type: "number",
      transformFrom: () => 1.2,
    },
  ],
};

const legendOptions: Input = {
  group: "Legend",
  namespace: "plugins.legend",
  options: [
    {
      name: "display",
      displayName: "Show Legend",
      type: "boolean",
      transformFrom: () => true,
    },
    {
      name: "position",
      type: generateEnum(["top", "left", "bottom", "right"]),
      transformFrom: () => "top",
    },
    {
      name: "align",
      type: generateEnum(["start", "center", "end"]),
      transformFrom: () => "center",
    },
    // {
    //   name: "maxHeight",
    //   displayName: "Max Height",
    //   type: "number"
    // },
    // {
    //   name: "maxWidth",
    //   displayName: "Max Width",
    //   type: "number"
    // },
    {
      name: "fullSize",
      displayName: "Full Size",
      type: "boolean",
    },
    {
      name: "reverse",
      displayName: "Reverse",
      type: "boolean",
    },
    {
      name: "rtl",
      displayName: "Right to Left",
      type: "boolean",
    },
    {
      name: "textDirection",
      displayName: "Text Direction",
      type: generateEnum(["ltr", "rtl"]),
      transformFrom: () => "ltr",
    },
  ],
};

const legendLabelsOptions: Input = {
  group: "Legend Labels",
  namespace: "plugins.legend.labels",
  options: [
    { name: "boxWidth" },
    { name: "size" },
    { name: "padding" },
    { name: "color", displayName: "Text Color", type: "color" },
    {
      name: "textAlign",
      displayName: "Text Align",
      type: generateEnum(["start", "center", "end"]),
      transformFrom: () => "center",
    },
    {
      name: "usePointStyle",
      displayName: "Use Point Style",
      type: "boolean",
      transformFrom: () => false,
    },
    {
      name: "pointStyle",
      displayName: "Point Style",
      type: generateEnum([
        "circle",
        "cross",
        "crossRot",
        "dash",
        "line",
        "rect",
        "rectRounded",
        "rectRot",
        "star",
        "triangle",
      ]),
      transformFrom: () => "circle",
    },
  ],
};

const legendLabelsFontOptions: Input = {
  group: "Legend Labels Font",
  namespace: "plugins.legend.labels.font",
  options: [
    {
      name: "family",
      displayName: "Font Family",
      type: "font",
      transformTo: toNoodlFontClass,
    },
    {
      name: "size",
      displayName: "Font Size",
      type: "number",
      transformFrom: () => 12,
    },
    {
      name: "style",
      displayName: "Font Style",
      type: generateEnum(["normal", "italic", "oblique", "initial"]),
      transformFrom: () => "normal",
    },
    {
      name: "weight",
      displayName: "Weight",
      type: generateEnum(["normal", "italic", "oblique", "initial"]),
      transformFrom: () => "normal",
    },
    {
      name: "lineHeight",
      displayName: "Line Height",
      type: "number",
      transformFrom: () => 1.2,
    },
  ],
};

const dataDecimationOptions: Input = {
  group: "Data Decimation",
  namespace: "plugins.decimation",
  options: [
    {
      name: "enabled",
      displayName: "Enabled",
      type: "boolean",
      transformFrom: () => false,
    },
    {
      name: "algorithm",
      displayName: "Algorithm",
      type: generateEnum(["min-max", "lttb"]),
      transformFrom: () => "min-max",
    },
    {
      name: "samples",
      displayName: "Samples",
      type: "number",
      transformFrom: () => undefined,
    },
    {
      name: "threshold",
      displayName: "Threshold",
      type: "number",
      transformFrom: () => undefined,
    },
  ],
};

const interactionOptions: Input = {
  group: "Interaction",
  namespace: "interaction",
  options: [
    {
      name: "intersect",
      displayName: "Intersect",
      type: "boolean",
      transformFrom: () => true,
    },
    {
      name: "mode",
      displayName: "Mode",
      type: generateEnum(["point", "nearest", "dataset", "x", "y"]),
      transformFrom: () => "nearest",
    },
    {
      name: "axis",
      displayName: "Axis",
      type: generateEnum(["x", "y"]),
      transformFrom: () => "x",
    },
    {
      name: "includeInvisible",
      displayName: "Include Invisible",
      type: "boolean",
      transformFrom: () => false,
    },
  ],
};

export const chart_inputs = {
  ...generateInputs(globalOptions),
  ...generateInputs(globalAnimationOptions),
  ...generateInputs(titleOptions),
  ...generateInputs(titleFontOptions),
  ...generateInputs(tooltipsOptions),
  ...generateInputs(tooltipsFontOptions),
  ...generateInputs(legendOptions),
  ...generateInputs(legendLabelsOptions),
  ...generateInputs(legendLabelsFontOptions),
  ...generateInputs(dataDecimationOptions),
  ...generateInputs(interactionOptions),

  // Allow to set custom plugins
  customPlugins: {
    group: "Advanced",
    displayName: "Plugins Object",
    type: "object"
  }
};

export const chart_changed = {
  ...generateInputsChanged(globalOptions),
  ...generateInputsChanged(globalAnimationOptions),
  ...generateInputsChanged(titleOptions),
  ...generateInputsChanged(titleFontOptions),
  ...generateInputsChanged(tooltipsOptions),
  ...generateInputsChanged(tooltipsFontOptions),
  ...generateInputsChanged(legendOptions),
  ...generateInputsChanged(legendLabelsOptions),
  ...generateInputsChanged(legendLabelsFontOptions),
  ...generateInputsChanged(dataDecimationOptions),
  ...generateInputsChanged(interactionOptions),

  customPlugins(value) {
    if (!this.chart) return;

    if (typeof value === 'object') {
      Object.keys(value).forEach((key) => {
        this.chart.options.plugins[key] = value[key];
      });

      this.chart.update();
    }
  }
};

export const chart_options = [
  globalOptions,
  globalAnimationOptions,
  titleOptions,
  titleFontOptions,
  tooltipsOptions,
  tooltipsFontOptions,
  legendOptions,
  legendLabelsOptions,
  legendLabelsFontOptions,
  dataDecimationOptions,
  interactionOptions,
];
