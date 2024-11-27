import All from "@/pages/All";
import Courses from "@/components/Courses";
import Course from "@/components/Course";
import Create from "@/components/Create";
import Lesson from "@/components/Lesson";
import SignUp from "@/components/SignUp";

export default function Home() {
  return (
    <main className="h-full">
      <All />
      <Courses />

{/* Vist for individual course */}
<Course />

{/* Vist for create */}


{/* Vist for lesson */}
<Lesson />

{/* Vist for sign up */}
<SignUp />
    </main>
  );
}
import React from "react";
