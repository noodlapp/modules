import { Chart } from "chart.js";
import { defineChartReactNode } from "../helpers/define";

function degToRad(degrees: number) {
  return (degrees / 180) * Math.PI;
}

function radToDeg(radians: number) {
  return (radians / Math.PI) * 180;
}

export const pieNode = defineChartReactNode({
  name: "Pie Chart",
  type: "pie",
  docs: "https://docs.noodl.net/library/modules/chartjs/nodes/pie",
  options: {
    defaults: Chart.defaults.get("pie"),
    group: "Pie Options",
    options: [
      { name: "cutoutPercentage" },
      {
        name: "circumference",
        transformTo: degToRad,
        transformFrom: radToDeg,
      },
      { name: "rotation", transformTo: degToRad, transformFrom: radToDeg },
    ],
  },
  defaultData: {
    datasets: [
      {
        data: [10, 20, 30],
        backgroundColor: ["#FF5382", "#FFCC34", "#00A3F1"],
      },
    ],
    labels: ["Red", "Yellow", "Blue"],
  },
});
