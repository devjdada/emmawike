import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

interface SimpleEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className="min-h-[150px] rounded-md border">
            <EditorContent editor={editor} />
        </div>
    );
};

export default SimpleEditor;
