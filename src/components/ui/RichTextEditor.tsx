import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, List, ListOrdered, UnderlineIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/utils';

interface RichTextEditorProps {
    onChange: (content: string) => void;
    label?: string; 
    error?: string;
}

export default function RichTextEditor({ onChange, label, error }: RichTextEditorProps) {
    const [_, setUpdate] = useState(0);

    const editor = useEditor({
        extensions: [
            StarterKit, 
            Underline, 
        ],
        content: '',
        onUpdate: ({ editor }) => {
        setUpdate(u => u + 1);
        onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    const getIconClass = (type: string) => {
        return editor.isActive(type) ? 'text-[var(--color-gold)]' : 'text-[var(--color-primary)]';
    };

    return (
        <div className="w-full">
            <div className='flex justify-between flex-wrap'>
                {/* Optional Label */}
                {label && <label className="text-[var(--color-primary)]">{label}</label>}

                {/* Toolbar */}
                <div className="flex gap-2 mb-3 flex-wrap">
                    <button onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
                    <Bold size={20} className={getIconClass('bold')} />
                    </button>

                    <button onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
                    <Italic size={20} className={getIconClass('italic')} />
                    </button>

                    <button onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
                    <UnderlineIcon size={20} className={getIconClass('underline')} />
                    </button>

                    {/* Bullet List */}
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
                    <List size={20} className={getIconClass('bulletList')} />
                    </button>

                    {/* Ordered List */}
                    <button onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List">
                    <ListOrdered size={20} className={getIconClass('orderedList')} />
                    </button>

                    {/* Headings */}
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">
                    H1
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
                    H2
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
                    H3
                    </button>
                </div>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className={cn(
                    "border border-[var(--border-ui)] rounded p-3 min-h-50 max-h-100 overflow-y-auto",
                    error && "border border-red-500"
                )}
                
            />
            <span className='text-xs text-red-500'>{error}</span>
        </div>
    );
}