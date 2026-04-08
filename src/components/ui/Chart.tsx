import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";
import Card from "./Card";
import { useThemeStore } from "../../lib/store/themeStore";
import { useEffect, useState } from "react";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  title: string;
  labels: string[];
  values: number[];
}

export default function Chart({ title, labels, values }: ChartProps) {
  const { isDark } = useThemeStore();
  const [gold, setGold] = useState("");

  useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-gold")
      .trim();

    setGold(value);
  }, [isDark]);

  const gridColor = isDark
    ? "rgba(255,255,255,0.05)"
    : "rgba(0,0,0,0.08)";

  const getGradient = (ctx: any, chartArea: any) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom
    );

    gradient.addColorStop(
      0,
      isDark ? "rgba(212, 175, 55, 0.3)" : "rgba(166, 124, 82, 0.8)"
    );

    gradient.addColorStop(1, "rgba(212, 175, 55, 0)");

    return gradient;
  };

  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: gold,
        backgroundColor: (context: any) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return;
          return getGradient(ctx, chartArea);
        },
        fill: true,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: gold,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
        titleColor: gold,
        bodyColor: gold,
        borderColor: gold,
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `Value: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: gold,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: gold,
          callback: function (value: any) {
            // Hide ticks if screen width <= 425px
            return window.innerWidth <= 425 ? "" : value;
          },
        },
        grid: {
          color: gridColor,
        },
      },
    },
  };

  return (
    <Card className="w-full h-[300px] md:h-[500px]">
      <h2 className="font-sans text-gold text-base sm:text-lg font-bold mb-4 sm:mb-8">
        {title}
      </h2>

      <div className="h-[85%] w-full">
        <Line
          key={isDark ? "dark" : "light"} // force re-render on theme change
          data={data}
          options={options}
        />
      </div>
    </Card>
  );
}

export const ChartSkeleton =  () => {
  return (
    <Card className="flex flex-col gap-5 w-full h-[300px] md:h-[500px] animate-pulse">
      <div className="w-[40%] h-10 bg-loading rounded-md"></div>
      <div className="w-full flex-1 bg-loading rounded-md"></div>
    </Card>
  )
}