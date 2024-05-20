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
import { UserProfileImage } from "@/components/UserProfileImage";
import { BellIcon } from "lucide-react";

export const WithAuthMenu = ({ session }: { session: AuthSession }) => {
    const { user } = session.session!;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button type="button" className="hover:opacity-75">
                        <BellIcon className="h-5 w-5" />
                    </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Notification 1</DropdownMenuItem>
                    <DropdownMenuItem>Notification 2</DropdownMenuItem>
                    <DropdownMenuItem>Notification 3</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="hover:opacity-75 outline-none rounded-full overflow-hidden"
                    >
                        <UserProfileImage
                            image={user.image}
                            name={user.name}
                            size="sm"
                        />
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
