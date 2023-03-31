import { generateEnum } from "../helpers/boilerplate";
import { defineChartReactNode } from "../helpers/define";
import * as Utils from "../helpers/utils";

const labels = Utils.months({ count: 7 });
const defaultData = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => {
        return [Utils.rand(-100, 100), Utils.rand(-100, 100)];
      }),
      backgroundColor: Utils.CHART_COLORS.red,
    },
    {
      label: "Dataset 2",
      data: labels.map(() => {
        return [Utils.rand(-100, 100), Utils.rand(-100, 100)];
      }),
      backgroundColor: Utils.CHART_COLORS.blue,
    },
  ],
};

export const barNode = defineChartReactNode({
  name: "Bar Chart",
  type: "bar",
  options: {
    options: [
      {
        group: "General Options",
        name: "indexAxis",
        type: generateEnum(["x", "y"]),
        transformFrom: () => "x",
      },
    ],
  },
  defaultData,
});
