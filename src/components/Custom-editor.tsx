"use client";

import axios from "axios";
import { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Editor } from "@ckeditor/ckeditor5-core";
import EditorClassic from "ckeditor5-custom-build";
import { EventInfo } from "@ckeditor/ckeditor5-utils";
import { UploadAdapter, FileLoader } from "@ckeditor/ckeditor5-upload";
import { useNewForum } from "@/contexts/NewForum.context";
import { env } from "@/lib/env.mjs";
import { useFormStatus } from "react-dom";

const uploadOne = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_BODY_PRESET);
    data.append("timestamp", `${Date.now()}`);

    const resp = await axios.post(env.NEXT_PUBLIC_CLOUDINARY_URL, data);

    return resp.data.secure_url;
};

const editorConfig = {
    config: {
        height: "500px",
    },
    toolbar: {
        items: [
            // "heading",
            // "|",
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "link",
            // "bulletedList",
            // "numberedList",
            "code",
            "|",
            "outdent",
            "indent",
            "alignment",
            "horizontalLine",
            "|",
            "imageUpload",
            // "blockQuote",
            // "insertTable",
            "mediaEmbed",
            // "undo",
            // "redo",
            "subscript",
        ],
    },
    language: "en",
    image: {
        toolbar: ["imageTextAlternative"],
    },
    table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
};

export type CustomEditorProps = {
    initialData: string;
    onChange?: (data: string) => void;
};

function uploadAdapter(loader: FileLoader): UploadAdapter {
    return {
        upload: () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const file = await loader.file;
                    const url = await uploadOne(file!);
                    resolve({
                        default: url,
                    });
                } catch (error) {
                    reject(error);
                }
            });
        },
        abort: () => {},
    };
}

function uploadPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
        loader: FileLoader,
    ) => {
        return uploadAdapter(loader);
    };
}

export const CustomEditor = ({ initialData = "" }: CustomEditorProps) => {
    const editorRef = useRef<Editor>();
    const { setState, state } = useNewForum();
    const { pending } = useFormStatus();

    const handleChange = (event: EventInfo, editor: Editor) => {
        const data = editor.getData();
        // onChange?.(data);
        setState({ content: data });
    };

    const disabled = state.isSubmitting || pending;

    return (
        <CKEditor
            disabled={disabled}
            editor={EditorClassic}
            config={{
                ...editorConfig,
                extraPlugins: [uploadPlugin],
            }}
            data={initialData}
            onChange={handleChange}
            onReady={(editor) => {
                editorRef.current = editor;
            }}
        />
    );
};
