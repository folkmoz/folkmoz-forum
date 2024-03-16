import { usePostPage } from "@/contexts/PostPage.context";
// import dynamic from "next/dynamic";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import ReactQuill from "react-quill";
import { useEffect, useRef } from "react";

const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "code",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "video",
];

export const QuillEditor = () => {
    const { state, setState } = usePostPage();
    const quillRef = useRef(null);

    useEffect(() => {
        // set focus to the editor
        if (quillRef.current && state.isOpenCommentEditor) {
            // @ts-ignore
            quillRef.current.focus();
        }
    }, [state.isOpenCommentEditor]);

    return (
        <>
            <ReactQuill
                // @ts-ignore
                ref={quillRef}
                theme="snow"
                modules={{
                    toolbar: [
                        ["bold", "italic", "underline", "strike", "code"],
                        [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                            { align: [] },
                        ],
                        ["link", "video"],
                    ],
                }}
                formats={formats}
                value={state.comment}
                onChange={(e) => setState({ comment: e })}
            />
        </>
    );
};
