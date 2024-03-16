import { AuthSession } from "@/lib/auth/utils";
import { signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const WithAuthMenu = ({ session }: { session: AuthSession }) => {
    const { user } = session.session!;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="hover:opacity-75 outline-none rounded-full overflow-hidden"
                    >
                        {user.image ? (
                            <img
                                referrerPolicy="no-referrer"
                                src={user.image!}
                                alt={`Profile picture of ${user.name}`}
                                className="w-8 h-8rounded-full"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-primary">
                                <div className="flex items-center justify-center h-full text-white">
                                    {user.name[0].toUpperCase()}
                                </div>
                            </div>
                        )}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
