import { useEffect } from 'react';
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
  const editor = useEditor({
    extensions: [StarterKit],
    content: text, // Initialiser editoren med tekstinnholdet
    onUpdate: ({ editor }) => {
      const updatedText = editor.getHTML();
      onChange(updatedText); // Send oppdatert tekst tilbake til parent-komponent
    },
  });

  // Bruk useEffect for å oppdatere editoren når `text`-prop endres
  useEffect(() => {
    if (editor && text !== editor.getHTML()) {
      editor.commands.setContent(text);
    }
  }, [text, editor]); // Kjør kun når `text` eller `editor` endres

  return (
    <div className="tiptap-textbox">
      {/* Editor */}
      <EditorContent editor={editor} />

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
