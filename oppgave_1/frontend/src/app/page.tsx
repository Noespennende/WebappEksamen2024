import All from "@/pages/All";
import Courses from "@/components/Courses";
import Course from "@/components/Course";
import Create from "@/components/Create";
import Lesson from "@/components/Lesson";
import SignUp from "@/components/SignUp";

export default function Home() {
  return (
    <main className="h-full">
      <h1>Welcome to the Home Page</h1>
      <Courses />
      <SignUp />
    </main>
  );
}
import React from "react";import Link from "next/link";

