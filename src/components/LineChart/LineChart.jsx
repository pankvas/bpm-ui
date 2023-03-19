
import React from 'react'

import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7107/api/Reading`)
      .then(res => {
        console.log(res);
        const bpm = res.data;

        let ReadingTaken = [];
        let SYS = [];
        let PULSE = [];
        let DIA = [];

        bpm.forEach(record => {
          ReadingTaken.push(record.readingTaken)
          SYS.push(record.sys);
          PULSE.push(record.pulse);
          DIA.push(Number(record.dia));
        });

        setChartData({
          labels: ReadingTaken,
          datasets: [
            {
              label: 'DIA',
              data: DIA,
              backgroundColor: ["Blue"]
            },
            {
              label: 'PULSE',
              data: PULSE,
              backgroundColor: ["Yellow"]
            },
            {
              label: 'SYS',
              data: SYS,
              backgroundColor: ["Red"]
            }
          ]
        });
      })
  }, []);

  if (chartData.length === 0) {
    return null;
  }

  console.log("we are rendering");

  return (
    <div>
      <h1>My Chart</h1>
      <Line data={chartData} />
    </div>
  );
}

export default LineChart;