"use client";

import { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import {
    CalendarIcon,
    EnvelopeClosedIcon,
    FaceIcon,
    GearIcon,
    PersonIcon,
    RocketIcon,
} from "@radix-ui/react-icons";
import { BellIcon, SearchIcon } from "lucide-react";
import { AuthSession } from "@/lib/auth/utils";
import { WithAuthMenu } from "@/components/auth/WithAuthMenu";

export const SideMenu = ({ session }: { session: AuthSession | null }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggle();
            }
        };

        document.addEventListener("keydown", down);

        return () => {
            document.removeEventListener("keydown", down);
        };
    }, []);

    return (
        <>
            <div>
                <div className={"flex items-center gap-4"}>
                    <button
                        onClick={toggle}
                        className="py-2 px-2 md:px-4 flex gap-4 rounded-full items-center md:w-48 hover:opacity-75 transition-opacity ease-in-out duration-200 border bg-primary-foreground"
                    >
                        <SearchIcon className="h-5 w-5 text-muted-foreground" />
                        <div
                            className={
                                "hidden md:block text-muted-foreground font-light"
                            }
                        >
                            ค้นหา
                        </div>
                        <kbd className="hidden ml-auto pointer-events-none md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button>
                    <button type="button" className="hover:opacity-75">
                        <BellIcon className="h-5 w-5" />
                    </button>
                    {session?.session ? (
                        <WithAuthMenu session={session} />
                    ) : null}
                </div>
            </div>

            <CommandDialog open={open} onOpenChange={toggle}>
                <CommandInput placeholder="ค้นหาโพสต์..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <FaceIcon className="mr-2 h-4 w-4" />
                            <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                            <RocketIcon className="mr-2 h-4 w-4" />
                            <span>Launch</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <PersonIcon className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                            <span>Mail</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <GearIcon className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};
