import { cn } from "@/lib/utils";

export const UserProfileImage = ({
    image,
    name,
    size = "md",
}: {
    image?: string;
    name: string;
    size?: "sm" | "md" | "lg";
}) => {
    return (
        <>
            {image ? (
                <img
                    referrerPolicy="no-referrer"
                    src={image!}
                    alt={`Profile picture of ${name}`}
                    className={cn("rounded-full object-cover shadow", {
                        "w-8 h-8": size === "sm",
                        "w-10 h-10": size === "md",
                        "w-12 h-12": size === "lg",
                    })}
                />
            ) : (
                <div
                    className={cn("rounded-full bg-primary", {
                        "w-8 h-8": size === "sm",
                        "w-12 h-12": size === "md",
                        "w-16 h-16": size === "lg",
                    })}
                >
                    <div className="flex items-center justify-center h-full text-white">
                        {name[0].toUpperCase()}
                    </div>
                </div>
            )}
        </>
    );
};
