import { defineChartReactNode } from "../helpers/define";
import * as Utils from "../helpers/utils";

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, rmin: 5, rmax: 15, min: 0, max: 100 };

const labels = Utils.months({ count: 7 });
const defaultData = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.CHART_COLORS.transparent_red,
    },
    {
      label: "Dataset 2",
      data: Utils.bubbles(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.orange,
      backgroundColor: Utils.CHART_COLORS.transparent_orange,
    },
  ],
};

export const bubbleNode = defineChartReactNode({
  name: "Bubble Chart",
  type: "bubble",
  options: {
    options: [],
  },
  defaultData,
});
