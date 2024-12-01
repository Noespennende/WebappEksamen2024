'use client';
import Create from "@/components/Create";
import { useParams } from "next/navigation";
import React from "react";


export default function EditPage() {

    const params = useParams<{ slug: string }>(); 
    const slug = params?.slug;
    return (
      <div>
        <h2>Creation Page</h2>
        <Create courseSlug={slug}/>
      </div>
    );
  }

