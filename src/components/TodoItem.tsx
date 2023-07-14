import React from "react";

export function TodoItem({ title }: { title: string }) {
    return (
        <li className="inline-flex flex-row p-2 mx-3 my-1 justify-start rounded items-center bg-lime-600 hover:bg-lime-500 ease-linear duration-200">
            <div className="rounded-sm h-5 aspect-square flex flex-row justify-center bg-zinc-300">
                <input type="checkbox" className="peer aspect-square opacity-0 w-5 absolute cursor-pointer" />
                <div className="invisible w-fit rounded-sm peer-checked:visible cursor-pointer flex flex-col justify-center peer-checked:bg-lime-500 flex-1">
                    <div className="ml-0.5 flex h-fit flex-col justify-center">
                        <div className="w-3.5 h-[2px] rounded-full bg-white -rotate-[32deg] ml-0.5 absolute"></div>
                        <div className="w-2 h-[2px] rounded-full bg-white rotate-[90deg] absolute"></div>
                    </div>
                </div>
            </div>
            <span className="ml-2 text-sm">{title}</span>
        </li>
    );
}