import { AspectRatio } from "@/components/ui/aspect-ratio";

export const LoadingPostList = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <AspectRatio ratio={4 / 3} key={index}>
                    <div className="bg-primary-foreground animate-pulse rounded-lg"></div>
                </AspectRatio>
            ))}
        </>
    );
};
