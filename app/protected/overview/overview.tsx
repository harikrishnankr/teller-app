"use client";

import { Heading } from "@/components/ui/heading";
import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
  subDays,
} from "date-fns";
import { useEffect, useState } from "react";
import { Chart } from "./chart";
import { useProtectedState } from "@/state/ProtectedContext";

const Card = ({ label, value }: { label: string; value: number }) => {
  return (
    <div className="border rounded-md px-3 py-4 min-w-32 flex-1">
      <div className="mb-3">{label}</div>
      <div className="font-semibold text-2xl">₹ {value?.toFixed(2)}</div>
    </div>
  );
};

export function Overview() {
  const [yearSum, setYearSum] = useState(0);
  const [monthSum, setMonthSum] = useState(0);
  const [yesterdaySum, setYesterdaySum] = useState(0);
  const [todaySum, setTodaySum] = useState(0);
  const { state } = useProtectedState();

  const loadCardData = async (from: string, to: string) => {
    const resp: Response = await fetch(`/api/protected/overview/aggregate`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        from,
        to,
      }),
    });
    if (!resp.ok) {
      throw new Error(`Failed to fetch transactions: ${resp.statusText}`);
    }
    const { data } = await resp.json();
    return data;
  };

  const getThisYear = async () => {
    const firstDayOfYear = startOfYear(new Date());
    const lastDayOfYear = endOfYear(new Date());
    const data = await loadCardData(
      format(firstDayOfYear, "MM/dd/yyyy"),
      format(lastDayOfYear, "MM/dd/yyyy")
    );
    setYearSum(data[0].sum ?? 0.0);
  };

  const getThisMonth = async () => {
    const firstDay = startOfMonth(new Date());
    const lastDay = endOfMonth(new Date());
    const data = await loadCardData(
      format(firstDay, "MM/dd/yyyy"),
      format(lastDay, "MM/dd/yyyy")
    );
    setMonthSum(data[0].sum ?? 0.0);
  };

  const getYesterday = async () => {
    const yesterday = subDays(new Date(), 1);
    const data = await loadCardData(
      format(yesterday, "MM/dd/yyyy"),
      format(yesterday, "MM/dd/yyyy")
    );
    setYesterdaySum(data[0].sum ?? 0.0);
  };

  const getToday = async () => {
    const today = new Date();
    const data = await loadCardData(
      format(today, "MM/dd/yyyy"),
      format(today, "MM/dd/yyyy")
    );
    setTodaySum(data[0].sum ?? 0.0);
  };

  useEffect(() => {
    getThisYear();
    getThisMonth();
    getYesterday();
    getToday();
  }, [state.transactionRefreshToken]);

  return (
    <>
      <Heading>Overview</Heading>
      <div className="flex gap-3 flex-wrap justify-between">
        <Card label="Today" value={todaySum} />
        <Card label="Yesterday" value={yesterdaySum} />
        <Card label="This Month" value={monthSum} />
        <Card label="This Year" value={yearSum} />
      </div>
      <div className="mt-3">
        <Chart />
      </div>
    </>
  );
}
