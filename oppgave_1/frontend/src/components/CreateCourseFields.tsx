import { CourseFieldsProps } from "@/lib/types";

export default function CreateCourseFields({
  courseFields,
  handleFieldChange,
  categories = [],
  handleCategoryChange,
  deleteCourse
}: CourseFieldsProps) {

  const categoryId = 'categoryId' in courseFields ? courseFields.categoryId : courseFields.category.id;
  console.log("Current category in courseFields:", categoryId);

  return (
    <div data-testid="course_step" className="max-w-lg">
      <label className="mb-4 flex flex-col" htmlFor="title">
        <span className="mb-1 font-semibold">Tittel*</span>
        <input
          className="rounded"
          data-testid="form_title"
          type="text"
          name="title"
          id="title"
          value={courseFields.title}
          onChange={handleFieldChange}
        />
      </label>
      <label className="mb-4 flex flex-col" htmlFor="slug">
        <span className="mb-1 font-semibold">Slug*</span>
        <input
          className="rounded"
          data-testid="form_slug"
          type="text"
          name="slug"
          id="slug"
          value={courseFields.slug}
          onChange={handleFieldChange}
        />
      </label>
      <label className="mb-4 flex flex-col" htmlFor="description">
        <span className="mb-1 font-semibold">Beskrivelse*</span>
        <input
          className="rounded"
          data-testid="form_description"
          type="text"
          name="description"
          id="description"
          value={courseFields.description}
          onChange={handleFieldChange}
        />
      </label>
      <label className="mb-4 flex flex-col" htmlFor="category">
        <span className="mb-1 font-semibold">Kategori*</span>
        <select
          className="rounded"
          data-testid="form_category"
          name="category"
          id="category"
          value={categoryId || ""}
          onChange={handleCategoryChange}
        >
          <option disabled value="">
            Velg kategori
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      {'id' in courseFields && courseFields.id !== undefined && (
        <button
          type="button"
          className="text-sm mb-4 max-w-[95%] rounded-lg border border-red-500 px-4 py-2 bg-red-500 text-white mx-auto block"
          onClick={() => deleteCourse(courseFields.id)}
        >
          Slett kurs
        </button>
      )}
    </div>
  );
}
