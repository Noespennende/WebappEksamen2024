'use client';

import React from "react";
import Course from "@/components/Course";
import { useParams } from "next/navigation";

export default function CoursesPage() {
  const params = useParams<{ slug?: string; lessonSlug: string }>(); 

  console.log("params:", params);

  if (!params?.slug) {
    return <div>Missing course slug...</div>;
  }

  return (
    <div>
      <h2>Courses Page</h2>
      <Course courseSlug={params.slug} lessonSlug={params.lessonSlug} />
    </div>
  );
}