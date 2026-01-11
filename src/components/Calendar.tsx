import { ReactElement } from "react";
import { CalendarDay } from "./CalendarDay";

export function Calendar() {
    const arr = Array.from<any, ReactElement>({ length: 31 }, (el, i) => <CalendarDay day={i + 1}></CalendarDay>)
    return (
        <ul className="inline-flex flex-col list-none">
            <li className="inline-flex flex-row">{arr.slice(0, 7).map((el) => el)}</li>
            <li className="inline-flex flex-row">{arr.slice(8, 15).map((el) => el)}</li>
            <li className="inline-flex flex-row">{arr.slice(16, 23).map((el) => el)}</li>
            <li className="inline-flex flex-row">{arr.slice(24).map((el) => el)}</li>
        </ul>
    );
}