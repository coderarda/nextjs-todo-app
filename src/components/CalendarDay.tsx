import { ReactElement } from "react";

export function CalendarDay({ day, events }: { day: number, events?: ReactElement<CalendarTodoProps>[] }) {
    return (
        <div className="aspect-square h-20 border-[1px] text-start border-lime-500">
            <span className="p-2">{day.toString()}</span>
            <ul>
                {events?.map((element) => element)}
            </ul>
        </div>
    );
}