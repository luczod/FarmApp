import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
  ResponsiveContainer,
} from "recharts";

import { Containers, ChartContainer, Header, LegendContainer } from "./styles";

interface ILineChartBoxProps {
  data: {
    nameX: string;
    valor: number;
    valor2?: number;
  }[];
  titulo: string;
  fillColor: string;
}

const CustomizedLabel: React.FC<any> = (props: any) => {
  const { x, y, stroke, value } = props;

  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={15} textAnchor="middle">
      {value}
    </text>
  );
};

const CustomizedAxisTick: React.FC<any> = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const LineChartBox: React.FC<ILineChartBoxProps> = ({
  data,
  titulo,
  fillColor,
}) => (
  <Containers>
    <Header>
      <h2>{titulo}</h2>
    </Header>

    <ChartContainer>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 15,
            left: -30,
            right: 30,
            bottom: -10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nameX" height={80} tick={<CustomizedAxisTick />} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="valor"
            stroke={fillColor}
            activeDot={{ r: 8 }}
          >
            <LabelList content={<CustomizedLabel />} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Containers>
);

// #82ca9d

export default LineChartBox;
