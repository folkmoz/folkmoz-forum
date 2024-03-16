import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { cn, fileToDataUri } from "@/lib/utils";
import { useNewForum } from "@/contexts/NewForum.context";
import { ImageIcon, PlusIcon } from "lucide-react";

import defaultImage1 from "@images/forum/3230017b254566ca7d748dee0ee7b17b.png";
import defaultImage2 from "@images/forum/3ddd3101a926133e5607c6d956e5db8d.png";
import defaultImage3 from "@images/forum/2d3e3a857001ad34e51ba87b02f9a0c3.png";
import defaultImage4 from "@images/forum/848109931f77f6fa71445e1152a8114f.png";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const defaultImages = [
    defaultImage1,
    defaultImage2,
    defaultImage3,
    defaultImage4,
];

export const UploadZone = () => {
    const { state, setState } = useNewForum();

    const onSelectDefaultImage = (src: string) => {
        setState({ previewImage: src });
        setState({ image: null });
    };

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (!file) return;

            const data = await fileToDataUri(file);
            setState({ previewImage: data.preview, image: file });
        },
        [setState],
    );

    const { getInputProps, getRootProps, isDragActive, inputRef } = useDropzone(
        {
            onDrop,
            accept: {
                "image/png": [".png"],
                "image/jpeg": [".jpeg", ".jpg"],
                "image/webp": [".webp"],
            },
            multiple: false,
            noClick: true,
        },
    );

    return (
        <div className={"mb-12"}>
            <div
                {...getRootProps()}
                className={cn(
                    "relative mt-2 border border-gray-200 rounded-md flex flex-col items-center group overflow-hidden",
                    isDragActive ? "bg-gray-100" : "",
                    state.previewImage ? "h-auto" : "h-72",
                )}
            >
                <input {...getInputProps()} multiple={false} />

                {state.previewImage ? (
                    <AspectRatio ratio={16 / 9}>
                        <img
                            src={state.previewImage}
                            alt="preview"
                            className="w-full h-full object-cover rounded-md"
                        />
                    </AspectRatio>
                ) : (
                    <>
                        <ImageIcon size={48} className={"mt-10"} />

                        <div className={"text-head-3 font-semibold"}>
                            ลากวางเพื่ออัพโหลดหรือคลิกเพื่อเลือกรูปภาพ
                        </div>
                        <div className={"text-body-1 font-light"}>
                            อัพโหลดหรือเลือกรูปภาพสำหรับหน้าปก 1 รูป
                        </div>
                    </>
                )}

                <div
                    className={cn(
                        "before:block before:-inset-0 before:bg-gradient-to-b from-transparent to-secondary/90 before:transition-opacity before:opacity-0 group-hover:before:opacity-100 duration-400 ease-in-out",
                        {
                            "before:absolute": state.previewImage,
                        },
                    )}
                ></div>

                <div className="absolute bottom-4 left-0 right-0 flex z-10">
                    <div
                        className={cn(
                            "flex justify-center space-x-2 w-full group-hover:opacity-100 transition-opacity duration-200 ease-in-out",
                            state.previewImage ? "opacity-0" : "opacity-30",
                        )}
                    >
                        {defaultImages.map((img, i) => (
                            <Image
                                key={i}
                                src={img.src}
                                width={96}
                                height={64}
                                quality={100}
                                alt="default"
                                onClick={() => onSelectDefaultImage(img.src)}
                                className={cn(
                                    "w-24 h-16 rounded-md object-cover cursor-pointer transition-opacity duration-200 ease-in-out hover:opacity-100",
                                    {
                                        "opacity-100 border-2 border-primary":
                                            state.previewImage === img.src,
                                        "opacity-60":
                                            state.previewImage !== img.src,
                                    },
                                )}
                            />
                        ))}
                        <Tooltip disableHoverableContent>
                            <TooltipTrigger asChild>
                                <button
                                    type="button"
                                    onClick={(e) => inputRef.current?.click()}
                                    className="w-24 h-16 rounded-md border-2 border-dashed flex justify-center items-center border-primary cursor-pointer"
                                >
                                    <PlusIcon
                                        size={24}
                                        className="text-primary"
                                    />
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side={"bottom"}>
                                <p>Upload Image</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    );
};
