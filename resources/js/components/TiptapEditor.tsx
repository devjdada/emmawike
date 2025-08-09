import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="border rounded-md min-h-[150px]">
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapEditor;
