import { Todo } from "./shared";
import { CalendarTodoPreview } from "./CalendarTodoItem";

export function CalendarDay({
  day,
  dateKey,
  todos,
  isToday,
  onSelect,
}: {
  day: number;
  dateKey: string;
  todos: Todo[];
  isToday: boolean;
  onSelect: (dateKey: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(dateKey)}
      className={`aspect-square h-32 w-32 border text-start border-lime-500 overflow-hidden hover:bg-zinc-800 transition-colors flex flex-col ${
        isToday ? "ring-2 ring-lime-400" : ""
      }`}
    >
      <span className="p-3 text-lg flex items-center gap-2">
        {day.toString()}
        {todos.length > 0 && (
          <span className="text-[10px] rounded-full bg-lime-500 text-black px-1.5 py-0.5">
            {todos.length}
          </span>
        )}
      </span>
      <CalendarTodoPreview todos={todos} />
    </button>
  );
}
