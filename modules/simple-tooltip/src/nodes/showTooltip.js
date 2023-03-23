import tippy, {
  followCursor as tippyFollowCursor
} from "tippy.js";
import {
  sharedInputProps,
  sharedInputs,
  toNumber
} from "./_shared";

export default {
  name: "simple-tooltip.show-tooltip",
  displayName: "Show Tooltip",
  category: "tooltip",
  dynamicports: [{
    condition: "boxShadowEnabled = true",
    inputs: [
      "boxShadowOffsetX",
      "boxShadowOffsetY",
      "boxShadowInset",
      "boxShadowBlurRadius",
      "boxShadowSpreadRadius",
      "boxShadowColor",
    ],
  }, ],
  inputs: {
    ...sharedInputProps,
    ...sharedInputs,

    nodeRef: {
      type: "*",
      displayName: "Node Reference",
      tooltip: "Plug in the 'This' property from a visual node to tell the tooltip where to be visible.",
      group: "Target",
    },

    show: {
      type: "signal",
      displayName: "Show",
      group: "Actions",
      valueChangedToTrue() {
        if (!this._internal.instance) {
          this.createTooltip();
        }
      },
    },
    hide: {
      type: "signal",
      displayName: "Hide",
      group: "Actions",
      valueChangedToTrue() {
        if (this._internal.instance) {
          this._internal.instance.hide();
        }
      },
    },
  },
  outputs: {
    outIsOpen: {
      displayName: "Is Open",
      group: "State",
      tooltip: "",
      type: "boolean",
      getter() {
        return this.outputs['outIsOpen'];
      }
    },
    onShown: {
      displayName: "Shown",
      group: "State",
      tooltip: "",
      type: "signal",
    },
    onHidden: {
      displayName: "Hidden",
      group: "State",
      tooltip: "",
      type: "signal",
    },
  },
  initialize() {
    // TODO: Using units seems to cause an issue here
    this.props = {};

    this.outputs = {};
    this._internal = {
      borderRadius: {
        borderRadius: 4,
      },
      padding: {
        paddingLeft: "9px",
        paddingRight: "9px",
        paddingTop: "5px",
        paddingBottom: "5px",
      },
      styles: {
        tooltip: {
          backgroundColor: "#5836F5",
        },
        tooltipContent: {},
      }
    };

    this._updatePadding();
    this._updateCornerRadii();
  },
  methods: {
    forceUpdate() {
      // TODO: Using units seems to cause an issue here
    },
    _updateTextStyle() {},
    setOutputs(states) {
      for (var key in states) {
        this.outputs[key] = states[key];
        this.flagOutputDirty(key);
      }
    },
    createTooltip() {
      const props = this._inputValues;

      this.setOutputs({
        outIsOpen: false
      });

      // Noodl doesn't handle false that well, so we save it as a string instead.
      let followCursor = false;
      if (typeof props.followCursor === "string") {
        if (props.followCursor === "true") {
          followCursor = true;
        } else if (props.followCursor === "false") {
          followCursor = false;
        } else {
          followCursor = props.followCursor;
        }
      }

      let animation = "scale";
      if (typeof props.animation === "string") {
        if (props.animation === "false") {
          animation = false;
        } else {
          animation = props.animation;
        }
      }

      let hideOnClick = true;
      if (typeof props.hideOnClick === "string") {
        if (props.hideOnClick === "true") {
          hideOnClick = true;
        } else if (props.hideOnClick === "false") {
          hideOnClick = false;
        } else {
          hideOnClick = props.hideOnClick;
        }
      }

      const nodeRef = props.nodeRef;
      if (!nodeRef || nodeRef && typeof nodeRef.getDOMElement !== 'function') {
        if (this.context.editorConnection) {
          this.context.editorConnection.sendWarning(this.nodeScope.componentOwner.name, this.id, 'show-tooltip-node-ref', {
            showGlobally: true,
            message: "Missing or invalid Node Reference."
          });
        }
        throw new Error("Missing or invalid Node Reference.");
      }
      if (this.context.editorConnection) {
        this.context.editorConnection.clearWarning(this.nodeScope.componentOwner.name, this.id, 'show-tooltip-node-ref');
      }

      const _this = this;
      const targetElement = nodeRef.getDOMElement();
      const instance = tippy(targetElement, {
        allowHTML: props.allowHTML || false,
        content: props.content || "",
        placement: props.placement || "auto",
        arrow: props.arrow || false,
        animation,
        trigger: props.trigger || "mouseenter focus",
        delay: [
          toNumber(props.delayShow, null),
          toNumber(props.delayhide, null),
        ],
        duration: [
          toNumber(props.durationShow, null),
          toNumber(props.durationHide, null),
        ],
        followCursor,
        hideOnClick,
        interactive: props.interactive || false,
        interactiveBorder: toNumber(props.interactiveBorder, 2),
        interactiveDebounce: toNumber(props.interactiveDebounce, 0),
        maxWidth: toNumber(props.maxWidth, 350),
        offset: [toNumber(props.offsetX, 0), toNumber(props.offsetY, 10)],
        plugins: [tippyFollowCursor],
        onShow(instance) {
          const tooltipElem = instance.popper;
          if (!tooltipElem) return;

          const boxElem = tooltipElem.getElementsByClassName("tippy-box");
          const contentElem =
            tooltipElem.getElementsByClassName("tippy-content");
          if (boxElem.length === 0 || contentElem.length === 0) return;

          Object.entries(_this._internal.styles.tooltip).forEach(([key, value]) => {
            boxElem[0].style[key] = value;
          });

          if (props.boxShadowEnabled) {
            boxElem[0].style.boxShadow = `${
              props.boxShadowInset ? "inset " : ""
            }${props.boxShadowOffsetX} ${props.boxShadowOffsetY} ${
              props.boxShadowBlurRadius
            } ${props.boxShadowSpreadRadius} ${props.boxShadowColor}`;
          }

          const textStyle = typeof props.textStyle === 'object' ? props.textStyle : {};
          Object.entries({
            ...textStyle,
            ..._this._internal.styles.tooltipContent,
          }).forEach(([key, value]) => {
            contentElem[0].style[key] = value;
          });

          if (!contentElem[0].style.fontFamily) {
            // Set a default font family
            contentElem[0].style.fontFamily = `Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", sans-serif`;
          }

          const arrowElem = tooltipElem.getElementsByClassName("tippy-arrow");
          if (arrowElem.length === 1) {
            arrowElem[0].style.color = _this._internal.styles.tooltip.backgroundColor;
          }
        },
        onShown() {
          _this.setOutputs({
            outIsOpen: true
          });
          _this.sendSignalOnOutput("onShown");
        },
        onHidden() {
          _this.setOutputs({
            outIsOpen: false
          });
          _this.sendSignalOnOutput("onHidden");

          _this._internal.instance.destroy();
          _this._internal.instance = null;
        },
      });

      this._internal.instance = instance;
    },
    _updateBackgroundColor() {
      this._internal.styles.tooltip = {
        ...this._internal.styles.tooltip,
        backgroundColor: this._internal.backgroundColor,
      };
    },
    _updatePadding() {
      this._internal.styles.tooltipContent = {
        ...this._internal.styles.tooltipContent,
        paddingLeft: this._internal.padding.paddingLeft,
        paddingRight: this._internal.padding.paddingRight,
        paddingTop: this._internal.padding.paddingTop,
        paddingBottom: this._internal.padding.paddingBottom,
      };
    },
    _updateCornerRadii() {
      const b = this._internal.borderRadius;

      function setCorner(style, corner) {
        const r = `border${corner}Radius`;
        style[r] = b[r] || b.borderRadius;
      }

      const style = {};
      setCorner(style, "TopLeft");
      setCorner(style, "TopRight");
      setCorner(style, "BottomRight");
      setCorner(style, "BottomLeft");

      this._internal.styles.tooltip = {
        ...this._internal.styles.tooltip,
        ...style
      };
    },
  },
};