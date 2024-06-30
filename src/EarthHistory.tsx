import React, { useEffect, useRef } from "react";
import { List, Typography } from "antd";
import Chart from "chart.js/auto";
import "./EarthHistory.css";

interface GeologicalAge {
  name: string;
  color: string;
  startTime: number;
  endTime: number;
}

interface GeologicalEvent {
  name: string;
  color: string;
  timeInHours: number;
  description: string;
}

const geologicalAges: GeologicalAge[] = [
  { name: "Hadean", color: "#ff4136", startTime: 0, endTime: 0.5 },
  { name: "Archaean", color: "#ff851b", startTime: 0.5, endTime: 14.5 },
  { name: "Proterozoic", color: "#ffdc00", startTime: 14.5, endTime: 23 },
  { name: "Paleozoic", color: "#2ecc40", startTime: 23, endTime: 23.544 },
  { name: "Mesozoic", color: "#39cccc", startTime: 23.544, endTime: 23.854 },
  { name: "Cenozoic", color: "#0074d9", startTime: 23.854, endTime: 23.9978 },
  { name: "Quaternary", color: "#b10dc9", startTime: 23.9978, endTime: 24 },
];

const geologicalEvents: GeologicalEvent[] = [
  {
    name: "Formation of Earth",
    color: "#ff4136",
    timeInHours: 0,
    description: "Formation of Earth",
  },
  {
    name: "Formation of the Moon",
    color: "#ff851b",
    timeInHours: 0.5,
    description: "Formation of the Moon",
  },
  {
    name: "Formation of First Crust and Oceans",
    color: "#ffdc00",
    timeInHours: 1.2,
    description: "Formation of First Crust and Oceans",
  },
  {
    name: "First Evidence of Life",
    color: "#2ecc40",
    timeInHours: 4.4,
    description: "First Evidence of Life",
  },
  {
    name: "Photosynthesis and Oxygenation",
    color: "#39cccc",
    timeInHours: 8,
    description: "Photosynthesis and Oxygenation",
  },
  {
    name: "Eukaryotic Cells Appear",
    color: "#0074d9",
    timeInHours: 16,
    description: "Eukaryotic Cells Appear",
  },
  {
    name: "Cambrian Explosion",
    color: "#b10dc9",
    timeInHours: 21.42,
    description: "Cambrian Explosion",
  },
  {
    name: "Ordovician-Silurian Extinction",
    color: "#85144b",
    timeInHours: 21.85,
    description: "Ordovician-Silurian Extinction",
  },
  {
    name: "Age of Fishes",
    color: "#FF851B",
    timeInHours: 22.25,
    description: "Age of Fishes",
  },
  {
    name: "Permian-Triassic Extinction",
    color: "#FF4136",
    timeInHours: 22.96,
    description: "Permian-Triassic Extinction",
  },
  {
    name: "Mesozoic Era",
    color: "#39CCCC",
    timeInHours: 23,
    description: "Mesozoic Era",
  },
  {
    name: "Cretaceous-Paleogene Extinction",
    color: "#2ECC40",
    timeInHours: 23.66,
    description: "Cretaceous-Paleogene Extinction",
  },
  {
    name: "Neogene Period",
    color: "#FFDC00",
    timeInHours: 23.93,
    description: "Neogene Period",
  },
  {
    name: "Quaternary Period",
    color: "#0074D9",
    timeInHours: 23.97,
    description: "Quaternary Period",
  },
  {
    name: "Holocene Epoch",
    color: "#B10DC9",
    timeInHours: 23.999,
    description: "Holocene Epoch",
  },
];

const EarthHistory: React.FC = () => {
  const chartRef = useRef<Chart<"pie"> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const createChart = () => {
      const ctx = canvasRef.current;
      if (!ctx) return;

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const clockLabelsPlugin = {
        id: "clockLabels",
        afterDraw(chart) {
          const {
            ctx,
            chartArea: { top, right, bottom, left, width, height },
          } = chart;
          const centerX = (left + right) / 2;
          const centerY = (top + bottom) / 2;
          const radius = Math.min(width, height) / 2;
          const innerRadius = radius * 0.7; // To place the lines outside the pie chart

          const positions = [
            { hour: 6, angle: Math.PI / 2 },
            { hour: 12, angle: Math.PI },
            { hour: 18, angle: (3 * Math.PI) / 2 },
            { hour: 24, angle: 0 },
          ];

          ctx.save();
          ctx.font = "16px Arial";
          ctx.fillStyle = "#000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // Draw clock hour labels
          positions.forEach(({ hour, angle }) => {
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            ctx.fillText(hour.toString(), x, y);
          });

          ctx.restore();

          // Draw event lines and labels
          geologicalEvents.forEach((event) => {
            const angle = (event.timeInHours / 24) * 2 * Math.PI - Math.PI / 2;
            const xOuter = centerX + radius * Math.cos(angle);
            const yOuter = centerY + radius * Math.sin(angle);
            const xInner = centerX + innerRadius * Math.cos(angle);
            const yInner = centerY + innerRadius * Math.sin(angle);

            ctx.beginPath();
            ctx.moveTo(xInner, yInner);
            ctx.lineTo(xOuter, yOuter);
            ctx.strokeStyle = event.color;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Place event labels near the outer line
            ctx.save();
            ctx.translate(xOuter, yOuter);
            ctx.rotate(angle);
            ctx.fillStyle = event.color;
            ctx.textAlign =
              angle > Math.PI / 2 && angle < (3 * Math.PI) / 2
                ? "right"
                : "left";
            ctx.textBaseline = "middle";
            ctx.fillText(
              event.name,
              angle > Math.PI / 2 && angle < (3 * Math.PI) / 2 ? -10 : 10,
              0
            );
            ctx.restore();
          });
        },
      };

      chartRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: geologicalAges.map((age) => age.name),
          datasets: [
            {
              data: geologicalAges.map((age) => age.endTime - age.startTime),
              backgroundColor: geologicalAges.map((age) => age.color),
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  if (tooltipItem.dataset) {
                    const dataIndex = tooltipItem.dataIndex as number;
                    const dataset = tooltipItem.dataset.data as number[];
                    const label = geologicalAges[dataIndex].name;
                    const value = dataset[dataIndex];
                    return `${label}: ${value.toFixed(2)} hours`;
                  }
                  return "";
                },
              },
            },
            legend: {
              display: false,
            },
            clockLabels: {
              afterDraw: clockLabelsPlugin.afterDraw,
            },
          },
          onClick: (evt) => {
            const activeElement = chartRef.current?.getElementsAtEventForMode(
              evt,
              "nearest",
              { intersect: true },
              false
            )[0];
            if (activeElement) {
              const index = activeElement.index as number;
              const age = geologicalAges[index];
              alert(
                `${age.name}: ${age.startTime.toFixed(
                  2
                )} - ${age.endTime.toFixed(2)} hours`
              );
            }
          },
        },
        plugins: [clockLabelsPlugin],
      });
    };

    createChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div className="earth-history-container">
      <canvas id="geologicalAgesChart" ref={canvasRef} />
      <div className="geological-events-list">
        <h2>Geological Events</h2>
        <List
          dataSource={geologicalEvents}
          renderItem={(item) => (
            <List.Item style={{ backgroundColor: item.color }}>
              <Typography.Text style={{ color: "#ffffff" }}>
                {`${item.name}: ${Math.floor(item.timeInHours)} hours and ${(
                  (item.timeInHours % 1) *
                  60
                ).toFixed(0)} minutes`}
              </Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default EarthHistory;
