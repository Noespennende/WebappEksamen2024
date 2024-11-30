'use client';

import { Course } from "@/lib/types";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";


export default function Courses() {
    const [value, setValue] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [fetchedData, setFetchedData] = useState<Course[]>([]);
    const [data, setData] = useState<Course[]>(fetchedData);
  
  
    const handleFilter = (event:any) => {
      const category = event.target.value;
      console.log("Valgt kategori " +category)
      
      setValue(category);
      if (category) {

        console.log("tester " + category)
        
        const filtered = fetchedData.filter((course) => {
      
          console.log("course.category", course.category)
          const courseName = course.category.name.toLowerCase();
          console.log("inside " + courseName);
          return courseName.includes(category.toLowerCase())
        });
        
      console.log("kategir " + filtered)        
      setData(filtered);
        
      } else {
        setData(fetchedData);
      }
    };

    useEffect(() => {
      console.log("Fetched data:", fetchedData);
      if (fetchedData.length > 0) {
        setData(fetchedData);
      }
    }, [fetchedData]);


   


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

          }));
          
          console.log("Formatted data:", formatData);
         
          setFetchedData(formatData);
          console.log("data is ..." + data)

          const uniqueCategories = Array.from(
            new Set(formatData.map((course) => course.category.name))
          );
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
              <CourseCard key={course.id} course={course}/>
            ))
          ) : (
            <p data-testid="empty">Ingen kurs</p>
          )}
        </section>
      </>
    );
  }