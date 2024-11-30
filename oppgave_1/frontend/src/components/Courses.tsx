'use client';
import { courses } from "@/data/data";
import { Course } from "@/lib/types";
import React, { useEffect, useState } from "react";
import router from "next/router";

export default function Courses() {
    const [value, setValue] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [data, setData] = useState<Course[]>(courses);
  
    const handleFilter = (event:any) => {
      const category = event.target.value;
      console.log(category)
      setValue(category);
      if (category && category.length > 0) {
        const content = courses.filter((course) =>
          course.category.toLocaleLowerCase().includes(category.toLowerCase())
        );
        
        setData(content);
        
      } else {
        setData(courses);
      }
    };

    const handleCourseClick = (slug: string,) => {
  router.push(`/courses/${slug}`);
};


    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch('http://localhost:3999/v1/courses'); 
          console.log("Response object:", response);
    
          if (!response.ok) {
            throw new Error(`Failed to fetch courses. Status: ${response.status}`);
          }
          
          const coursesData = await response.json();
          console.log("Raw data:", coursesData);
    
          if (!coursesData.data || !Array.isArray(coursesData.data)) {
            throw new Error("API did not return a valid courses array.");
          }
        
          const formatData: Course [] = coursesData.data.map((course: Course) => ({
            ...course,
            category: Array.isArray(course.category)
              ? course.category
              : course.category ? [course.category] : [], 
          }));
          
          console.log("Formatted data:", formatData);
         
          setData(formatData);

          const uniqueCategories = Array.from(
            new Set(
              formatData.flatMap((course) =>
                course.category.map((cat) => cat.name)
              )
            )
          ).map(String);
          setCategories(uniqueCategories);
        } catch (err) {
          console.error("Error fetching or formatting data:", err);
        }
      };
    
      fetchCourses();
    }, []);

    
  console.log("CATEGORIES " + JSON.stringify(categories))
    return (
      <>
        <header className="mt-8 flex items-center justify-between">
          <h2 className="mb-6 text-xl font-bold" data-testid="title">
            Alle kurs
          </h2>
          <label className="flex flex-col text-xs font-semibold" htmlFor="filter">
            <span className="sr-only mb-1 block">Velg kategori:</span>
            <select
              id="filter"
              name="filter"
              data-testid="filter"
              value={value}
              onChange={handleFilter}
              className="min-w-[200px] rounded bg-slate-200"
            >
              <option value="">Alle</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </header>
        <section className="mt-6 grid grid-cols-3 gap-8" data-testid="courses">
          {data && data.length > 0 ? (
            data.map((course) => (
              <article
                className="rounded-lg border border-slate-400 px-6 py-8"
                key={course.id}
                data-testid="course_wrapper"
                onClick={() => handleCourseClick(course.slug)}
              >
                <span className="block text-right capitalize">
                  [{course.category.map((cat) => cat.name).join(", ")}]
                </span>
                <h3
                  className="mb-2 text-base font-bold"
                  data-testid="courses_title"
                >
                  <a href={`/courses/${course.slug}`}>{course.title}</a>
                </h3>
                <p
                  className="mb-6 text-base font-light"
                  data-testid="courses_description"
                >
                  {course.description}
                </p>
                <a
                  className="font-semibold underline"
                  data-testid="courses_url"
                  
                  href={`/courses/${course.slug}`}
                
                >
                  Til kurs
                </a>
              </article>
            ))
          ) : (
            <p data-testid="empty">Ingen kurs</p>
          )}
        </section>
      </>
    );
  }