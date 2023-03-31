import { defineChartReactNode } from "../helpers/define";

export const lineNode = defineChartReactNode({
  name: "Line Chart",
  type: "line",
  options: {
    options: [],
  },
  defaultData: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My Data",
        data: [0, 1, 5, 7, 8, 3, 2],
        borderColor: "#00A3F1",
        fill: false,
      },
    ],
  },
});
