import { defineChartReactNode } from "../helpers/define";
import * as Utils from "../helpers/utils";

const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const defaultData = {
  labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  datasets: [
    {
      label: 'Dataset 1',
      data: Utils.numbers(NUMBER_CFG),
      backgroundColor: Object.values(Utils.CHART_COLORS),
    }
  ]
};

export const doughnutNode = defineChartReactNode({
  name: "Doughnut Chart",
  type: "doughnut",
  options: {
    options: [],
  },
  defaultData,
});
