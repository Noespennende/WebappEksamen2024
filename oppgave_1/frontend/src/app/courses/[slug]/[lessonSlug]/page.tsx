'use client';
import Lesson from "@/components/Lesson";
import { useParams } from "next/navigation";
import React from "react";


export default function LessonPage() {
    const params = useParams<{ slug: string; lessonSlug: string }>();

    if (!params || !params.slug || !params.lessonSlug) {
        return <div> missing parameters...</div>;
      }
    const { slug: courseSlug, lessonSlug } = params;
    return (
      <div>
        <h2>Lesson Page</h2>
        <Lesson courseSlug={courseSlug} lessonSlug={lessonSlug} />
      </div>
    );
  }