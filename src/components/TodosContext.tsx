"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Todo, todayKey } from "./shared";

const STORAGE_KEY = "todos-v1";

interface TodosContextValue {
  todos: Todo[];
  todosByDate: Map<string, Todo[]>;
  undated: Todo[];
  addTodo: (title: string, date: string | null) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
  setTodoDate: (id: string, date: string | null) => void;
}

const TodosContext = createContext<TodosContextValue | null>(null);

function loadInitial(): Todo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t) => t && typeof t.id === "string" && typeof t.title === "string"
    );
  } catch {
    return [];
  }
}

export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(loadInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // storage unavailable — ignore
    }
  }, [todos]);

  const addTodo = useCallback((title: string, date: string | null) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title: trimmed, date, done: false },
    ]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }, []);

  const removeTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const setTodoDate = useCallback((id: string, date: string | null) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, date } : t)));
  }, []);

  const { todosByDate, undated } = useMemo(() => {
    const map = new Map<string, Todo[]>();
    const und: Todo[] = [];
    for (const t of todos) {
      if (!t.date) {
        und.push(t);
      } else {
        const arr = map.get(t.date);
        if (arr) arr.push(t);
        else map.set(t.date, [t]);
      }
    }
    return { todosByDate: map, undated: und };
  }, [todos]);

  const value: TodosContextValue = {
    todos,
    todosByDate,
    undated,
    addTodo,
    toggleTodo,
    removeTodo,
    setTodoDate,
  };

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export function useTodos(): TodosContextValue {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used within TodosProvider");
  return ctx;
}

export { todayKey };
