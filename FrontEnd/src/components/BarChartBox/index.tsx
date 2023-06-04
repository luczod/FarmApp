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
    name: string;
    valor: number;
  }[];
}

const BarChartBox: React.FC<IBarChartBoProps> = ({ data }) => (
  <Container>
    <Header>
      <h2>Despesas em porcentagem(%)</h2>

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
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis type="number" domain={[0, 50]} />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="valor" fill="#d3d01a" background={{ fill: "#eee" }} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  </Container>
);

export default BarChartBox;
