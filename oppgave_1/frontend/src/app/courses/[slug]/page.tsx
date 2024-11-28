'use client';
import React from "react";
import Course from "@/components/Course";
import { useParams } from "next/navigation";

export default function Coursespage() {
  const { slug } = useParams<{ slug: string }>() ?? {};

  console.log("coursepage slug: " + slug)

  return (
    <div>
      <h2>Courses Page</h2>
      <Course courseSlug = {slug}/>
    </div>
  );
}