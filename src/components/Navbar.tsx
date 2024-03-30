"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
    { href: "/", label: "หน้าแรก" },
    { href: "/posts", label: "กระทู้ทั้งหมด" },
];

export const Navbar = () => {
    const pathname = usePathname();
    return (
        <div className="absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center space-x-4">
                {links.map(({ href, label }) => (
                    <Link key={`${href}${label}`} href={href}>
                        <div
                            className={cn(
                                "transition-opacity duration-200 hover:opacity-100",
                                pathname === href
                                    ? "text-primary"
                                    : "text-muted-foreground opacity-70 hover:text-primary hover:opacity-100",
                            )}
                        >
                            {label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
