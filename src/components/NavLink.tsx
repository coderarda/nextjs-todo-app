"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavLinkProps {
    href: string;
    title: string;
    icon: string;
}

export function NavLink(props: NavLinkProps) {
    return(
        <li className={`w-full p-1 my-2 hover:bg-lime-500 flex flex-row rounded transition ease-linear duration-150 justify-start ${usePathname() == props.href ? "bg-lime-500" : ""}`}>
            <Link href={props.href} className="inline-flex items-center flex-row">
                <span className="material-symbols-outlined ml-1">
                    {props.icon}
                </span>
                <span className="text-sm ml-1">{props.title}</span>
            </Link>
        </li>
    );
}