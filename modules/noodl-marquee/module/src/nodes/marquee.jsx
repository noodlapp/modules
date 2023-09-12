import React, { useState, useEffect } from "react";
import { defineReactNode } from "@noodl/noodl-sdk";
import Marquee from "react-fast-marquee";

function hexToRgbArray(hex) {
  // Remove the '#' symbol if present
  hex = hex.replace('#', '');

  // Convert the hexadecimal value to decimal
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Return the RGB values as an array
  return [r, g, b];
}

function MarqueeComponent({
  eventHandler,

  autoFill,
  speed,
  delay,
  loop,
  direction,
  gradientEnabled,
  gradientColor,
  gradientWidth,

  children,

  styles,
  className,
}) {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    function handlePlay() {
      setIsPlaying(true);
    }

    function handlePause() {
      setIsPlaying(false);
    }

    function handleToggle() {
      setIsPlaying(last => !last);
    }

    eventHandler.addEventListener('play', handlePlay);
    eventHandler.addEventListener('pause', handlePause);
    eventHandler.addEventListener('toggle', handleToggle);

    return function () {
      eventHandler.removeEventListener('play', handlePlay);
      eventHandler.removeEventListener('pause', handlePause);
      eventHandler.removeEventListener('toggle', handleToggle);
    };
  }, []);

  return (
    <Marquee
      play={isPlaying}
      autoFill={autoFill}
      direction={direction}
      speed={speed}
      delay={delay}
      loop={loop}
      gradient={gradientEnabled}
      gradientColor={hexToRgbArray(gradientColor)}
      gradientWidth={gradientWidth}
      style={styles}
      className={className}
    >
      {children}
    </Marquee>
  );
}

export default defineReactNode({
  name: "noodl.marquee",
  displayName: "Marquee",
  getReactComponent() {
    return MarqueeComponent;
  },
  inputProps: {
    autoFill: {
      displayName: "Auto Fill",
      group: "General",
      type: "boolean",
      default: true,
    },
    speed: {
      displayName: "Speed",
      group: "General",
      type: "number",
      default: 30,
    },
    delay: {
      displayName: "Delay",
      group: "General",
      type: "number",
      default: 0,
    },
    loop: {
      displayName: "Loop",
      group: "General",
      type: {
        name: "number",
      },
      default: 0,
    },
    direction: {
      displayName: "Direction",
      group: "General",
      type: {
        name: "enum",
        enums: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
          { label: "Up", value: "up" },
          { label: "Down", value: "down" },
        ],
      },
      default: "left",
    },
    gradientEnabled: {
      displayName: "Enabled",
      group: "Gradient",
      type: "boolean",
      default: true,
    },
    gradientColor: {
      displayName: "Color",
      group: "Gradient",
      type: "color",
      default: "#ffffff",
    },
    gradientWidth: {
      displayName: "Width",
      group: "Gradient",
      type: "number",
      default: 200,
    },
  },
  initialize() {
    this.props.eventHandler = new EventTarget();
  },
  signals: {
    Pause() {
      this.props.eventHandler.dispatchEvent(new Event("pause"));
    },
    Play() {
      this.props.eventHandler.dispatchEvent(new Event("play"));
    },
    Toggle() {
      this.props.eventHandler.dispatchEvent(new Event("toggle"));
    }
  }
});
