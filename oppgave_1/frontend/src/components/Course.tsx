"use client";
import { useState, useEffect } from "react";
import {
  categories,
  comments,
  courseCreateSteps,
  courses,
  users,
} from "../data/data";

import { useParams, useRouter } from "next/navigation";
import Lesson from "./Lesson";
import { getCourse } from "@/lib/services/api";
import type { Course } from "@/lib/types";

//flyttet til api
/*
const getCourse = async (slug) => {
  const data = await courses.filter((course) => course.slug === slug);
  return data?.[0];
};*/

/*
const createCourse = async (data: any) => {
  await courses.push(data);
};*/

//flyttet til api
/*
const getLesson = async (courseSlug, lessonSlug) => {
  const data = await courses
    .flatMap(
      (course) =>
        course.slug === courseSlug &&
        course.lessons.filter((lesson) => lesson.slug === lessonSlug)
    )
    .filter(Boolean);
  return data?.[0];
};*/

//flyttet til api
/*
const getComments = async (lessonSlug) => {
  const data = await comments.filter(
    (comment) => comment.lesson.slug === lessonSlug
  );
  return data;
};*/


/*
const createComment = async (data) => {
  await comments.push(data);
};*/

export interface CourseProps {
  courseSlug: string;
  lessonSlug: string;
}

export default function Course({ courseSlug, lessonSlug }: CourseProps) {
    const [content, setContent] = useState<Course | null>(null);
    //const lessonSlug = "variabler";
    //const courseSlug = "javascript-101";

    console.log("course coomponent slug: " + courseSlug)

    //const params = useParams() as { courseSlug: string; lessonSlug?: string };
    //const courseSlug = params.courseSlug
    //const lessonSlug = params.lessonSlug
    
  

    useEffect(() => {
      const fetchCourse = async () => {
          try {
              const courseData = await getCourse(courseSlug);
              //console.log("Fetched course data in component:", courseData);
              setContent(courseData.data); 
          } catch (err: any) {
              
          }
      };

      fetchCourse();
  }, [courseSlug]);
/*
    useEffect(() => {
      const getContent = async () => {
        try {
          const response = await fetch(`http://localhost:3999/v1/courses/${courseSlug}`);
    
          if (!response.ok) {
            throw new Error(`Failed to fetch course: ${response.status}`);
          }
    
          const data = await response.json();
          
          
          console.log("test:", data);

          console.log("test2" + data.data.id)
          
        
          setContent(data.data);
        } catch (error) {
          console.error("Error fetching course:", error);
        }
      };
    
      getContent();
    }, [courseSlug]);*/

  
    return (
      <div className="grid grid-cols-[250px_minmax(20%,1fr)_1fr] gap-16">
        <aside className="border-r border-slate-200 pr-6">
          <h3 className="mb-4 text-base font-bold">Leksjoner</h3>
          <ul data-testid="lessons">
            {content?.lessons?.map((lesson) => (
              <li
                className={`text-sm" mb-4 w-full max-w-[95%] rounded-lg border border-slate-300 px-4 py-2 ${
                  lessonSlug === lesson.slug ? "bg-emerald-300" : "bg-transparent"
                }`}
                key={lesson.id}
              >
                <a
                  data-testid="lesson_url"
                  data-slug={lessonSlug}
                  className="block h-full w-full"
                  href={`/courses/${content?.slug}/${lesson.slug}`}
                >
                  {lesson.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        {lessonSlug ? (
          <article>
            <Lesson courseSlug={courseSlug} lessonSlug={lessonSlug} />
          </article>
        ) : (
          <section>
            <>
              <h2 className="text-2xl font-bold" data-testid="course_title">
                {content?.title}
              </h2>
              <p
                className="mt-4 font-semibold leading-relaxed"
                data-testid="course_description"
              >
                {content?.description}
              </p>
            </>
          </section>
        )}
        <aside
          data-testid="enrollments"
          className="border-l border-slate-200 pl-6"
        >
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