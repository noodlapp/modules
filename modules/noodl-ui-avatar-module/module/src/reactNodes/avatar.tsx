import * as Noodl from "@noodl/noodl-sdk";
import React from "react";
import {
  createOutline,
  createTransform,
  createTransformOrigin,
  toFontClass,
} from "../helpers";
import { pointerProps } from "../node-events";

const sizes = {
  xsmall: 20,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 96,
  xxlarge: 128,
};

interface AvatarProps {
  children: React.ReactElement[];
  appearance: "circle" | "square";
  size:
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge"
    | "xxlarge"
    | "custom";
  sizeCustom: string;
  backgroundColor: string | undefined;

  outlineStyle: React.CSSProperties["outlineStyle"];
  outlineColor: React.CSSProperties["color"];
  outlineWidth: string | undefined;
  outlineSpacing: number | undefined;

  src: string | undefined;

  text: string | undefined;
  textScale: number;
  textColor: string | undefined;
  textFontFamily: string | undefined;

  label: string | undefined;
  tooltip: string | undefined;

  allowFocus: boolean;
  tabindex: number;

  profilePositionX: string; // ex: "50px"
  profilePositionY: string; // ex: "50px"
  profileRotation: string; // ex: "45deg"
  profileScale: number;
  profileOriginX: string;
  profileOriginY: string;
  profileGrayscale: string;

  style: React.CSSProperties;

  outDesiredSize: (value: number) => void;
  onClick: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function defaultAvatarSvg() {
  return (
    <svg
      width="383"
      height="384"
      viewBox="0 0 383 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M383 192.072C383 297.834 297.263 383.572 191.5 383.572C85.7375 383.572 0 297.834 0 192.072C0 86.309 85.7375 0.571533 191.5 0.571533C297.263 0.571533 383 86.309 383 192.072Z"
        fill="#A9A9A9"
      />
      <mask
        id="mask0_704_239"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="383"
        height="384"
      >
        <circle cx="191.5" cy="192.072" r="191.5" fill="#E2E2E3" />
      </mask>
      <g mask="url(#mask0_704_239)">
        <path
          d="M244.134 243.251C260.038 230.676 271.098 213.093 275.463 193.441C279.829 173.79 277.237 153.259 268.12 135.282C259.003 117.304 243.914 102.968 225.373 94.6692C206.833 86.3706 185.965 84.6123 166.258 89.688C146.55 94.7637 129.196 106.366 117.096 122.556C104.996 138.746 98.8829 158.542 99.7785 178.637C100.674 198.732 108.524 217.909 122.017 232.961C135.509 248.013 153.827 258.03 173.908 261.337C156.996 272.05 143.208 286.941 133.911 304.533C124.613 322.126 120.129 341.809 120.903 361.632L121.273 371.036L201.216 420.015L352.163 361.945L351.793 352.541C350.659 324.403 339.041 297.68 319.169 277.508C299.298 257.335 272.574 245.135 244.134 243.251Z"
          fill="white"
        />
      </g>
    </svg>
  );
}

function AvatarComponent({
  children,
  appearance,
  size,
  sizeCustom,
  backgroundColor,

  outlineStyle,
  outlineColor,
  outlineWidth,
  outlineSpacing,

  src,

  text,
  textScale,
  textColor,
  textFontFamily,

  label,
  tooltip,

  allowFocus,
  tabindex,

  profilePositionX,
  profilePositionY,
  profileRotation,
  profileScale,
  profileOriginX,
  profileOriginY,
  profileGrayscale,

  style,

  outDesiredSize,

  onClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
}: AvatarProps) {
  function calculateDesiredSize() {
    if (size === "custom" && sizeCustom) {
      const sizeCustomNumber = parseInt(sizeCustom);
      if (sizeCustomNumber) {
        return sizeCustomNumber + "px";
      }
    }

    return (sizes[size] || sizes.medium) + "px";
  }

  const desiredSize = calculateDesiredSize();
  outDesiredSize && outDesiredSize(parseInt(desiredSize));

  const rootStyle = {
    display: "block",
    width: desiredSize,
    height: desiredSize,
    flex: `0 0 ${desiredSize}`,
    ...style,
  };

  const outline = createOutline({
    style: outlineStyle,
    width: outlineWidth,
    color: outlineColor,
    spacing: outlineSpacing,
    contentWidth: desiredSize,
  });

  const mainStyle = {
    display: "block",
    borderRadius: appearance === "circle" ? "50%" : "3px",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    flex: "1 1 100%",
    ...outline,
  };

  const innerStyle = {
    borderRadius: appearance === "circle" ? "50%" : "0px",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: backgroundColor || "transparent",
  };

  // default icon
  if (!src || !text) {
    innerStyle.backgroundColor = "#a9a9a9";
  }

  function content() {
    // Use image
    if (src) {
      const transform = createTransform({
        positionX: profilePositionX,
        positionY: profilePositionY,
        rotation: profileRotation,
        scaleX: profileScale,
        scaleY: profileScale,
      });

      const transformOrigin = createTransformOrigin({
        x: profileOriginX,
        y: profileOriginY,
      });

      const filter =
        profileGrayscale !== "0%" ? `grayscale(${profileGrayscale})` : "";

      return (
        <img
          style={{
            width: "100%",
            height: "100%",
            transform,
            transformOrigin,
            filter,
          }}
          src={src}
          alt="avatar"
        />
      );
    }

    // Use text
    if (text) {
      const fontSize = parseInt(desiredSize) * (textScale || 0.5);
      return (
        <span
          style={{
            fontSize: fontSize + "px",
            color: textColor,
            fontFamily: toFontClass(textFontFamily),
          }}
        >
          {text}
        </span>
      );
    }

    // Use fallback icon
    return defaultAvatarSvg();
  }

  // Append extra attributes
  const appendAttributes: React.HTMLAttributes<HTMLSpanElement> = {};
  if (allowFocus) {
    appendAttributes.tabIndex = tabindex;
  }

  return (
    <span className="avatar" style={rootStyle}>
      <span
        style={mainStyle}
        title={tooltip}
        aria-label={label}
        {...pointerProps({
          onMouseEnter,
          onMouseLeave,
          onClick,
        })}
        onFocus={function (evt) {
          evt.stopPropagation();
          onFocus && onFocus();
        }}
        onBlur={function (evt) {
          evt.stopPropagation();
          onBlur && onBlur();
        }}
        {...appendAttributes}
      >
        <span style={innerStyle}>
          {Boolean(children) ? children : content()}
        </span>
      </span>
    </span>
  );
}

export const avatarNode = Noodl.defineReactNode({
  name: "Avatar",
  getReactComponent() {
    return AvatarComponent;
  },
  visualStates: [
    { name: "neutral", label: "Neutral" },
    { name: "hover", label: "Hover" },
  ],
  dynamicports: [
    {
      condition: "size = custom",
      inputs: ["sizeCustom"],
    },
  ],
  inputProps: {
    appearance: {
      displayName: "Appearance",
      group: "Avatar",
      type: {
        name: "enum",
        enums: [
          { label: "Circle", value: "circle" },
          { label: "Square", value: "square" },
        ],
      },
      default: "circle",
      tooltip: {
        standard: "The appearance shape of the avatar.",
      },
      allowVisualStates: true,
    },
    size: {
      displayName: "Size",
      group: "Avatar",
      type: {
        name: "enum",
        enums: [
          { label: "X-Small", value: "xsmall" },
          { label: "Small", value: "small" },
          { label: "Medium", value: "medium" },
          { label: "Large", value: "large" },
          { label: "X-Large", value: "xlarge" },
          { label: "XX-Large", value: "xxlarge" },
          { label: "Custom", value: "custom" },
        ],
      },
      default: "medium",
    },
    sizeCustom: {
      displayName: "Custom Size",
      group: "Avatar",
      type: {
        name: "number",
        units: ["%", "px", "vw", "vh"],
        defaultUnit: "px",
      },
      tooltip: {
        standard:
          "The custom size of the avatar. Only used if size is set to custom.",
      },
    },
    backgroundColor: {
      displayName: "Background Color",
      group: "Avatar",
      type: "color",
      tooltip: {
        standard: "The color of the background.",
      },
      default: "transparent",
      allowVisualStates: true,
    },
    src: {
      displayName: "Image Source",
      group: "Avatar Profile",
      type: "image",
      tooltip: {
        standard: "The source of the image.",
      },
      allowVisualStates: true,
    },
    textFontFamily: {
      displayName: "Text Font Family",
      group: "Avatar Text",
      type: "font",
      tooltip: {
        standard: "The font family of the text.",
      },
      default: "Arial",
    },
    textColor: {
      group: "Avatar Text",
      displayName: "Color",
      type: "color",
      tooltip: {
        standard: "The color of the text.",
      },
      default: "#000000",
    },
    text: {
      group: "Avatar Text",
      displayName: "Text",
      type: "string",
      tooltip: {
        standard: "The text that shall be inside the avatar.",
      },
    },
    textScale: {
      group: "Avatar Text",
      displayName: "Text Scale",
      type: "number",
      tooltip: {
        standard: "The scale of the text.",
      },
      default: 0.5,
      allowVisualStates: true,
    },
    profilePositionX: {
      displayName: "Position X",
      group: "Avatar Profile",
      type: {
        name: "number",
        units: ["%", "px", "vw", "vh"],
        defaultUnit: "px",
      },
      default: 0,
      allowVisualStates: true,
    },
    profilePositionY: {
      displayName: "Position Y",
      group: "Avatar Profile",
      type: {
        name: "number",
        units: ["%", "px", "vw", "vh"],
        defaultUnit: "px",
      },
      default: 0,
      allowVisualStates: true,
    },
    profileRotation: {
      displayName: "Rotation",
      group: "Avatar Profile",
      type: {
        name: "number",
        units: ["deg"],
        defaultUnit: "deg",
      },
      default: 0,
      allowVisualStates: true,
    },
    profileScale: {
      displayName: "Scale",
      group: "Avatar Profile",
      type: {
        name: "number",
      },
      default: 1,
      allowVisualStates: true,
    },
    profileOriginX: {
      displayName: "Transform Origin X",
      group: "Avatar Profile",
      type: {
        name: "number",
        units: ["%", "px", "vw", "vh"],
        defaultUnit: "%",
      },
      default: 50,
      allowVisualStates: true,
    },
    profileOriginY: {
      displayName: "Transform Origin X",
      group: "Avatar Profile",
      type: {
        name: "number",
        units: ["%", "px", "vw", "vh"],
        defaultUnit: "%",
      },
      default: 50,
      allowVisualStates: true,
    },
    profileGrayscale: {
      displayName: "Grayscale",
      group: "Avatar Profile",
      type: {
        name: "number",
        units: ["%"],
        defaultUnit: "%",
      },
      tooltip: {
        standard: "Whether the profile should be grayscaled.",
      },
      default: 0,
      allowVisualStates: true,
    },
    outlineStyle: {
      displayName: "Outline Style",
      group: "Outline",
      type: {
        name: "enum",
        enums: [
          {
            label: "Solid",
            value: "solid",
          },
          {
            label: "Dashed",
            value: "dashed",
          },
          {
            label: "Dotted",
            value: "dotted",
          },
          {
            label: "Double",
            value: "double",
          },
          {
            label: "Groove",
            value: "groove",
          },
          {
            label: "Ridge",
            value: "ridge",
          },
          {
            label: "Inset",
            value: "inset",
          },
          {
            label: "Outset",
            value: "outset",
          },
        ],
      },
      default: "solid",
      tooltip: {
        standard: "The style of the Outline.",
      },
      allowVisualStates: true,
    },
    outlineColor: {
      displayName: "Outline Color",
      group: "Outline",
      type: "color",
      default: "#fff",
      tooltip: {
        standard: "The color of the Outline.",
      },
      allowVisualStates: true,
    },
    outlineWidth: {
      displayName: "Outline Width",
      group: "Outline",
      type: {
        name: "number",
        units: ["%", "px", "vw", "vh"],
        defaultUnit: "px",
      },
      tooltip: {
        standard: "The width of the Outline.",
      },
      allowVisualStates: true,
    },
    outlineSpacing: {
      displayName: "Outline Spacing",
      group: "Outline",
      type: {
        name: "number",
      },
      tooltip: {
        standard: "The space between the avatar and the Outline.",
      },
      default: 0,
    },
    label: {
      group: "Accessibility",
      displayName: "Label",
      type: "string",
      tooltip: {
        standard: "Provide better content to screen readers.",
      },
    },
    tooltip: {
      group: "Accessibility",
      displayName: "Tooltip",
      type: "string",
      tooltip: {
        standard: "Will be displayed as tooltip.",
      },
    },
    allowFocus: {
      displayName: "Allow Focus",
      group: "Accessibility",
      type: "boolean",
      tooltip: {
        standard: "Enable focus on the element.",
      },
      default: true,
    },
    tabindex: {
      group: "Accessibility",
      displayName: "Tab Index",
      type: "number",
      tooltip: {
        standard: "The tab index of the component.",
      },
      default: 0,
    },
  },
  outputProps: {
    outDesiredSize: {
      displayName: "Size",
      type: "number",
      group: "Avatar",
    },
    onClick: {
      displayName: "On Click",
      type: "signal",
      group: "Events",
    },
    onFocus: {
      displayName: "Focused",
      type: "signal",
      group: "Focus",
    },
    onBlur: {
      displayName: "Focus Lost",
      type: "signal",
      group: "Focus",
    },
    onMouseEnter: {
      displayName: "Hover Start",
      type: "signal",
      group: "Hover Events",
      // @ts-expect-error
      props: {
        onMouseEnter() {
          this.setVisualStates(["hover"]);
          this.sendSignalOnOutput("onMouseEnter");
        },
      },
    },
    onMouseLeave: {
      displayName: "Hover End",
      type: "signal",
      group: "Hover Events",
      // @ts-expect-error
      props: {
        onMouseLeave() {
          this.setVisualStates([]);
          this.sendSignalOnOutput("onMouseLeave");
        },
      },
    },
  },
  inputCss: {
    marginLeft: {
      index: 1,
      group: "Margin and padding",
      displayName: "Margin Left",
      type: {
        name: "number",
        units: ["px", "%"],
        defaultUnit: "px",
        marginPaddingComp: "margin-left",
      },
    },
    marginRight: {
      index: 2,
      group: "Margin and padding",
      displayName: "Margin Right",
      type: {
        name: "number",
        units: ["px", "%"],
        defaultUnit: "px",
        marginPaddingComp: "margin-right",
      },
      allowVisualStates: true,
    },
    marginTop: {
      index: 3,
      group: "Margin and padding",
      displayName: "Margin Top",
      type: {
        name: "number",
        units: ["px", "%"],
        defaultUnit: "px",
        marginPaddingComp: "margin-top",
      },
      allowVisualStates: true,
    },
    marginBottom: {
      index: 4,
      group: "Margin and padding",
      displayName: "Margin Bottom",
      type: {
        name: "number",
        units: ["px", "%"],
        defaultUnit: "px",
        marginPaddingComp: "margin-bottom",
      },
      allowVisualStates: true,
    },
  },
});
