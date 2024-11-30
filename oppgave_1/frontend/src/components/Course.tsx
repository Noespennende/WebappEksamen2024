import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCourse } from "@/lib/services/api";
import { Course as CourseType } from "@/lib/types";
import { users } from "../data/data";

export interface CourseProps {
  courseSlug: string;
  lessonSlug: string;
  children: React.ReactNode;
}

export default function Course({ courseSlug, lessonSlug, children }: CourseProps) {
  const [content, setContent] = useState<CourseType | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await getCourse(courseSlug);
        setContent(courseData.data);
      } catch (err: any) {
        console.error("Error fetching course:", err);
      }
    };

    fetchCourse();
  }, [courseSlug]);

  const handleLessonClick = (lessonSlug: string) => {
    // Updates the URL without a full page reload, in query-param structure
    router.push(`/courses/${courseSlug}?lesson=${lessonSlug}`);
  };

  return (
    <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
      <aside className="border-r border-slate-200 pr-6">
        <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
        <ul data-testid="lessons">
          {content?.lessons?.map((lesson) => (
            <li
              className={`text-sm mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
              }`}
              key={lesson.id}
            >
              <a
                data-testid="lesson_url"
                data-slug={lessonSlug}
                className="block h-full w-full cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("hihi " + lesson.slug)
                  handleLessonClick(lesson.slug);
                }}
              >
                {lesson.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {lessonSlug ? (
        <article>
          <h2 className="text-2xl font-bold">Leksjon: {lessonSlug}</h2>
          {children}
        </article>

      ) : (
        <section>
          <h2 className="text-2xl font-bold" data-testid="course_title">
            {content?.title}
          </h2>
          <p
            className="mt-4 font-semibold leading-relaxed"
            data-testid="course_description"
          >
            {content?.description}
          </p>
        </section>
      )}

      <aside data-testid="enrollments" className="border-l border-slate-200 pl-6">
        <h3 className="mb-4 text-base font-bold">Deltakere</h3>
        <ul data-testid="course_enrollments">
          {users?.map((user) => (
            <li className="mb-1" key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
