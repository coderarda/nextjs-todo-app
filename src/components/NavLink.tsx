"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavLinkProps {
    href: string;
    title: string;
}

export function NavLink(props: NavLinkProps) {
    return(
        <li className={`w-20 m-2 py-1 px-3 hover:bg-lime-500 flex flex-col rounded transition ease-linear items-end duration-150 justify-center text-end ${usePathname() == props.href ? "bg-lime-500" : ""}`}>
            <Link href={props.href} className="inline-flex items-center flex-row">
                <span className="material-symbols-outlined">
                    home
                </span>
                <span className="text-sm">Home</span>
            </Link>
        </li>
    );
}