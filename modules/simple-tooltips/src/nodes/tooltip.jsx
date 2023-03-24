import React, { useRef, useEffect } from "react";
import tippy, { followCursor as tippyFollowCursor } from "tippy.js";
import { sharedInputProps, sharedInputs, toNumber } from "./_shared";

export default {
  name: "simple-tooltips.tooltip",
  displayName: "Tooltip",
  category: "tooltip",
  docs: "https://docs.noodl.net/library/modules/simple-tooltips/nodes/show-tooltip",
  noodlNodeAsProp: true,
  getReactComponent() {
    return function (props) {
      const rootRef = useRef(null);
      const tooltipRef = useRef(null);

      useEffect(() => {
        if (!rootRef.current) return;

        props.outIsOpen && props.outIsOpen(false);

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

        const instance = tippy(rootRef.current, {
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

            Object.entries(props.styles.tooltip).forEach(([key, value]) => {
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
              ...props.styles.tooltipContent,
            }).forEach(([key, value]) => {
              contentElem[0].style[key] = value;
            });

            if (!contentElem[0].style.fontFamily) {
              // Set a default font family
              contentElem[0].style.fontFamily = `Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", sans-serif`;
            }

            const arrowElem = tooltipElem.getElementsByClassName("tippy-arrow");
            if (arrowElem.length === 1) {
              arrowElem[0].style.color = props.styles.tooltip.backgroundColor;
            }
          },
          onShown() {
            props.outIsOpen && props.outIsOpen(true);
            props.onShown && props.onShown();
          },
          onHidden() {
            props.outIsOpen && props.outIsOpen(false);
            props.onHidden && props.onHidden();
          },
        });

        tooltipRef.current = Array.isArray(instance) ? instance : [instance];

        props.noodlNode._tooltip_methods = {
          show() {
            tooltipRef.current.forEach((instance) => {
              instance.show();
            });
          },
          hide() {
            tooltipRef.current.forEach((instance) => {
              instance.hide();
            });
          },
        };

        return function () {
          tooltipRef.current.forEach((instance) => {
            instance.destroy();
          });
          tooltipRef.current = null;
        };
      }, [props, rootRef]);

      return (
        <div
          ref={rootRef}
          style={{
            position: "relative",
            width: "100%",
            ...props.styles,
          }}
          className={props.className}
        >
          {props.children}
        </div>
      );
    };
  },
  dynamicports: [
    {
      condition: "boxShadowEnabled = true",
      inputs: [
        "boxShadowOffsetX",
        "boxShadowOffsetY",
        "boxShadowInset",
        "boxShadowBlurRadius",
        "boxShadowSpreadRadius",
        "boxShadowColor",
      ],
    },
  ],
  inputProps: sharedInputProps,
  inputs: {
    ...sharedInputs,

    show: {
      type: "signal",
      displayName: "Show",
      group: "Actions",
      valueChangedToTrue() {
        this._tooltip_methods && this._tooltip_methods.show();
      },
    },
    hide: {
      type: "signal",
      displayName: "Hide",
      group: "Actions",
      valueChangedToTrue() {
        this._tooltip_methods && this._tooltip_methods.hide();
      },
    },
  },
  outputProps: {
    outIsOpen: {
      displayName: "Is Open",
      group: "State",
      tooltip: "",
      type: "boolean",
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

    this.props.styles = this._internal.styles;

    this._updatePadding();
    this._updateCornerRadii();
  },
  methods: {
    _updateTextStyle() {
      this.setStyle(this._internal.styles.tooltipContent, "tooltipContent");
      if (this._internal.textStyle) {
        this.forceUpdate();
      }
    },
    _updateBackgroundColor() {
      this.setStyle(
        {
          backgroundColor: this._internal.backgroundColor,
        },
        "tooltip"
      );
    },
    _updatePadding() {
      this.setStyle(
        {
          paddingLeft: this._internal.padding.paddingLeft,
          paddingRight: this._internal.padding.paddingRight,
          paddingTop: this._internal.padding.paddingTop,
          paddingBottom: this._internal.padding.paddingBottom,
        },
        "tooltipContent"
      );
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

      this.setStyle(style, "tooltip");
    },
  },
};
