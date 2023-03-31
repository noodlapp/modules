import { defineChartReactNode } from "../helpers/define";
import * as Utils from "../helpers/utils";

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const labels = Utils.months({ count: 7 });
const defaultData = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.CHART_COLORS.transparent_red,
    },
    {
      label: "Dataset 2",
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.CHART_COLORS.transparent_blue,
    },
  ],
};

export const radarNode = defineChartReactNode({
  name: "Radar Chart",
  type: "radar",
  options: {
    options: [],
  },
  defaultData,
});
