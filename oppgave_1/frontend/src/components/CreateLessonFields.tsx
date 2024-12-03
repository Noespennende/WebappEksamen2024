import { CreateLesson, Lesson } from "@/lib/types";
import { LessonField } from "./LessonField";
import { TextBox } from "./TextBox";

interface CreateLessonFieldsProps {
  lesson: CreateLesson | Lesson;
  lessonIndex: number;
  handleLessonFieldChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    lessonIndex: number,
    index?: number
  ) => void;
  addTextBox: () => void;
  removeTextBox: (index: number) => void;
}

export default function CreateLessonFields({
  lesson,
  lessonIndex,
  handleLessonFieldChange,
  addTextBox,
  removeTextBox,
}: CreateLessonFieldsProps) {
  return (
    <div className="w-full">
      <LessonField
        label="Tittel"
        id="title"
        name="title"
        value={lesson.title}
        onChange={(e) => handleLessonFieldChange(e, lessonIndex)}
      />
      <LessonField
        label="Slug"
        id="slug"
        name="slug"
        value={lesson.slug}
        onChange={(e) => handleLessonFieldChange(e, lessonIndex)}
      />
      <LessonField
        label="Ingress"
        id="preAmble"
        name="preAmble"
        value={lesson.preAmble}
        onChange={(e) => handleLessonFieldChange(e, lessonIndex)}
      />

      {/* Leksjonens tekstbokser */}
      {lesson.text &&
        lesson.text.map((field, index) => (
          <TextBox
            key={field.orderPosition}
            text={field.text}
            orderPosition={field.orderPosition}
            onChange={(e) => handleLessonFieldChange(e, lessonIndex, index)}
            onRemove={() => removeTextBox(index)}
          />
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
}
