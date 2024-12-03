import { useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface TipTapTextBoxProps {
  text: string;
  orderPosition: number;
  onChange: (text: string) => void;
  onRemove: () => void;
}

export const TipTapTextBox = ({
  text,
  orderPosition,
  onChange,
  onRemove,
}: TipTapTextBoxProps) => {
  // Bruk useRef for å holde på editor-instansen
  const editorRef = useRef<any>(null);

  // Initialiser editoren bare én gang
  const editor = useEditor({
    extensions: [StarterKit],
    content: text,
    onUpdate: ({ editor }) => {
      const updatedText = editor.getHTML();
      onChange(updatedText); // Send oppdatert tekst til parent-komponent
    },
    editorProps: {
      handleDOMEvents: {
        focus: () => {
          if (editorRef.current) {
            editorRef.current.focus();
          }
        },
      },
    },
  });

  // Funksjonen for stylingknappene
  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  return (
    <div className="tiptap-textbox">
      {/* Stylingknapper */}
      <div className="tiptap-toolbar mb-2">
        <button
          type="button"
          onClick={toggleBold}
          className="font-bold text-lg px-2 py-1"
        >
          B
        </button>
        <button
          type="button"
          onClick={toggleItalic}
          className="italic text-lg px-2 py-1"
        >
          I
        </button>
      </div>

      {/* Editor - tekstfeltet */}
      <EditorContent editor={editor} className="rounded border-2 border-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#6b7280] p-2" />

      {/* Fjern knapp */}
      <button
        type="button"
        onClick={onRemove}
        className="mt-2 text-red-500 underline"
      >
        Fjern
      </button>
    </div>
  );
};
