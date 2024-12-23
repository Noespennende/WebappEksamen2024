import { Category, CreateLesson, Lesson } from '@/lib/types';
import React from 'react';

interface CourseReviewProps {
  courseFields: { 
    title: string; 
    slug: string; 
    description: string; 
    category: Category;  
  };
  lessons: (CreateLesson | Lesson )[] ;
}

export default function CourseReview({ courseFields, lessons }: CourseReviewProps) {
  console.log("corsereview " + JSON.stringify(courseFields.category));

  return (
    <section data-testid="review">
      <h3 data-testid="review_course" className="mt-4 text-lg font-bold">
        Kurs
      </h3>
      <p data-testid="review_course_title">Tittel: {courseFields?.title}</p>
      <p data-testid="review_course_slug">Slug: {courseFields?.slug}</p>
      <p data-testid="review_course_description">Beskrivelse: {courseFields?.description}</p>
      <p data-testid="review_course_category">Kategori: {courseFields.category.name}</p>
      
      <h3 data-testid="review_course_lessons" className="mt-4 text-lg font-bold">
        Leksjoner ({lessons?.length})
      </h3>
      
      <ul data-testid="review_lessons" className="list-decimal pl-4">
        {lessons?.map((lesson, index) => (
          <li className="mt-2 mb-8 list-item" key={`${lesson.slug}-${index}`}>
            <p data-testid="review_lesson_title">Tittel: {lesson?.title}</p>
            <p data-testid="review_lesson_slug">Slug: {lesson?.slug}</p>
            <p data-testid="review_lesson_preamble">Ingress: {lesson?.preAmble}</p>
            <p>Tekster:</p>
            <ul data-testid="review_lesson_texts" className="list-inside">
              {lesson?.text?.map((text) => (
                <li data-testid="review_lesson_text" className="mb-1 pl-4" key={text?.orderPosition|| text?.text}>
                  {text?.text}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};
