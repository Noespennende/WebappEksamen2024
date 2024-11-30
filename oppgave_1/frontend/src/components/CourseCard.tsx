
import { Course } from "@/lib/types";
import Link from "next/link";

export default function CourseCard(props: {course: Course}) {
    const { course } = props;
    
    return (
        <>
            <article
                className="rounded-lg border border-slate-400 px-6 py-8"
                key={course.id}
                data-testid="course_wrapper"
            >
                <span className="block text-right capitalize">
                [{course.category.name || "Ingen kategori"}]
                </span>
                <h3
                  className="mb-2 text-base font-bold"
                  data-testid="courses_title"
                >
                  <Link href={`/courses/${course.slug}`}>{course.title}</Link>
                </h3>
                <p
                  className="mb-6 text-base font-light"
                  data-testid="courses_description"
                >
                  {course.description}
                </p>
                <Link href={`/courses/${course.slug}`} 
                    className="font-semibold underline" data-testid="courses_url">
                    Til kurs
                    </Link>
            </article>
        </>
    )
}