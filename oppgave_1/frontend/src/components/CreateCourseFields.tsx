import { CourseFieldsProps } from "@/lib/types";

export default function CreateCourseFields({ courseFields, handleFieldChange, categories = [] }: CourseFieldsProps){

  console.log("CreateCourse ", courseFields)
  console.log("categories ", categories)

  
    
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
          value={courseFields.category[0]?.id || ""}
          onChange={handleFieldChange}
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
    </div>
  );
};

