import { ALesson } from "@/lib/types";

interface CreateLessonFieldsProps {
  lesson: ALesson;
  handleLessonFieldChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => void;
  addTextBox: () => void;
  removeTextBox: (index: number) => void;
}

export default function CreateLessonFields({
  lesson,
  handleLessonFieldChange,
  addTextBox,
  removeTextBox
}:CreateLessonFieldsProps){
  
  return (
    <div className="w-full">
      <label className="mb-4 flex flex-col" htmlFor="title">
        <span className="mb-1 font-semibold">Tittel*</span>
        <input
          className="rounded"
          data-testid="form_lesson_title"
          type="text"
          name="title"
          id="title"
          value={lesson.title}
          onChange={(e) => handleLessonFieldChange(e)}
        />
      </label>
      
      <label className="mb-4 flex flex-col" htmlFor="slug">
        <span className="mb-1 font-semibold">Slug*</span>
        <input
          className="rounded"
          data-testid="form_lesson_slug"
          type="text"
          name="slug"
          id="slug"
          value={lesson.slug}
          onChange={(e) => handleLessonFieldChange(e)}
        />
      </label>

      <label className="mb-4 flex flex-col" htmlFor="preAmble">
        <span className="mb-1 font-semibold">Ingress*</span>
        <input
          className="rounded"
          data-testid="form_lesson_preAmble"
          type="text"
          name="preAmble"
          id="preAmble"
          value={lesson.preAmble}
          onChange={(e) => handleLessonFieldChange(e)}
        />
      </label>

      {/* Leksjonens tekstbokser */}
      {lesson.text.length > 0 && lesson.text.map((field, index) => (
        <div key={field.id}>
          <label className="mt-4 flex flex-col" htmlFor={`text-${field.id}`}>
            <span className="text-sm font-semibold">Tekst*</span>
            <textarea
              data-testid="form_lesson_text"
              name="text"
              id={`text-${field.id}`}
              value={field.comment}
              onChange={(e) => handleLessonFieldChange(e, index)}
              className="w-full rounded bg-slate-100"
              cols={30}
            />
          </label>
          <button
            className="text-sm font-semibold text-red-400"
            type="button"
            onClick={() => removeTextBox(index)}
          >
            Fjern
          </button>
        </div>
      ))}

      {/* Legg til tekstboks-knapp */}
      <button
        className="mt-6 w-full rounded bg-gray-300 px-4 py-3 font-semibold"
        type="button"
        onClick={addTextBox}
        data-testid="form_lesson_add_text"
      >
        + Legg til tekstboks
      </button>
    </div>
  );
};
