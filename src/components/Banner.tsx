import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

type BannerProps = {
    title: string;
    description?: string | null;
    imageSrc?: string;
    showImage?: boolean;
};

export const Banner = ({
    title,
    description,
    imageSrc,
    showImage = true,
}: BannerProps) => {
    return (
        <div>
            <div className="flex flex-col gap-12 py-2">
                {showImage && imageSrc && (
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                        <Image
                            priority
                            quality={100}
                            src={imageSrc}
                            alt={`Banner for ${title}`}
                            fill
                            className="rounded-md object-cover shadow-md"
                        />
                    </AspectRatio>
                )}

                <div className="flex flex-col items-center">
                    <div className="text-center space-y-4">
                        <h1
                            className={cn("font-semibold text-primary", {
                                "text-4xl md:text-6xl": title.length < 30,
                                "text-3xl md:text-5xl": title.length > 30,
                            })}
                        >
                            {title}
                        </h1>
                        <p className="sm:text-lg text-muted-foreground font-light">
                            {description ??
                                "มาแชร์ประสบการณ์ รีวิวต่างๆ แลกเปลี่ยนความคิดเห็นให้ทุกคนได้เลย"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
