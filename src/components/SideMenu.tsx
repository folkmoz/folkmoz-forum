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
import { useDebounce } from "use-debounce";
import { env } from "@/lib/env.mjs";
import { useRouter } from "next/navigation";

type SearchResult = {
    id: string;
    title: string;
    author: string;
};

export const SideMenu = ({ session }: { session: AuthSession | null }) => {
    const [queryPosts, setQueryPosts] = useState<SearchResult[]>([]);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [query] = useDebounce(text, 1000);

    const router = useRouter();

    const toggle = () => {
        setOpen(!open);
        setQueryPosts([]);
        setText("");
    };

    const onSelect = (postId: string) => {
        router.push(`/post/${postId}`);
        setOpen(false);
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

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(
                `${env.NEXT_PUBLIC_BACKEND_URL}/posts?q=${query}&limit=5`,
            );
            const data = await res.json();
            setQueryPosts(data);
        };

        if (query) {
            fetchPosts();
        }
    }, [query]);

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
                <CommandInput
                    placeholder="ค้นหาโพสต์..."
                    // onKeyUp={(e) => setText(e.currentTarget.value)}
                    onValueChange={(value) => setText(value)}
                    value={text}
                />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {queryPosts.length > 0 ? (
                        <>
                            <CommandGroup heading="Search Results">
                                {queryPosts.map((post) => (
                                    <CommandItem
                                        key={post.id}
                                        onSelect={() => onSelect(post.id)}
                                    >
                                        <span>{post.title}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </>
                    ) : null}
                </CommandList>
            </CommandDialog>
        </>
    );
};
