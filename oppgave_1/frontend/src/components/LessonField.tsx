interface LessonFieldProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  export function LessonField({ label, id, name, value, onChange }: LessonFieldProps) {
    return (
      <label className="mb-4 flex flex-col" htmlFor={id}>
        <span className="mb-1 font-semibold">{label}*</span>
        <input
          className="rounded"
          data-testid={`form_lesson_${name}`}
          type="text"
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        />
      </label>
    );
  }
  