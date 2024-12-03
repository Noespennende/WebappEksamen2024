interface TextBoxProps {
    text: string;
    orderPosition: number;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onRemove: () => void;
  }
  
  export function TextBox({ text, orderPosition, onChange, onRemove }: TextBoxProps) {
    return (
      <div key={orderPosition}>
        <label className="mt-4 flex flex-col" htmlFor={`text-${orderPosition}`}>
          <span className="text-sm font-semibold">Tekst*</span>
          <textarea
            data-testid="form_lesson_text"
            name="text"
            id={`text-${orderPosition}`}
            value={text}
            onChange={onChange}
            className="w-full rounded bg-slate-100"
            cols={30}
          />
        </label>
        <button
          className="text-sm font-semibold text-red-400"
          type="button"
          onClick={onRemove}
        >
          Fjern
        </button>
      </div>
    );
  }
  