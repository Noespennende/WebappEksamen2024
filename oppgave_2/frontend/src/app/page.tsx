"use client";

import EventCards from "@/components/EventCards";
import HomePageSort from "@/components/HomePageSort";
import { useOccasion } from "@/hooks/useOccasion";
import { Month, OccasionCategory } from "@/types/Types";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function Home() {

  const {data, status, getSorted} = useOccasion()
  const [month, setMonth] = useState<string | null>(null)
  const [year, setYear] = useState<string | null>(null)
  const [category, setCategory] = useState<string | null>(null)
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleMonthDropdownClick = (month: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (month !== "Måned") {
      setMonth(month)
      params.set("month", month);
    } else {
      setMonth(null)
      params.delete("month");
      
    }
    router.push(`?${params.toString()}`);
  }

  const handleYearInput = (yearInput: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (yearInput !== 0){
      setYear(yearInput.toString())
      params.set("year", yearInput.toString());
    }  else {
      setYear(null)
      params.delete("year");
    }
    router.push(`?${params.toString()}`);
  }

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    if (category != "Kategori") {
      setCategory(category)
      params.set("category", category);
    } else {
      setCategory(null)
      params.delete("category")
    }

    router.push(`?${params.toString()}`);
  }
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString() || "");

    const initialMonth = params.get("month") || "null";
    const initialYear = params.get("year") || "null";
    const initialCategory = params.get("category") || "null";

    setMonth(initialMonth);
    setYear(initialYear);
    setCategory(initialCategory);

    console.log(month, year, category)

    if (params.toString()) {
      getSorted(month, year, category) 
    }
  }, [searchParams, data])


  return (
    <section id="homePage">
      <HomePageSort currentMonth={month} currentYear={year} currentCategory={category} onMonthSort={handleMonthDropdownClick} onYearSort={handleYearInput} onCategorySort={handleCategorySelect}/>
      <Link href="/opprett/arrangement" className="button" id="createEventButton">Opprett arrangement</Link>
      {status.loading ? <div className="loader"></div> : 
      <EventCards occasionList={data}/>}
    </section>
  )
}

