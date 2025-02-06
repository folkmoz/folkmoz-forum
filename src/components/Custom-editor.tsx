//@ts-nocheck
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

interface EditorConfig {
    config: {
        height: string;
    };
    toolbar: {
        items: string[];
    };
    language: string;
    image: {
        toolbar: string[];
    };
    table: {
        contentToolbar: string[];
    };
}

const uploadOne = async (file: File): Promise<string> => {
    try {
        const data = new FormData();
        data.append("file", file);
        data.append(
            "upload_preset",
            env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_BODY_PRESET,
        );
        data.append("timestamp", `${Date.now()}`);

        const resp = await axios.post(env.NEXT_PUBLIC_CLOUDINARY_URL, data);
        return resp.data.secure_url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload file");
    }
};

const editorConfig: EditorConfig = {
    config: {
        height: "500px",
    },
    toolbar: {
        items: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "link",
            "code",
            "|",
            "outdent",
            "indent",
            "alignment",
            "horizontalLine",
            "|",
            "imageUpload",
            "mediaEmbed",
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

export interface CustomEditorProps {
    initialData: string;
    onChange?: (data: string) => void;
}

class CustomUploadAdapter implements UploadAdapter {
    constructor(private loader: FileLoader) {}

    async upload(): Promise<{ default: string }> {
        try {
            const file = await this.loader.file;
            if (!file) throw new Error("No file to upload");

            const url = await uploadOne(file);
            return { default: url };
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
    }

    abort(): void {}
}

function uploadPlugin(editor: Editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
        loader: FileLoader,
    ) => {
        return new CustomUploadAdapter(loader);
    };
}

export const CustomEditor = ({ initialData = "" }: CustomEditorProps) => {
    const editorRef = useRef<Editor>();
    const { setState, state } = useNewForum();
    const { pending } = useFormStatus();

    const handleChange = (_event: EventInfo, editor: Editor) => {
        const data = editor.getData();
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
