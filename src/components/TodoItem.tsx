import React from "react";

export function TodoItem({ title }: { title: string }) {
    return (
        <li className="inline-flex flex-row p-2 m-2 justify-start rounded items-center bg-blue-500">
            <div className="rounded-sm h-5 aspect-square flex flex-row justify-center bg-slate-300">
                <input type="checkbox" className="peer aspect-square opacity-0 w-5 absolute cursor-pointer" id="checkbox" />
                <div className="invisible w-fit rounded-sm peer-checked:visible cursor-pointer flex flex-col justify-center peer-checked:bg-green-500 flex-1">
                    <div className="ml-0.5 flex h-fit flex-col justify-center">
                        <div className="w-3.5 h-[2px] rounded-full bg-white -rotate-[32deg] ml-0.5 absolute"></div>
                        <div className="w-2 h-[2px] rounded-full bg-white rotate-[90deg] absolute"></div>
                    </div>
                </div>
            </div>
            <label htmlFor="checkbox" className="ml-2">{title}</label>
        </li>
    );
}