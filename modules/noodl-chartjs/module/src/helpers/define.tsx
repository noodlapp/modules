import * as Noodl from "@noodl/noodl-sdk";
import { useCallback } from "react";
import { Chart, ChartConfiguration, ChartTypeRegistry } from "chart.js";
import { generateInputs, generateInputsChanged } from "./boilerplate";
import { chart_changed, chart_inputs, chart_options } from "./defaults";

export interface ChartNodeOptions {
  name: string;
  docs?: string;

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
    docs: args.docs,
    category: "chart.js",
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
      onBeforeEvent: {
        group: "Before Event",
        type: "signal",
        displayName: "Before",
      },
      beforeEventChart: {
        group: "Before Event",
        type: "*",
        displayName: "Chart",
        editorName: "Before Event Chart",
      },
      beforeEventArgs: {
        group: "Before Event",
        type: "*",
        displayName: "Args",
        editorName: "Before Event Args",
      },
      onClick: {
        group: "Click Event",
        type: "signal",
        displayName: "Click",
      },
      clickEventData: {
        group: "Click Event",
        type: "object",
        displayName: "Data",
        editorName: "Click Data",
      },
      chartOptions: {
        group: "Debug",
        type: "object",
        displayName: "Chart.js Options",
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
        const options = {
          onClick: (e) => {
            this.setOutputs({ clickEventData: e });
            this.sendSignalOnOutput("onClick");
          },
        };

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

        const haveConnection = (portName: string) => {
          return this.model.component.connections.findIndex((x) =>
            x.sourceId === this.id && x.sourcePort === portName ||
            x.targetId === this.id && x.targetPort === portName
          ) !== -1;
        }

        const chartConfig: ChartConfiguration<any, any, any> = {
          type: args.type,
          options,
          // Only use default data if there is no connection
          data: this.inputs.data || haveConnection('data') ? {} : args.defaultData,
          plugins: [
            {
              id: 'noodlEventCatcher',
              beforeEvent: (chart, args, pluginOptions) => {
                try {
                  this.setOutputs({
                    beforeEventChart: chart,
                    beforeEventArgs: args,
                  });
                  this.sendSignalOnOutput("onBeforeEvent");
                } catch (error) {
                  /* noop */
                }
              },
            }
          ]
        };

        this.chart = new Chart(canvas, chartConfig);
      },
    },
  });
}
