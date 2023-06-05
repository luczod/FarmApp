import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { Container, ChartContainer, Header, LegendContainer } from "./styles";

interface IBarChartBoProps {
  data: {
    nameX: string;
    valor: number;
  }[];
  titulo: string;
  fillColor: string;
}

const BarChartBox: React.FC<IBarChartBoProps> = ({
  data,
  titulo,
  fillColor,
}) => (
  <Container>
    <Header>
      <h2>{titulo}</h2>

      <LegendContainer></LegendContainer>
    </Header>

    <ChartContainer>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="nameX"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis type="number" domain={[0, 50]} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="valor" fill={fillColor} background={{ fill: "#eee" }} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Container>
);

export default BarChartBox;
