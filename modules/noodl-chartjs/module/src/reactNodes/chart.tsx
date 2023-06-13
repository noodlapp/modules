import { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js";
import * as ChartHelpers from "chart.js/helpers";

function didDataChange(newConfig: unknown, oldConfigJson: string) {
  const copy = JSON.parse(JSON.stringify(newConfig));
  delete copy.data;
  const json = JSON.stringify(copy);
  return [json !== oldConfigJson, json];
}

function Component(props: any): JSX.Element {
  const canvasRef = useRef(null);
  const sizerRef = useRef(null);
  const fixedSizeRef = useRef(null);
  const instance = useRef(null);
  const lastConfigJson = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].target.getBoundingClientRect();
      fixedSizeRef.current.style.width = `${width}px`;
      fixedSizeRef.current.style.height = `${height}px`;
    });

    resizeObserver.observe(sizerRef.current);

    return () => {
      resizeObserver.unobserve(sizerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (typeof props.scriptSetup === "undefined") return;

    let chartConfig: any = {};

    try {
      const funcScript = `
const Inputs = { data: ${JSON.stringify(props.data)} };
const helpers = this.helpers;
let config = {};
(() => {${props.scriptSetup}})();
return { config };`;
      const func = new Function(funcScript);
      const result = func.apply({ helpers: ChartHelpers });
      if (typeof result === "object") {
        chartConfig = result.config;
      }
    } catch (error) {
      throw error;
    }

    const [didBaseConfigChanged, configJson] = didDataChange(
      chartConfig,
      lastConfigJson.current
    );
    lastConfigJson.current = configJson;

    if (instance.current) {
      if (!didBaseConfigChanged) {
        // Update only the data
        instance.current.data = chartConfig.data;
        instance.current.update();
        return;
      }

      // Recreate Chart
      instance.current.destroy();
      instance.current = null;
    }

    instance.current = new Chart(
      canvasRef.current,
      chartConfig as ChartConfiguration<any, any, any>
    );
  }, [canvasRef.current, props.scriptSetup, props.data]);

  useEffect(() => {
    if (instance.current) {
      instance.current.destroy();
      instance.current = null;
    }
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={sizerRef} style={{ position: "absolute", inset: 0 }}></div>
      <div style={{ position: "absolute", inset: 0 }}>
        <div ref={fixedSizeRef} style={{ position: "relative" }}>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
}

export const chartNode = {
  name: "noodl.chart-js.chart",
  displayName: "Chart",
  category: "chart.js",
  getReactComponent() {
    return Component;
  },
  inputProps: {
    scriptSetup: {
      type: {
        name: "string",
        codeeditor: "javascript",
        allowEditOnly: true,
      },
      displayName: "Script",
      group: "General",
    },
    data: {
      type: "*",
      displayName: "Data",
      group: "General",
    },
  },
};
