import { usePostPage } from "@/contexts/PostPage.context";
import ReactQuill, { ReactQuillProps } from "react-quill";
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
] as const;

const modules = {
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
} as const;

interface QuillInstance {
    focus: () => void;
}

export const QuillEditor = () => {
    const { state, setState } = usePostPage();
    const quillRef = useRef<QuillInstance | null>(null);

    useEffect(() => {
        if (quillRef.current && state.isOpenCommentEditor) {
            quillRef.current.focus();
        }
    }, [state.isOpenCommentEditor]);

    const handleChange: ReactQuillProps["onChange"] = (value) => {
        setState({ comment: value });
    };

    return (
        <ReactQuill
            ref={(el) => {
                if (el) {
                    quillRef.current = el.getEditor();
                }
            }}
            theme="snow"
            modules={modules}
            formats={[...formats]}
            value={state.comment}
            onChange={handleChange}
        />
    );
};
