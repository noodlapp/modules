export interface BoxShadowOptions {
  offsetShadow: {
    inset: boolean;
    width: string | undefined;
    color: string | undefined;
  };
  ringShadow:
    | {
        inset: boolean;
        width: string | undefined;
        color: string | undefined;
      }
    | undefined;
  shadow: {} | undefined;
}

export function createBoxShadow({
  offsetShadow,
  ringShadow,
  shadow,
}: BoxShadowOptions) {
  let result = [];

  // Add all offset props
  if (offsetShadow) {
    if (offsetShadow.inset) result.push("inset");
    result.push("0 0 0");
    result.push(offsetShadow.width || 0);
    result.push(offsetShadow.color || "rgb(0, 0, 0)");
    result.push(",");
  } else {
    result.push(",");
  }

  // Add ring shadow
  if (ringShadow) {
    if (ringShadow.inset) result.push("inset");
    result.push("0 0 0");
    result.push(`calc(2px + ${ringShadow.width || 0})`);
    result.push(ringShadow.color || "rgb(0, 0, 0)");
    result.push(",");
  } else {
    result.push("0 0 #0000,");
  }

  if (shadow) {
    result.push("0 1px 2px 0 rgb(0 0 0/0.05)");
  } else {
    result.push("0 0 #0000");
  }

  return result.join(" ");
}

export interface OutlineOptions {
  style: React.CSSProperties["outlineStyle"];
  color: string | undefined;
  width: string | undefined;
  spacing: number | undefined;
  contentWidth: string | undefined;
}

export function createOutline({
  style,
  color,
  width,
  spacing,
  contentWidth,
}: OutlineOptions) {
  if (!width) return {};

  const smoothWidth = Math.round(parseInt(width) * 100) / 100;
  const desiredBorder = smoothWidth + Math.max(spacing || 0, 0);

  return {
    margin: `-${desiredBorder}px`,
    padding: `${spacing}px`,
    width: `calc(${contentWidth} + ${desiredBorder}px * 2)`,
    height: `calc(${contentWidth} + ${desiredBorder}px * 2)`,
    border: `${smoothWidth}px ${style || "solid"} ${color || "rgb(0, 0, 0)"}`,
  };
}

export interface TransformOptions {
  positionX: string | undefined;
  positionY: string | undefined;
  rotation: string | undefined;
  scaleX: number | undefined;
  scaleY: number | undefined;
}

export function createTransform({
  positionX,
  positionY,
  rotation,
  scaleX,
  scaleY,
}: TransformOptions) {
  let result = [];

  if (positionX && positionX !== "0px") result.push(`translateX(${positionX})`);
  if (positionY && positionY !== "0px") result.push(`translateY(${positionY})`);
  if (rotation && rotation !== "0deg") result.push(`rotate(${rotation})`);

  if ((scaleX && scaleX !== 1) || (scaleY && scaleY !== 1)) {
    result.push(`scale(${scaleX || 1}, ${scaleY || 1})`);
  }

  return result.join(" ");
}

export function createTransformOrigin({ x, y }: { x: string; y: string }) {
  if (!x && !y) return undefined;
  if (x === "50%" && y === "50%") return undefined;
  return `${x} ${y}`;
}

/**
 * Returns a converted Noodl Family Font to a CSS font family.
 *
 * @param family The file path of font family to convert.
 * @returns The CSS font family name.
 */
export function toFontClass(family: string) {
  if (family && family.split(".").length > 1) {
    family = family.replace(/\.[^/.]+$/, "");
    family = family.split("/").pop();
  }
  return family;
}
