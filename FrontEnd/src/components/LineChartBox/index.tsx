import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Containers, ChartContainer, Header, LegendContainer } from "./styles";

interface ILineChartBoxProps {
  data: {
    nameX: string;
    valor: number;
  }[];
  titulo: string;
  fillColor: string;
}

const LineChartBox: React.FC<ILineChartBoxProps> = ({
  data,
  titulo,
  fillColor,
}) => (
  <Containers>
    <Header>
      <h2>{titulo}</h2>

      <LegendContainer></LegendContainer>
    </Header>

    <ChartContainer>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nameX" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="valor"
            stroke={fillColor}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Containers>
);

// #82ca9d

export default LineChartBox;
