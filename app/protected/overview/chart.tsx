"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format, parse } from "date-fns";
import { useEffect, useState } from "react";
import { MonthWiseTransaction } from "@/types";
import { useProtectedState } from "@/state/ProtectedContext";

const chartConfig = {
  totalTransactions: {
    label: "Total Transactions:",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function Chart() {
  const year = format(new Date(), "yyyy");
  const [chartData, setChartData] = useState([]);
  const { state } = useProtectedState();

  const loadCardData = async () => {
    const resp: Response = await fetch(`/api/protected/overview/chart`);
    if (!resp.ok) {
      throw new Error(`Failed to fetch transactions: ${resp.statusText}`);
    }
    const { data } = await resp.json();
    const formattedList = data.map((item: MonthWiseTransaction) => {
      const parsedDate = parse(item.month, 'yyyy-MM', new Date()); // Convert string to Date
      const monthName = format(parsedDate, 'MMMM'); // Convert to full month name
      return ({
        ...item,
        totalTransactions: item.total_transactions,
        month: monthName
      });
    });
    setChartData(formattedList);
    return data;
  };

  useEffect(() => {
    loadCardData();
  }, [state.transactionRefreshToken]);

  return (
    <div className="border rounded-md px-3 py-4 w-full [&_[data-chart]]:max-h-[35vh]">
      <CardHeader>
        <CardTitle>Expense Curvature</CardTitle>
        <CardDescription>January - December {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 25,
              right: 30,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="totalTransactions"
              type="natural"
              stroke="var(--color-totalTransactions)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-totalTransactions)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </div>
  );
}
