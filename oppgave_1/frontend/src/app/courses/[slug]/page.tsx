'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation"; // Import both hooks
import Course from "@/components/Course";
import LessonPage from "@/components/Lesson";

export default function CoursesPage() {
  // useParams() to get the dynamic route parameters (slug from the path)
  const params = useParams<{ slug: string }>(); 
  const slug = params?.slug;

  // useSearchParams() to get the query parameters (lessonSlug from query)
  const searchParams = useSearchParams();
  const lessonSlug = searchParams?.get("lesson");

  if (!slug) {
    return <div>Missing course slug...</div>;
  }

  console.log("Sending children to Course:", lessonSlug);

  return (
    <div>
      <Course courseSlug={slug} lessonSlug={lessonSlug || ""}>
        {lessonSlug && (
          <>
            <LessonPage courseSlug={slug} lessonSlug={lessonSlug} />
          </>
        )}
      </Course>
    </div>
  );
}
