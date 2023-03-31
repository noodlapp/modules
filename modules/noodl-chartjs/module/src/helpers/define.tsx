import * as Noodl from "@noodl/noodl-sdk";
import { useCallback } from "react";
import { Chart, ChartConfiguration, ChartTypeRegistry } from "chart.js";
import { generateInputs, generateInputsChanged } from "./boilerplate";
import { chart_changed, chart_inputs, chart_options } from "./defaults";

export interface ChartNodeOptions {
  name: string;

  type: keyof ChartTypeRegistry;
  options: any;
  defaultData: any;
}

//a simple canvas to render the chart.js chart to
function Canvas(props: any): JSX.Element {
  const ref = useCallback((node: HTMLCanvasElement) => {
    props.onCanvasChanged(node);
  }, []);

  return <canvas ref={ref} />;
}

export function defineChartReactNode(args: ChartNodeOptions) {
  return Noodl.defineReactNode<{
    props: any;
    chart: any;
  }>({
    name: args.name,
    category: "chart.jsc",
    initialize() {
      this.props.onCanvasChanged = (node: HTMLCanvasElement) => {
        if (this.chart) {
          this.chart.destroy();
        }
        if (node) {
          // @ts-expect-error
          this.initChart(node);
        }
      };
    },
    getReactComponent() {
      return Canvas;
    },
    inputs: {
      ...generateInputs(args.options),
      ...chart_inputs,
      data: {
        type: "*",
        displayName: "Data",
      },
      scales: {
        type: "*",
        displayName: "Scales",
      },
    },
    outputs: {
      chartOptions: {
        type: "object",
        displayName: "Chart Options (for debugging)",
      },
    },
    changed: {
      ...generateInputsChanged(args.options),
      ...chart_changed,
      data(value) {
        if (!this.chart) return;
        this.chart.data = value;
        this.chart.update();
      },
      scales(value) {
        if (!this.chart) return;
        this.chart.options.scales = value;
        this.chart.update();
      },
    },
    methods: {
      setOptions(target, { options, namespace }) {
        if (namespace) {
          namespace.split(".").forEach((p) => {
            if (!target[p]) target[p] = {};
            target = target[p];
          });
        }

        options.forEach((option) => {
          const name = option.name || option;
          const inputName = namespace ? namespace + "." + name : name;

          if (this.inputs.hasOwnProperty(inputName)) {
            const newValue = option.transformTo
              ? option.transformTo(this.inputs[inputName])
              : this.inputs[inputName];

            target[name] = newValue;
          }
        });
      },
      initChart(canvas: HTMLCanvasElement) {
        const options = {};

        // @ts-expect-error
        if (args.options) this.setOptions(options, args.options);

        for (let index = 0; index < chart_options.length; index++) {
          const element = chart_options[index];

          // @ts-expect-error
          this.setOptions(options, element);
        }

        // @ts-expect-error
        options.scales = this.inputs.scales;

        this.setOutputs({
          chartOptions: options,
        });

        const chartConfig: ChartConfiguration<any, any, any> = {
          type: args.type,
          options,
          data: this.inputs.data || args.defaultData,
        };

        this.chart = new Chart(canvas, chartConfig);
      },
    },
  });
}
