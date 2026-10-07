"use client";

import { useMemo, useState } from "react";
import { CalendarDay } from "./CalendarDay";
import { DayModal } from "./DayModal";
import { useTodos } from "./TodosContext";
import { toDateKey, todayKey } from "./shared";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function Calendar() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const { todosByDate } = useTodos();
  const today = todayKey();

  const cells = useMemo(() => {
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    // Monday-first offset: JS getDay() 0=Sun..6=Sat
    const firstOffset = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7;
    const result: ({ key: string; day: number } | null)[] = [];
    for (let i = 0; i < firstOffset; i++) result.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      result.push({ key: toDateKey(new Date(viewYear, viewMonth, d)), day: d });
    }
    return result;
  }, [viewYear, viewMonth]);

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const go = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(d.getFullYear());
    setViewMonth(d.getMonth());
  };

  return (
    <div className="m-5 inline-flex flex-col">
      <div className="flex items-center justify-between mb-3 w-full">
        <button type="button" onClick={() => go(-1)} className="rounded bg-zinc-700 px-3 py-1 text-sm hover:bg-zinc-600">{"< Prev"}</button>
        <span className="font-semibold text-gray-200">{monthLabel}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              const t = new Date();
              setViewYear(t.getFullYear());
              setViewMonth(t.getMonth());
            }}
            className="rounded bg-zinc-700 px-3 py-1 text-sm hover:bg-zinc-600"
          >
            Today
          </button>
          <button type="button" onClick={() => go(1)} className="rounded bg-zinc-700 px-3 py-1 text-sm hover:bg-zinc-600">{"Next >"}</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0">
        {WEEKDAYS.map((w) => (
          <div key={w} className="h-8 w-32 text-center text-sm font-semibold text-gray-400">
            {w}
          </div>
        ))}
        {cells.map((cell, i) =>
          cell === null ? (
            <div key={`blank-${i}`} className="aspect-square h-32 w-32" />
          ) : (
            <CalendarDay
              key={cell.key}
              day={cell.day}
              dateKey={cell.key}
              todos={todosByDate.get(cell.key) ?? []}
              isToday={cell.key === today}
              onSelect={setSelectedKey}
            />
          )
        )}
      </div>
      {selectedKey && <DayModal dateKey={selectedKey} onClose={() => setSelectedKey(null)} />}
    </div>
  );
}
