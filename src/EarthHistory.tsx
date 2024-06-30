import React, { useEffect, useRef, useState } from "react";
import { List, Typography } from "antd";
import Chart from "chart.js/auto";
import "./EarthHistory.css";

interface GeologicalAge {
  name: string;
  color: string;
  startTime: number;
  endTime: number;
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

const EarthHistory: React.FC = () => {
  const chartRef = useRef<Chart<"pie"> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const createChart = () => {
      // Ensure canvas element and Chart.js are available
      const ctx = canvasRef.current;
      if (!ctx) return;

      // Check if there's an existing chart instance and destroy it
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create new chart instance
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
      });
    };

    createChart();

    // Cleanup function
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
      <div className="geological-ages-list">
        <h2>Geological Ages</h2>
        <List
          dataSource={geologicalAges}
          renderItem={(item) => (
            <List.Item style={{ backgroundColor: item.color }}>
              <Typography.Text style={{ color: "#ffffff" }}>
                {`${item.name}: ${item.startTime.toFixed(
                  2
                )} - ${item.endTime.toFixed(2)} hours`}
              </Typography.Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default EarthHistory;
